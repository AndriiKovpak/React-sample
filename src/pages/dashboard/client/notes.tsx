import type { NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import "react-tabs/style/react-tabs.css";
import { ssrExchange } from "urql";
import { CalendarComponent } from "../../../components/dashboard/CalendarComponent";
import { ClientNotes } from "../../../components/dashboard/ClientNotes";
import { RSSFeed } from "../../../components/dashboard/rss";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  GetClientComponent,
  GetClientDocument,
  GetClientQuery,
  GetClientQueryVariables,
  GetCongressCalendarDocument,
  GetCongressCalendarQuery,
  GetCongressCalendarQueryVariables,
  GetMyRssEntriesDocument,
  GetMyRssEntriesQuery,
  GetMyRssEntriesQueryVariables,
  GetWorkspaceDocument,
  GetWorkspaceQuery,
  GetWorkspaceQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../../graphql/urql-codegen/code";
import { nextReduxWrapper, useStoreState } from "../../../store/global.store";

export const getServerSideProps = nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { clientId, workspaceId } = store.getState().settings;
  if (!clientId) return { redirect: { destination: "/dashboard/workspace", permanent: false } };
  if (!workspaceId) return { redirect: { destination: "/auth/login", permanent: false } };
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClient = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const meResp = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (meResp.error || !meResp.data?.me) {
    console.error(meResp.error);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  await urqlClient.query<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, { workspaceId }).toPromise();
  await urqlClient.query<GetClientQuery, GetClientQueryVariables>(GetClientDocument, { clientId }).toPromise();
  await urqlClient.query<GetMyRssEntriesQuery, GetMyRssEntriesQueryVariables>(GetMyRssEntriesDocument, { skip: 0, take: 9 }).toPromise();
  await urqlClient.query<GetCongressCalendarQuery, GetCongressCalendarQueryVariables>(GetCongressCalendarDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
});

const Page: NextPage = () => {
  const { clientId } = useStoreState((state) => state.settings);
  return (
    <DashboardLayout>
      <GetClientComponent variables={{ clientId }}>
        {({ data }) => <h1 className="text-primary-dark p-4 text-4xl">{data?.getClient.name}</h1>}
      </GetClientComponent>
      <div className="flex">
        <div className="w-96 overflow-y-auto bg-secondary-light p-4">
          <RSSFeed />
          <CalendarComponent />
        </div>
        <div className="flex-grow overflow-y-auto bg-secondary-light p-4">
          <ClientNotes />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
