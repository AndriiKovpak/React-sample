import { FormikConfig, useFormik } from "formik";
import type { GetServerSideProps } from "next";
import { NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-tabs/style/react-tabs.css";
import TextareaAutosize from "react-textarea-autosize";
import { useBoolean } from "react-use";
import { ssrExchange } from "urql";
import * as yup from "yup";
import { InternalLayout } from "../../../components/layout/InternalLayout";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  EPromptCategory,
  GetPromptsComponent,
  GetPromptsDocument,
  GetPromptsQuery,
  GetPromptsQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  PromptFragment,
} from "../../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../../hooks/useToastFormikErrors";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClient = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const meResp = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (meResp.error) {
    console.error(meResp.error);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  await urqlClient.query<GetPromptsQuery, GetPromptsQueryVariables>(GetPromptsDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
};

const Page: NextPage = () => {
  return (
    <InternalLayout>
      <div className="container mx-auto">
        <table className="min-w-full border border-gray-300 bg-black">
          <thead>
            <tr className="bg-gray-700">
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Category</th>
              <th className="border-b px-4 py-2">Description</th>
              <th className="border-b px-4 py-2">Value</th>
              <th className="border-b px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <PromptTypesRow
              buttonText="Create"
              prompt={{ id: "", category: EPromptCategory.Client, description: "", name: "", value: "", createdAt: "" }}
              onSubmit={async (_values, {}) => {}}
            />
            <tr />
            <GetPromptsComponent>
              {({ data }) => (
                <>
                  {data?.getPrompts.map((prompt) => (
                    <PromptTypesRow key={prompt.id} buttonText="Update" prompt={prompt} onSubmit={async (_values, {}) => {}} />
                  ))}
                </>
              )}
            </GetPromptsComponent>
          </tbody>
        </table>
      </div>
    </InternalLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);

type IFormData = Omit<PromptFragment, "id" | "__typename" | "createdAt">;

const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  category: yup.mixed<EPromptCategory>().required(),
  description: yup.string().required(),
  name: yup.string().required(),
  value: yup.string().required(),
});

interface PromptTypesRowProps {
  buttonText: "Create" | "Update";
  prompt: PromptFragment;
  onSubmit: FormikConfig<IFormData>["onSubmit"];
}

export const PromptTypesRow: FC<PromptTypesRowProps> = ({ buttonText, prompt, onSubmit }) => {
  const [isEditing, setIsEditing] = useBoolean(buttonText === "Create");
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik<IFormData>({
    initialValues: prompt,
    validationSchema,
    onSubmit,
  });
  useToastFormikErrors(errors, touched);
  return (
    <tr className="border-b">
      <td className="px-4 py-2">
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full bg-gray-700"
          placeholder="Name"
          disabled={!isEditing}
        />
      </td>
      <td className="px-4 py-2">
        <select
          name="category"
          disabled={!isEditing}
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full bg-gray-700"
        >
          <option value={EPromptCategory.Client}>{EPromptCategory.Client}</option>
          <option value={EPromptCategory.Engagement}>{EPromptCategory.Engagement}</option>
          <option value={EPromptCategory.Legislation}>{EPromptCategory.Legislation}</option>
          <option value={EPromptCategory.Pr}>{EPromptCategory.Pr}</option>
          <option value={EPromptCategory.Strategy}>{EPromptCategory.Strategy}</option>
        </select>
      </td>
      <td className="px-4 py-2">
        <TextareaAutosize
          name="description"
          disabled={!isEditing}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full resize-none bg-gray-700"
          placeholder="Description"
        />
      </td>
      <td className="px-4 py-2">
        <TextareaAutosize
          name="value"
          disabled={!isEditing}
          value={values.value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full resize-none bg-gray-700"
          placeholder="Value"
        />
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <button className="btn w-full" disabled={isSubmitting} type="submit" onClick={() => handleSubmit()}>
              {isSubmitting ? "Submitting..." : buttonText}
            </button>
            {buttonText !== "Create" && (
              <button className="btn w-full" type="button" onClick={() => setIsEditing(false)}>
                close
              </button>
            )}
          </div>
        ) : (
          <button className="btn w-full" type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};
