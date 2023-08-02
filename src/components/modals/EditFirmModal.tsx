import { useFormik } from "formik";
import type { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useGetFirmQuery, useUpdateFirmMutation } from "../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";

interface EditModalProps {
  isOpen: boolean;
  id?: string;
  closeFn: () => void;
}

interface IEditFirm {
  name: string;
}

const firmValidationSchema: yup.ObjectSchema<IEditFirm> = yup.object({
  name: yup.string().min(1).required(),
});
export const EditFirmModal: FC<EditModalProps> = ({ isOpen, id, closeFn }) => {
  const [, updateFirm] = useUpdateFirmMutation();
  const [{ fetching, data }] = useGetFirmQuery({ variables: { firmId: id! }, pause: !id });

  const { errors, touched, values, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: { name: data?.getFirm.name || "" },
    validationSchema: firmValidationSchema,
    onSubmit: async (args) => {
      const { error } = await updateFirm({ id: id!, ...args });
      if (!error) {
        toast.success("Firm updated successfully!");
        closeFn();
      }
    },
  });

  useToastFormikErrors(errors, touched);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeFn}
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
          width: "100%",
          height: "auto",
          maxHeight: "90vh",
          maxWidth: "40vw",
          backgroundColor: "black",
          border: "none",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
      }}
    >
      <div className="relative flex h-auto w-full flex-col rounded-lg border-0 bg-black shadow-lg outline-none focus:outline-none">
        <div className="flex items-center justify-between rounded-t p-8">
          <h1 className="text-3xl font-semibold text-white">Edit Firm</h1>
          <AiOutlineClose className="hover-opacity-70 ml-auto cursor-pointer border-0 p-1 text-white" size={30} onClick={closeFn} />
        </div>
        {!fetching ? (
          <form onSubmit={handleSubmit}>
            <div className="relative flex-auto p-10">
              <div className="flex flex-col gap-4 text-white">
                <h1>Firm Id: {data?.getFirm.id}</h1>
                <h1>Name: </h1>
                <input
                  className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Firm Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 p-8">
              <button
                className="w-fit rounded-full border-2 border-white px-5 py-2 text-lg font-bold text-white hover:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <h1 className="mx-auto mb-8 text-3xl font-semibold text-white">Loading...</h1>
        )}
      </div>
    </Modal>
  );
};
