import { CurrentModelsDto } from "../graphql/urql-codegen/code";

export const getTokenEstimate = (text: string) => Math.ceil(text.length / 4);

export const getModelFromTokens = (text: string, models: CurrentModelsDto) =>
  getTokenEstimate(text) < 4096 / 2 ? models.smallToken : models.largeToken;
