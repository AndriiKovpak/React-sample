import { useFormik } from "formik";
import type { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { EFirmPermission, ELobbymaticPermission, useGetUserQuery, useUpdateUserMutation } from "../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { authControllerIsEmailAvailable } from "../../rest/apiComponents";

interface EditModalProps {
  isOpen: boolean;
  id?: string;
  closeFn: () => void;
}

interface IEditUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  samplePermission: ELobbymaticPermission;
  firmPermission: EFirmPermission;
}

export const EditUserModal: FC<EditModalProps> = ({ isOpen, id, closeFn }) => {
  const [, updateUser] = useUpdateUserMutation();
  const [{ fetching, data }] = useGetUserQuery({ variables: { userId: id! }, pause: !id });

  const validationSchema: yup.ObjectSchema<IEditUser> = yup.object({
    firstName: yup.string().min(1).required(),
    lastName: yup.string().min(1).required(),
    email: yup
      .string()
      .min(1)
      .required()
      .test("checkEmailAvailable", "email already exists", async (email) =>
        Boolean((email && (await authControllerIsEmailAvailable({ pathParams: { email } })).available) || email == data?.getUser.email)
      ),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain one uppercase, one number, and one special case character"
      ),
    samplePermission: yup.mixed<ELobbymaticPermission>().required(),
    firmPermission: yup.mixed<EFirmPermission>().required(),
  });

  const { errors, touched, isSubmitting, values, handleChange, handleBlur, handleSubmit } = useFormik<IEditUser>({
    enableReinitialize: true,
    initialValues: {
      firstName: data?.getUser.firstName || "",
      lastName: data?.getUser.lastName || "",
      email: data?.getUser.email || "",
      password: undefined,
      samplePermission: data?.getUser.samplePermission || ELobbymaticPermission.Viewer,
      firmPermission: data?.getUser.firmPermission || EFirmPermission.Viewer,
    },
    validationSchema,
    onSubmit: async (args) => {
      const { error } = await updateUser({ id: id!, ...args });
      if (!error) {
        toast.success("User updated successfully!");
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
          <h1 className="text-3xl font-semibold text-white">Edit User</h1>
          <AiOutlineClose className="hover-opacity-70 ml-auto cursor-pointer border-0 p-1 text-white" size={30} onClick={closeFn} />
        </div>
        {!fetching ? (
          <form onSubmit={handleSubmit}>
            <div className="relative flex-auto p-10">
              <div className="flex flex-col gap-4 text-white">
                <h1>User Id: {data?.getUser.id}</h1>
                <h1>First Name: </h1>
                <input
                  className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <h1>Last Name: </h1>
                <input
                  className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <h1>Email: </h1>
                <input
                  className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <h1>Password: </h1>
                <input
                  type="password"
                  className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <h1>React Roles: </h1>
                <select
                  className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  value={values.samplePermission}
                  name="samplePermission"
                  onChange={handleChange}
                >
                  <option value={ELobbymaticPermission.Viewer}>Viewer</option>
                  <option value={ELobbymaticPermission.Editor}>Editor</option>
                  <option value={ELobbymaticPermission.Manager}>Manager</option>
                  <option value={ELobbymaticPermission.Admin}>Admin</option>
                </select>
                <h1>Firm Roles: </h1>
                <select
                  className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                  name="firmPermission"
                  value={values.firmPermission}
                  onChange={handleChange}
                >
                  <option value={EFirmPermission.Viewer}>Viewer</option>
                  <option value={EFirmPermission.Editor}>Editor</option>
                  <option value={EFirmPermission.Manager}>Manager</option>
                  <option value={EFirmPermission.Admin}>Admin</option>
                </select>
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
