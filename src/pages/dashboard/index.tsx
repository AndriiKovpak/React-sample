import cx from "classnames";
import type { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FaUsers } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-tabs/style/react-tabs.css";
import { useBoolean } from "react-use";
import { ssrExchange } from "urql";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import {
  GetWorkspacesComponent,
  GetWorkspacesDocument,
  GetWorkspacesQuery,
  GetWorkspacesQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../hooks/useSkipPagination";
import { nextReduxWrapper, useStoreActions, useStoreState } from "../../store/global.store";

export const getServerSideProps: GetServerSideProps = nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClient = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const meResp = await urqlClient.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (meResp.error || !meResp.data?.me) {
    console.error(meResp.error);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  const workspacesResp = await urqlClient
    .query<GetWorkspacesQuery, GetWorkspacesQueryVariables>(GetWorkspacesDocument, { take: 10, skip: 0 })
    .toPromise();
  if (!workspacesResp.data) {
    console.log(workspacesResp);
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  if (workspacesResp.data.getWorkspaces.length === 0) {
    //TODO redirect to error page, user should be associated with some workspace
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  if (workspacesResp.data.getWorkspaces.length === 1) {
    store.getActions().settings.setWorkspaceId(workspacesResp.data.getWorkspaces[0].id);
    return { redirect: { destination: "/dashboard/workspace", permanent: false } };
  }
  return { props: { urqlState: ssrCache.extractData() } };
});

const Page: NextPage = () => {
  const router = useRouter();
  const { take, skip, loadMore } = useSkipPagination(10);
  const [isSubmitting, toggleSubmit] = useBoolean(false);
  const { workspaceId } = useStoreState((state) => state.settings);
  const { setWorkspaceId } = useStoreActions((actions) => actions.settings);
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center space-x-2">
          <FaUsers />
          <span>Workspaces</span>
        </div>
        <GetWorkspacesComponent variables={{ take, skip }}>
          {({ data }) => (
            <InfiniteScroll dataLength={data?.getWorkspaces.length ?? 0} next={loadMore} hasMore={true} loader={<></>} endMessage={<></>}>
              <div className="sidebar flex flex-col items-start">
                {data?.getWorkspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    disabled={isSubmitting}
                    className={cx(workspaceId === workspace.id ? "bg-gray-200 font-semibold" : "hover:bg-gray-100", "btn")}
                    onClick={async () => {
                      toggleSubmit(true);
                      setWorkspaceId(workspace.id);
                      await router.push(`/dashboard/workspace`);
                      toggleSubmit(false);
                    }}
                  >
                    {workspace.name}
                  </button>
                ))}
              </div>
            </InfiniteScroll>
          )}
        </GetWorkspacesComponent>
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
