import type { CurrentModelsFragment } from "../graphql/urql-codegen/code";

export interface ICompletionBody {
  systemPrompt: string;
  prompt: string;
  promptId: string;
  clientId: string;
  models: CurrentModelsFragment;
}
