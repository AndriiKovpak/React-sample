import cx from "classnames";
import { FormikConfig, useFormik } from "formik";
import type { GetServerSideProps } from "next";
import { NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-tabs/style/react-tabs.css";
import { ssrExchange } from "urql";
import * as yup from "yup";
import { InternalLayout } from "../../../components/layout/InternalLayout";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  CongressCalendarItemFragment,
  ECongressCalendarItemType,
  GetCongressCalendarComponent,
  GetCongressCalendarDocument,
  GetCongressCalendarQuery,
  GetCongressCalendarQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  useCreateCongressCalendarItemMutation,
  useUpdateCongressCalendarItemMutation,
} from "../../../graphql/urql-codegen/code";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClient = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const meResp = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (meResp.error) {
    console.error(meResp.error);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  await urqlClient.query<GetCongressCalendarQuery, GetCongressCalendarQueryVariables>(GetCongressCalendarDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
};

const Page: NextPage = () => {
  const [, createCongressCalendarItemFN] = useCreateCongressCalendarItemMutation();
  const [, updateCongressCalendarItemFN] = useUpdateCongressCalendarItemMutation();
  return (
    <InternalLayout>
      <div className="container mx-auto">
        <table className="min-w-full border border-gray-300 bg-black">
          <thead>
            <tr className="bg-gray-700">
              <th className="border-b px-4 py-2">Type</th>
              <th className="border-b px-4 py-2">Holiday</th>
              <th className="border-b px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <CongressCalendarRow
              buttonText="Create"
              type={ECongressCalendarItemType.Both}
              date=""
              onSubmit={async (values, { setFieldError }) => {
                if (values.holiday && values.type !== ECongressCalendarItemType.Holiday) {
                  return setFieldError("holiday", "holiday text is set");
                }
                if (!values.holiday && values.type === ECongressCalendarItemType.Holiday) {
                  return setFieldError("holiday", "holiday text is not set");
                }
                const { error } = await createCongressCalendarItemFN(values);
                if (error) console.error(error);
              }}
            />
            <GetCongressCalendarComponent>
              {({ data }) => (
                <>
                  {data?.getCongressCalendar.map(({ id, type, holiday, date }) => (
                    <CongressCalendarRow
                      key={id}
                      buttonText="Update"
                      type={type}
                      date={date}
                      holiday={holiday}
                      onSubmit={async (values, { setFieldError }) => {
                        if (values.holiday && values.type !== ECongressCalendarItemType.Holiday) {
                          return setFieldError("holiday", "holiday text is set");
                        }
                        if (!values.holiday && values.type === ECongressCalendarItemType.Holiday) {
                          return setFieldError("holiday", "holiday text is not set");
                        }
                        const { error } = await updateCongressCalendarItemFN({ congressCalendarItemId: id, ...values });
                        if (error) console.error(error);
                      }}
                    />
                  ))}
                </>
              )}
            </GetCongressCalendarComponent>
          </tbody>
        </table>
      </div>
    </InternalLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);

type IFormData = Omit<CongressCalendarItemFragment, "id" | "__typename">;

const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  type: yup.mixed<ECongressCalendarItemType>().oneOf(Object.values(ECongressCalendarItemType)).required(),
  holiday: yup.string(),
  date: yup.string().required(),
});

interface CongressCalendarRowProps extends IFormData {
  buttonText: string;
  onSubmit: FormikConfig<IFormData>["onSubmit"];
}

export const CongressCalendarRow: FC<CongressCalendarRowProps> = ({ buttonText, type, date, holiday, onSubmit }) => {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, setFieldValue, handleSubmit } = useFormik<IFormData>({
    initialValues: { type, date, holiday },
    validationSchema,
    onSubmit,
  });
  return (
    <tr className="border-b">
      <td className="px-4 py-2">
        <div className={cx("form-control", { "border-red-500": errors.type && touched.type })}>
          <select name="type" onChange={handleChange} onBlur={handleBlur} value={values.type} className="bg-gray-700">
            <option value={ECongressCalendarItemType.Senate}>Senate</option>
            <option value={ECongressCalendarItemType.House}>House</option>
            <option value={ECongressCalendarItemType.Both}>Both</option>
            <option value={ECongressCalendarItemType.Holiday}>Holiday</option>
          </select>
          {errors.type && touched.type && <div className="text-red-500">{errors.type}</div>}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className={cx("form-control", { "border-red-500": errors.holiday && touched.holiday })}>
          <input
            type="text"
            name="holiday"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.holiday || "N/A"}
            className="w-full bg-gray-700"
            placeholder="Holiday"
          />
          {errors.holiday && touched.holiday && <div className="text-red-500">{errors.holiday}</div>}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className={cx("form-control", { "border-red-500": errors.date && touched.date })}>
          <DatePicker
            selected={values.date ? new Date(values.date) : null}
            onChange={(date) => setFieldValue("date", date)}
            className="w-full bg-gray-700"
            placeholderText="Date"
          />
          {errors.date && touched.date && <div className="text-red-500">{errors.date.toString()}</div>}
        </div>
      </td>
      <td className="px-4 py-2">
        <button className="btn w-full" disabled={isSubmitting} type="submit" onClick={() => handleSubmit()}>
          {isSubmitting ? "Submitting..." : buttonText}
        </button>
      </td>
    </tr>
  );
};
