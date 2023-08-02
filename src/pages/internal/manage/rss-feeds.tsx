import cx from "classnames";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useFormik } from "formik";
import type { GetServerSideProps } from "next";
import { NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import "react-datepicker/dist/react-datepicker.css";
import { BsTrash } from "react-icons/bs";
import "react-tabs/style/react-tabs.css";
import { ssrExchange } from "urql";
import * as yup from "yup";
import { InternalLayout } from "../../../components/layout/InternalLayout";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  DeleteRssSubscriptionComponent,
  GetAllRssSubscriptionsComponent,
  GetAllRssSubscriptionsDocument,
  GetAllRssSubscriptionsQuery,
  GetAllRssSubscriptionsQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  useCreateRssSubscriptionMutation,
} from "../../../graphql/urql-codegen/code";
import { rssControllerValidate } from "../../../rest/apiComponents";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClient = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const meResp = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (meResp.error || !meResp.data?.me.samplePermission) {
    if (meResp.error) console.error(meResp.error);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  await urqlClient.query<GetAllRssSubscriptionsQuery, GetAllRssSubscriptionsQueryVariables>(GetAllRssSubscriptionsDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
};

interface IFormData {
  url: string;
}

const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  url: yup
    .string()
    .required()
    .url("Invalid URL")
    .test("validate-url", "Invalid URL", async (url) => Boolean((await rssControllerValidate({ queryParams: { url } })).valid_feed)),
});

const Page: NextPage = () => {
  const [, createCongressCalendarItemFN] = useCreateRssSubscriptionMutation();
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik<IFormData>({
    initialValues: { url: "" },
    validationSchema,
    onSubmit: async (values, {}) => {
      const { error } = await createCongressCalendarItemFN(values);
      if (error) console.error(error);
    },
  });
  return (
    <InternalLayout>
      <div className="container mx-auto">
        <div className={cx("form-control", { "border-red-500": errors.url && touched.url })}>
          <input
            type="text"
            name="url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url}
            className="w-full bg-gray-700"
            placeholder="RSS URL"
          />
          {errors.url && touched.url && <div className="text-red-500">{errors.url}</div>}
        </div>
        <button
          className="w-full rounded-md bg-blue-500 py-2 text-white transition-all duration-200 ease-in-out hover:bg-blue-700"
          disabled={isSubmitting}
          type="submit"
          onClick={() => handleSubmit()}
        >
          {isSubmitting ? "Submitting..." : "Create"}
        </button>
        <table className="min-w-full border border-gray-300 bg-black">
          <thead>
            <tr className="bg-gray-700">
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Type</th>
              <th className="border-b px-4 py-2">Url</th>
              <th className="border-b px-4 py-2">Info</th>
              <th className="border-b px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            <GetAllRssSubscriptionsComponent>
              {({ data }) => (
                <>
                  {data?.getAllRssSubscriptions.map(({ subscription_id, status, feed_type, info, url, createdAt }) => (
                    <tr className="border-b" key={subscription_id}>
                      <td className="px-4 py-2">{status}</td>
                      <td className="px-4 py-2">{feed_type}</td>
                      <td className="px-4 py-2">{url}</td>
                      <td className="px-4 py-2">{info}</td>
                      <td className="px-4 py-2">{dayjs(createdAt).tz().format("MM-DD-YYYY HH:mm:ss z")}</td>
                      <td className="px-4 py-2">
                        <DeleteRssSubscriptionComponent>
                          {({ executeMutation }) => (
                            <button onClick={() => executeMutation({ subscription_id })}>
                              <BsTrash />
                            </button>
                          )}
                        </DeleteRssSubscriptionComponent>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </GetAllRssSubscriptionsComponent>
          </tbody>
        </table>
      </div>
    </InternalLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
