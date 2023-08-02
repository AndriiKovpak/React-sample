import { EExtension } from "../graphql/urql-codegen/code";

export const extensionMap: Record<string, EExtension> = {
  doc: EExtension.Doc,
  docx: EExtension.Docx,
  gif: EExtension.Gif,
  jpeg: EExtension.Jpeg,
  jpg: EExtension.Jpg,
  mov: EExtension.Mov,
  mp3: EExtension.Mp3,
  mp4: EExtension.Mp4,
  mpeg: EExtension.Mpeg,
  mpg: EExtension.Mpg,
  odp: EExtension.Odp,
  ods: EExtension.Ods,
  odt: EExtension.Odt,
  pdf: EExtension.Pdf,
  png: EExtension.Png,
  ppt: EExtension.Ppt,
  pptx: EExtension.Pptx,
  rar: EExtension.Rar,
  rtf: EExtension.Rtf,
  tar: EExtension.Tar,
  txt: EExtension.Txt,
  wav: EExtension.Wav,
  xls: EExtension.Xls,
  xlsx: EExtension.Xlsx,
  zip: EExtension.Zip,
};

export const getExtensionEnum = (ext: string) => {
  return extensionMap[ext];
};
