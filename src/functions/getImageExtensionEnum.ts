import { EImageExtension } from "../graphql/urql-codegen/code";

export const imageExtensionMap: Record<string, EImageExtension> = {
  jpeg: EImageExtension.Jpeg,
  jpg: EImageExtension.Jpg,
  png: EImageExtension.Png,
};
export const getImageExtensionEnum = (ext: string) => {
  return imageExtensionMap[ext];
};
