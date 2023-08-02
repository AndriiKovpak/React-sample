import cx from "classnames";
import type { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FaUsers } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-tabs/style/react-tabs.css";
import { ssrExchange } from "urql";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import {
  GetClientsComponent,
  GetClientsDocument,
  GetClientsQuery,
  GetClientsQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../hooks/useSkipPagination";
import { nextReduxWrapper, useStoreActions, useStoreState } from "../../store/global.store";

export const getServerSideProps: GetServerSideProps = nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { firmId, workspaceId } = store.getState().settings;
  if (!firmId || !workspaceId) {
    console.error("bad store state");
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClient = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const meResp = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (meResp.error || !meResp.data?.me) {
    console.error(meResp.error);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  const clientsResp = await urqlClient
    .query<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, { take: 5, skip: 0, firmId, workspaceId })
    .toPromise();
  if (!clientsResp.data) {
    console.log(clientsResp);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  if (clientsResp.data.getClients.length === 0) {
    //TODO redirect to error page, user should be associated with some client
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  if (clientsResp.data.getClients.length === 1) {
    store.getActions().settings.setClientId(clientsResp.data.getClients[0].id);
    return { redirect: { destination: "/dashboard/workspace", permanent: false } };
  }
  return { props: { urqlState: ssrCache.extractData() } };
});

const Page: NextPage = () => {
  const router = useRouter();
  const { take, skip, loadMore } = useSkipPagination(5);
  const { clientId, firmId, workspaceId } = useStoreState((state) => state.settings);
  const { setClientId } = useStoreActions((actions) => actions.settings);
  return (
    <DashboardLayout>
      <div className="flex items-center space-x-2">
        <FaUsers />
        <span>Clients</span>
      </div>
      <GetClientsComponent variables={{ take, skip, firmId, workspaceId }}>
        {({ data }) => (
          <div className="overflow-hidden">
            <InfiniteScroll dataLength={data?.getClients.length ?? 0} next={loadMore} hasMore={true} loader={<></>} endMessage={<></>}>
              {data?.getClients.map((client, index) => (
                <div
                  key={index}
                  className={cx(
                    clientId === client.id ? "bg-gray-200 font-semibold" : "hover:bg-gray-100",
                    "cursor-pointer rounded-md px-4 py-2"
                  )}
                  onClick={async () => {
                    setClientId(client.id);
                    await router.push(`/dashboard/client`);
                  }}
                >
                  {client.name}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </GetClientsComponent>
    </DashboardLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
