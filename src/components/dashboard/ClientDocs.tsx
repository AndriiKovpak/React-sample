import { useFormik } from "formik";
import { compress, EImageType } from "image-conversion";
import Image from "next/image";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import * as yup from "yup";
import { extToContentType } from "../../functions/getContentType";
import { getExtensionEnum } from "../../functions/getExtensionEnum";
import { hashBlob } from "../../functions/hashBlob";
import {
  DeleteDocumentComponent,
  GetDocumentsComponent,
  useCreateDocumentMutation,
  useGetDocumentSignedUrlMutation,
} from "../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../hooks/useSkipPagination";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { useStoreState } from "../../store/global.store";
import { FileIcon } from "../utils/FileIcon";

interface IFormData {
  displayName: string;
  file?: File;
}

const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  file: yup.mixed<File>().required(),
  displayName: yup.string().required(),
});

export const ClientDocs = () => {
  const { clientId, workspaceId } = useStoreState((state) => state.settings);
  const { skip, take, loadMore } = useSkipPagination(9);
  const [, getDocumentSignedUrlFN] = useGetDocumentSignedUrlMutation();
  const [, createDocumentFN] = useCreateDocumentMutation();

  const [url, setUrl] = useState<string>();
  const { values, isSubmitting, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setValues, setFieldError } =
    useFormik<IFormData>({
      initialValues: { displayName: "" },
      validationSchema,
      onSubmit: async ({ file, displayName }, {}) => {
        if (file) {
          const contentType = file.type;
          const ext = contentType.split("/")[1];
          const blob = Object.values<string>(EImageType).includes(contentType)
            ? await compress(file, { quality: 0.8, type: contentType as EImageType })
            : new Blob([await file.arrayBuffer()], { type: file.type });
          const hash = await hashBlob(blob);
          const optFile = new File([blob], `${hash}.${ext}`, { type: contentType });
          const signedUrlResponse = await getDocumentSignedUrlFN({
            displayName,
            workspaceId,
            clientId,
            hash,
            ext: getExtensionEnum(ext),
          });
          if (signedUrlResponse.data?.getDocumentSignedUrl) {
            const resp = await fetch(signedUrlResponse.data.getDocumentSignedUrl, { method: "PUT", body: optFile });
            if (resp.status === 200) {
              const { error } = await createDocumentFN({});
              if (error) console.error(error);
              else {
                resetForm();
                return;
              }
            }
          }
        }
        setFieldError("file", "Error while uploading...");
      },
    });

  useToastFormikErrors(errors, touched);

  return (
    <div id="documents-infinite" className="flex flex-col bg-white p-4 ">
      {values.file && url && <Image src={url} width={250} height={250} alt="New Doc Image" className="hover:cursor-pointer" />}
      <form autoComplete="on" onSubmit={handleSubmit} className="flex items-center justify-center p-4">
        <input
          name="displayName"
          placeholder="displayName"
          type="text"
          className="rounded px-2 py-1 text-sm leading-tight"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.displayName}
        />
        <div className="flex w-full items-center">
          <input
            type="file"
            multiple={false}
            accept={Object.keys(extToContentType).join(",")}
            className="w-full"
            onChange={({ currentTarget: { files } }) => {
              if (!files?.length) {
                setFieldError("file", "No File Found");
              } else {
                const [file] = files;
                setValues({ displayName: file.name.substring(0, file.name.lastIndexOf(".")), file });
                if (Object.values<string>(EImageType).includes(file.type)) {
                  setUrl(URL.createObjectURL(file));
                }
              }
            }}
          />
          <button
            type="button"
            className="btn"
            onClick={() => {
              resetForm();
              setUrl(undefined);
            }}
            aria-label="clear file"
            title="clear file"
          >
            <FaTrashAlt />
          </button>
          <button type="submit" className="btn">
            {isSubmitting ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
      <GetDocumentsComponent variables={{ skip, take, clientId, workspaceId }}>
        {({ data }) => (
          <InfiniteScroll
            dataLength={data?.getDocuments.length ?? 0}
            next={loadMore}
            hasMore={(data?.getDocuments.length ?? 1) % take === 0}
            loader={<></>}
            endMessage={<></>}
            scrollableTarget="documents-infinite"
          >
            {data?.getDocuments.map((doc) => (
              <div key={doc.id} className="mb-2 flex items-center">
                <FileIcon ext={doc.ext} />
                <p className="ml-2">
                  {doc.displayName}.{doc.ext}
                </p>
                <DeleteDocumentComponent>
                  {({ executeMutation }) => {
                    return <BsFillTrashFill className="cursor-pointer" onClick={() => executeMutation({ documentId: doc.id })} />;
                  }}
                </DeleteDocumentComponent>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </GetDocumentsComponent>
    </div>
  );
};
