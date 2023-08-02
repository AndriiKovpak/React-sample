import { useFormik } from "formik";
import type { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import {
  EFirmPermission,
  ELobbymaticPermission,
  TimezoneDto,
  useCreateUserMutation,
  useGetTimezonesQuery,
} from "../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { authControllerIsEmailAvailable } from "../../rest/apiComponents";

interface CreateModalProps {
  isOpen: boolean;
  closeFn: () => void;
}

interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  timezone: string;
  firmId: string;
  samplePermission: ELobbymaticPermission;
  firmPermission: EFirmPermission;
}
const userValidationSchema: yup.ObjectSchema<ICreateUser> = yup.object({
  firstName: yup.string().min(6).required(),
  lastName: yup.string().min(6).required(),
  email: yup
    .string()
    .email()
    .min(1)
    .required()
    .test("checkEmailAvailable", "email already exists", async (email) =>
      Boolean(email && (await authControllerIsEmailAvailable({ pathParams: { email } })).available)
    ),
  password: yup
    .string()
    .min(8)
    .max(40)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain one uppercase, one number, and one special case character"
    ),
  timezone: yup.string().min(1).required(),
  firmId: yup.string().min(1).required(),
  samplePermission: yup.mixed<ELobbymaticPermission>().required(),
  firmPermission: yup.mixed<EFirmPermission>().required(),
});
export const CreateUserModal: FC<CreateModalProps> = ({ isOpen, closeFn }) => {
  const [, createUser] = useCreateUserMutation();
  const [data] = useGetTimezonesQuery();

  const { errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik<ICreateUser>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      firmId: "",
      timezone: "",
      samplePermission: ELobbymaticPermission.Viewer,
      firmPermission: EFirmPermission.Viewer,
    },
    validationSchema: userValidationSchema,
    onSubmit: async (args) => {
      const { error } = await createUser({ emailVerified: true, ...args });
      if (!error) {
        toast.success("User created successfully!");
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
          <h1 className="text-3xl font-semibold text-white">Create User</h1>
          <AiOutlineClose className="hover-opacity-70 ml-auto cursor-pointer border-0 p-1 text-white" size={30} onClick={closeFn} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative flex-auto p-10 ">
            <div className="flex flex-col gap-4 text-white">
              <h1>First Name: </h1>
              <input
                className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                placeholder="Client Name"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h1>Last Name: </h1>
              <input
                className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                placeholder="Client Name"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h1>Email: </h1>
              <input
                className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <h1>Password: </h1>
              <input
                type="password"
                className="h-auto w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                placeholder="Password"
                name="password"
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
              <h1>Timezone: </h1>
              <select name="timezone" onChange={handleChange} className="w-full border-2 border-neutral-800 bg-black p-4 text-lg">
                {data?.data?.getTimezones.map(({ value, label, offset, abbrev }: TimezoneDto) => (
                  <option key={value} value={value}>
                    {abbrev} - {label} ({offset})
                  </option>
                ))}
              </select>
              <div className="flex flex-row justify-center gap-2 p-4">
                <div>
                  <h1>React Roles: </h1>
                  <select
                    className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                    name="samplePermissions"
                    onChange={handleChange}
                  >
                    <option value={ELobbymaticPermission.Viewer}>Viewer</option>
                    <option value={ELobbymaticPermission.Editor}>Editor</option>
                    <option value={ELobbymaticPermission.Manager}>Manager</option>
                    <option value={ELobbymaticPermission.Admin}>Admin</option>
                  </select>
                </div>
                <div>
                  <h1>Firm Roles: </h1>
                  <select
                    className="w-full border-2 border-neutral-800 bg-black p-4 text-lg"
                    onChange={handleChange}
                    name="firmPermissions"
                  >
                    <option value={EFirmPermission.Viewer}>Viewer</option>
                    <option value={EFirmPermission.Editor}>Editor</option>
                    <option value={EFirmPermission.Manager}>Manager</option>
                    <option value={EFirmPermission.Admin}>Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-8">
            <button
              className="w-fit rounded-full border-2 border-white px-5 py-2 text-lg font-bold text-white hover:opacity-70"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
