import { devtoolsExchange } from "@urql/devtools";
import { persistedExchange } from "@urql/exchange-persisted";
import { requestPolicyExchange } from "@urql/exchange-request-policy";
import { createClient as createWSClient } from "graphql-ws";
import { NextUrqlClientConfig } from "next-urql";
import { fetchExchange, subscriptionExchange } from "urql";
import { Environment } from "../../utils/environment";
import { errorExchange } from "./errorExchange";
import { normalizedCache } from "./normalizedCache";

export const nextUrqlClient: NextUrqlClientConfig = (ssrExchange, ctx) => {
  const exchanges = [
    devtoolsExchange,
    requestPolicyExchange({}),
    normalizedCache,
    errorExchange,
    ssrExchange,
    persistedExchange(),
    fetchExchange,
  ];

  if (Environment.isBrowser()) {
    const subscriptionClient = createWSClient({ url: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL });
    exchanges.push(
      subscriptionExchange({
        forwardSubscription(request) {
          const input = { ...request, query: request.query ?? "" };
          return {
            subscribe(sink) {
              return { unsubscribe: subscriptionClient.subscribe(input, sink) };
            },
          };
        },
      })
    );
  }
  return {
    url: process.env.NEXT_PUBLIC_GQL_URL,
    fetchOptions: { credentials: "include" as const, headers: { cookie: ctx?.req?.headers.cookie ?? "" } },
    exchanges,
  };
};
