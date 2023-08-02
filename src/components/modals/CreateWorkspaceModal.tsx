import { useFormik } from "formik";
import type { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useCreateWorkspaceMutation } from "../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";

interface CreateModalProps {
  isOpen: boolean;
  closeFn: () => void;
}

interface ICreateWorkspace {
  name: string;
  firmId: string;
}

const workspaceValidationSchema: yup.ObjectSchema<ICreateWorkspace> = yup.object({
  name: yup.string().min(1).required(),
  firmId: yup.string().min(1).required(),
});
export const CreateWorkspaceModal: FC<CreateModalProps> = ({ isOpen, closeFn }) => {
  const [, createWorkspace] = useCreateWorkspaceMutation();

  const { errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { name: "", firmId: "" },
    validationSchema: workspaceValidationSchema,
    onSubmit: async (args) => {
      const { error } = await createWorkspace(args);
      if (!error) {
        toast.success("Workspace created successfully!");
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
          <h1 className="text-3xl font-semibold text-white">Create Workspace</h1>
          <AiOutlineClose className="hover-opacity-70 ml-auto cursor-pointer border-0 p-1 text-white" size={30} onClick={closeFn} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative flex-auto p-10">
            <div className="flex flex-col gap-4 text-white">
              <h1>Name: </h1>
              <input
                className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                placeholder="Client Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h1>Firm Id: </h1>
              <input
                className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                placeholder="Firm Id"
                name="firmId"
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
      </div>
    </Modal>
  );
};
