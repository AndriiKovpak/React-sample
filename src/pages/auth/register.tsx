import { useFormik } from "formik";
import type { GetServerSideProps, NextPage } from "next";
import * as yup from "yup";
import { NoSidebarLayout } from "../../components/layout/NoSidebarLayout";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { authControllerGetSignupToken, authControllerRegister, timezoneControllerGetTimezones } from "../../rest/apiComponents";
import { RegisterTokenEntity, TimezoneDTO } from "../../rest/apiSchemas";

interface IFormData {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  timezone: string;
}

interface PageProps {
  token: RegisterTokenEntity;
  timezones: TimezoneDTO[];
}

export const getServerSideProps: GetServerSideProps<PageProps, { tokenId: string }> = async ({ query: { tokenId } }) => {
  if (!tokenId || Array.isArray(tokenId)) return { redirect: { permanent: true, destination: "/auth/login" } };
  return {
    props: {
      token: await authControllerGetSignupToken({ pathParams: { tokenId } }),
      timezones: await timezoneControllerGetTimezones(),
    },
  };
};

const Page: NextPage<PageProps> = ({ token, timezones }) => {
  const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
    firstName: yup.string().min(6).required(),
    lastName: yup.string().min(6).required(),
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
    timezone: yup
      .string()
      .required()
      .oneOf(timezones.map((timezone) => timezone.value)),
  });

  const { initialValues, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik<IFormData>({
    initialValues: { firstName: "", lastName: "", password: "", passwordConfirm: "", timezone: "America/New_York" },
    validationSchema,
    onSubmit: (values) => authControllerRegister({ body: { tokenId: token.id, ...values } }),
  });

  useToastFormikErrors(errors, touched);

  return (
    <NoSidebarLayout>
      <form autoComplete="on" className="mx-auto flex max-w-sm flex-col space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-lg font-medium">Register</h1>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="passwordConfirm"
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="timezone"
          onChange={handleChange}
          defaultValue={initialValues.timezone}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timezones.map(({ value, label, offset, abbrev }) => (
            <option key={value} value={value}>
              {abbrev} - {label} ({offset})
            </option>
          ))}
        </select>
        <button className="btn w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </NoSidebarLayout>
  );
};
export default Page;
