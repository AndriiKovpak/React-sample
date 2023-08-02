import { useFormik } from "formik";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { NoSidebarLayout } from "../../components/layout/NoSidebarLayout";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { authControllerChangePassword } from "../../rest/apiComponents";

interface IFormData {
  password: string;
  passwordConfirm: string;
}

const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  password: yup
    .string()
    .min(8)
    .max(40)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain one uppercase, one number, and one special case character"
    ),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface PageProps {
  tokenId: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, { tokenId: string }> = async ({ query: { tokenId } }) => {
  if (!tokenId || Array.isArray(tokenId)) return { redirect: { permanent: true, destination: "/auth/login" } };
  return { props: { tokenId } };
};

const Page: NextPage<PageProps> = ({ tokenId }) => {
  const router = useRouter();

  const { handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik<IFormData>({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await authControllerChangePassword({ body: { tokenId, ...values } });
        toast.success("Please check your email", { position: toast.POSITION.BOTTOM_CENTER });
        await router.push("/auth/login");
      } catch (error) {
        toast.error(error.payload, { position: toast.POSITION.BOTTOM_CENTER });
      }
    },
  });

  useToastFormikErrors(errors, touched);

  return (
    <NoSidebarLayout>
      <form autoComplete="on" onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col space-y-4">
        <h1 className="text-lg font-medium">Reset Password</h1>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="btn w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </NoSidebarLayout>
  );
};

export default Page;
