import { AnthropicStream, OpenAIStream, StreamingTextResponse } from "ai";
import { NextApiResponse } from "next";
import type { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { getModelFromTokens } from "../../functions/getTokenEstimate";
import { directUrqlClient } from "../../graphql/urql-client/direct";
import {
  EAiProvider,
  LogCompletionDocument,
  LogCompletionMutation,
  LogCompletionMutationVariables,
  LogCompletionResponseDocument,
  LogCompletionResponseMutation,
  LogCompletionResponseMutationVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../graphql/urql-codegen/code";
import type { ICompletionBody } from "../../interfaces/ICompletionBody";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));

function buildAnthropicPrompt(messages: { content: string; role: "system" | "user" | "assistant" }[]) {
  return messages.map(({ content, role }) => (role === "user" ? `Human: ${content}` : `Assistant: ${content}`)).join("\n\n") + "Assistant:";
}

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const cookie = req.headers.get("cookie");
  if (!cookie) {
    console.error(new Error("no cookie"));
    return res.redirect("/auth/login");
  }
  const urqlClient = directUrqlClient(cookie);
  const { data: meData, error } = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (error || !meData?.me) {
    if (error) console.error(error);
    return res.redirect("/auth/login");
  }
  const { systemPrompt, prompt, promptId, clientId, models } = (await req.json()) as ICompletionBody;
  const { provider, model } = getModelFromTokens(systemPrompt + prompt, models);
  const messages = [{ role: "system", content: systemPrompt } as const, { role: "user", content: prompt } as const];

  let response: Response;
  if (provider === EAiProvider.OpenAi) {
    response = await openai.createChatCompletion({ model, messages, stream: true });
  } else if (provider === EAiProvider.Anthropic) {
    response = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY },
      body: JSON.stringify({ prompt: buildAnthropicPrompt(messages), model, stream: true }),
    });
  } else {
    throw new Error("bad call");
  }

  const logCompletionResp = await urqlClient
    .mutation<LogCompletionMutation, LogCompletionMutationVariables>(LogCompletionDocument, {
      provider,
      model,
      clientId,
      promptId,
      systemPrompt,
      userPrompt: prompt,
    })
    .toPromise();
  const completionId = logCompletionResp.data?.logCompletion;
  if (!completionId || logCompletionResp.error) {
    console.error(logCompletionResp.error);
    throw new Error("handle me better");
  }

  const Stream = provider === EAiProvider.OpenAi ? OpenAIStream : AnthropicStream;
  return new StreamingTextResponse(
    Stream(response, {
      onStart: async () => {},
      onToken: async (_token: string) => {},
      onCompletion: async (completion: string) => {
        await urqlClient
          .mutation<LogCompletionResponseMutation, LogCompletionResponseMutationVariables>(LogCompletionResponseDocument, {
            completionId,
            completion,
          })
          .toPromise();
      },
    })
  );
}
