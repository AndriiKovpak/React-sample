import { useFormik } from "formik";
import type { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useGetClientQuery, useUpdateClientMutation } from "../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";

interface EditModalProps {
  isOpen: boolean;
  id?: string;
  closeFn: () => void;
}

interface IEditClient {
  name: string;
  description: string;
  objective: string;
  workspaceId: string;
}

const clientValidationSchema: yup.ObjectSchema<IEditClient> = yup.object({
  name: yup.string().min(1).required(),
  description: yup.string().min(1).required(),
  objective: yup.string().min(1).required(),
  workspaceId: yup.string().min(1).required(),
});

export const EditClientModal: FC<EditModalProps> = ({ isOpen, id, closeFn }) => {
  const [, updateClient] = useUpdateClientMutation();
  const [{ fetching, data }] = useGetClientQuery({ variables: { clientId: id! }, pause: !id });

  const { errors, touched, values, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.getClient.name || "",
      description: data?.getClient.description || "",
      objective: data?.getClient.objective || "",
      workspaceId: data?.getClient.workspaceId || "",
    },
    validationSchema: clientValidationSchema,
    onSubmit: async (args) => {
      const { error } = await updateClient({ id: id!, ...args });
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
          <h1 className="text-3xl font-semibold text-white">Edit Client</h1>
          <AiOutlineClose className="hover-opacity-70 ml-auto cursor-pointer border-0 p-1 text-white" size={30} onClick={closeFn} />
        </div>
        {!fetching ? (
          <form onSubmit={handleSubmit}>
            <div className="relative flex-auto p-10">
              <div className="flex flex-col gap-4 text-white">
                <h1>Client Id: {data?.getClient.id}</h1>
                <h1>Name: </h1>
                <input
                  className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Client Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <h1>Description: </h1>
                <input
                  className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <h1>Objective: </h1>
                <input
                  className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Objective"
                  name="objective"
                  value={values.objective}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <h1>Workspace Id: </h1>
                <input
                  className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Workspace Id"
                  name="workspaceId"
                  value={values.workspaceId}
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
