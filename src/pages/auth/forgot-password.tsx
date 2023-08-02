import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { NoSidebarLayout } from "../../components/layout/NoSidebarLayout";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { authControllerForgotPassword } from "../../rest/apiComponents";

interface IFormData {
  email: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required(),
});

const Page: NextPage = () => {
  const router = useRouter();

  const { handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting } = useFormik<IFormData>({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await authControllerForgotPassword({ body: values });
        toast.success("Please check your email", { position: toast.POSITION.BOTTOM_CENTER });
        router.push("/auth/login");
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
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="btn w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Email"}
        </button>
      </form>
    </NoSidebarLayout>
  );
};

export default Page;
