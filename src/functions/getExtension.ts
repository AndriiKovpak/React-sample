export const contentTypeToExt: Record<string, string> = {
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/pdf": ".pdf",
  "application/rtf": ".rtf",
  "text/plain": ".txt",
  "application/zip": ".zip",
  "image/jpeg": ".jpeg",
  "image/png": ".png",
  "image/gif": ".gif",
  "audio/mpeg": ".mp3",
  "audio/wav": ".wav",
  "video/mp4": ".mp4",
  "video/mpeg": ".mpeg",
  "video/quicktime": ".mov",
  "application/vnd.oasis.opendocument.text": ".odt",
  "application/vnd.oasis.opendocument.presentation": ".odp",
  "application/vnd.oasis.opendocument.spreadsheet": ".ods",
  "application/x-rar-compressed": ".rar",
  "application/x-tar": ".tar",
};

export const getExtension = (contentType: string) => {
  for (const [extension, ct] of Object.entries(contentTypeToExt)) {
    if (ct === contentType) {
      return extension;
    }
  }
  return undefined;
};
