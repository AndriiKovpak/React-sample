import { useFormik } from "formik";
import { EImageType, compress } from "image-conversion";
import type { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "react-modal";
import "react-tabs/style/react-tabs.css";
import { useBoolean, useDebounce } from "react-use";
import { ssrExchange } from "urql";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { getImageExtensionEnum } from "../../../functions/getImageExtensionEnum";
import { hashBlob } from "../../../functions/hashBlob";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  MeComponent,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  useGetUserAvatarSignedUrlMutation,
  useMeQuery,
  useSetUserAvatarMutation,
} from "../../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../../hooks/useToastFormikErrors";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClient = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const meResp = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (meResp.error || !meResp.data?.me) {
    console.error(meResp.error);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  return { props: { urqlState: ssrCache.extractData() } };
};

const Page: NextPage = () => {
  const [isOpen, toggle] = useBoolean(false);
  const [{ data }] = useMeQuery();
  const [imgSrc, setImgSrc] = useState(data?.me.avatar ?? "");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [, getUserAvatarSignedUrlFN] = useGetUserAvatarSignedUrlMutation();
  const [, setUserAvatarFN] = useSetUserAvatarMutation();

  const { isSubmitting, errors, handleSubmit } = useFormik<{}>({
    initialValues: {},
    onSubmit: async ({}, { setFieldError }) => {
      const contentType = EImageType.JPEG;
      const ext = "jpeg";
      if (previewCanvasRef.current)
        previewCanvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const optBlob = await compress(blob, { quality: 0.8, type: contentType });
            const hash = await hashBlob(optBlob);
            const optFile = new File([optBlob], `${hash}.${ext}`, { type: contentType });
            const signedUrlResponse = await getUserAvatarSignedUrlFN({
              hash,
              ext: getImageExtensionEnum(ext),
            });
            if (signedUrlResponse.data?.getUserAvatarSignedUrl) {
              const resp = await fetch(signedUrlResponse.data.getUserAvatarSignedUrl, { method: "PUT", body: optFile });
              if (resp.status === 200) {
                const { error } = await setUserAvatarFN({});
                if (error) console.error(error);
                else {
                  toggle(false);
                  return;
                }
              }
            }
          }
          setFieldError("file", "Error while uploading...");
        }, "image/jpeg");
      else setFieldError("file", "Error while uploading...");
    },
  });

  useToastFormikErrors(errors);

  useDebounce(
    () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        const ctx = previewCanvasRef.current.getContext("2d");
        if (!ctx) {
          throw new Error("No 2d context");
        }
        const { width, naturalWidth, height, naturalHeight } = imgRef.current;
        const scaleX = naturalWidth / width;
        const scaleY = naturalHeight / height;
        const pixelRatio = window.devicePixelRatio;
        previewCanvasRef.current.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
        previewCanvasRef.current.height = Math.floor(completedCrop.height * scaleY * pixelRatio);
        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";
        const cropX = completedCrop.x * scaleX;
        const cropY = completedCrop.y * scaleY;
        const centerX = naturalWidth / 2;
        const centerY = naturalHeight / 2;
        ctx.save();
        ctx.translate(-cropX, -cropY);
        ctx.translate(centerX, centerY);
        ctx.translate(-centerX, -centerY);
        ctx.drawImage(imgRef.current, 0, 0, naturalWidth, naturalHeight, 0, 0, naturalWidth, naturalHeight);
        ctx.restore();
      }
    },
    100,
    [completedCrop]
  );

  return (
    <DashboardLayout>
      <div>
        <MeComponent>
          {({ data }) =>
            data?.me.avatar ? <Image height={32} width={32} alt="" src={data.me.avatar} /> : <FaUser className="h-16 w-16 rounded-full" />
          }
        </MeComponent>
        <button className="btn" onClick={() => toggle(true)}>
          Upload Avatar
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggle(false)}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "unset")}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "80vh",
            maxWidth: "80vw",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            multiple={false}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setCrop(undefined);
                setImgSrc(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          {imgSrc && (
            <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={setCompletedCrop} aspect={1}>
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={(e) => {
                  const { width, height } = e.currentTarget;
                  centerCrop(makeAspectCrop({ unit: "%", width: 90 }, 1, width, height), width, height);
                }}
              />
            </ReactCrop>
          )}
          <div className="flex">
            {completedCrop && (
              <canvas
                ref={previewCanvasRef}
                style={{ border: "1px solid black", objectFit: "contain", width: 64, height: 64, borderRadius: "9999px" }}
              />
            )}
            <button type="submit" className="btn">
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
