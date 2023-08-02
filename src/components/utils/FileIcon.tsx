import { FC } from "react";
import {
  RiFile2Line,
  RiFileExcel2Line,
  RiFileLine,
  RiFilePdfLine,
  RiFilePpt2Line,
  RiFileTextLine,
  RiFileWord2Line,
  RiFileZipLine,
  RiImageLine,
  RiMusicLine,
  RiVideoLine,
} from "react-icons/ri";
import { EExtension } from "../../graphql/urql-codegen/code";

export const FileIcon: FC<{ ext: EExtension }> = ({ ext }) => {
  switch (ext) {
    // Document Types
    case EExtension.Doc:
    case EExtension.Docx:
      return <RiFileWord2Line />;
    case EExtension.Ppt:
    case EExtension.Pptx:
      return <RiFilePpt2Line />;
    case EExtension.Xls:
    case EExtension.Xlsx:
      return <RiFileExcel2Line />;
    case EExtension.Pdf:
      return <RiFilePdfLine />;
    case EExtension.Rtf:
    case EExtension.Txt:
      return <RiFileTextLine />;
    case EExtension.Zip:
      return <RiFileZipLine />;

    // Image Types
    case EExtension.Jpeg:
    case EExtension.Jpg:
    case EExtension.Png:
    case EExtension.Gif:
      return <RiImageLine />;

    // Audio Types
    case EExtension.Mp3:
    case EExtension.Wav:
      return <RiMusicLine />;

    // Video Types
    case EExtension.Mp4:
    case EExtension.Mpeg:
    case EExtension.Mpg:
    case EExtension.Mov:
      return <RiVideoLine />;

    // Application Types
    case EExtension.Odt:
    case EExtension.Odp:
    case EExtension.Ods:
      return <RiFile2Line />;
    case EExtension.Rar:
    case EExtension.Tar:
      return <RiFileLine />;

    default:
      throw new Error("enum exhausted");
  }
};
