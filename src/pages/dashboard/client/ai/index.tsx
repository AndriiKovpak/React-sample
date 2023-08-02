import type { NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import "react-tabs/style/react-tabs.css";
import "react-tooltip/dist/react-tooltip.css";
import { ssrExchange } from "urql";
import { DashboardLayout } from "../../../../components/layout/DashboardLayout";
import { nextUrqlClient } from "../../../../graphql/urql-client/nextUrqlClient";
import {
  GetClientComponent,
  GetClientDocument,
  GetClientQuery,
  GetClientQueryVariables,
  GetCurrentModelsDocument,
  GetCurrentModelsQuery,
  GetCurrentModelsQueryVariables,
  GetPromptsComponent,
  GetPromptsDocument,
  GetPromptsQuery,
  GetPromptsQueryVariables,
  GetWorkspaceDocument,
  GetWorkspaceQuery,
  GetWorkspaceQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../../../graphql/urql-codegen/code";
import { nextReduxWrapper, useStoreActions, useStoreState } from "../../../../store/global.store";

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
  await urqlClient.query<GetPromptsQuery, GetPromptsQueryVariables>(GetPromptsDocument, {}).toPromise();
  await urqlClient.query<GetCurrentModelsQuery, GetCurrentModelsQueryVariables>(GetCurrentModelsDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
});

const Page: NextPage = () => {
  const router = useRouter();
  const { clientId } = useStoreState((state) => state.settings);
  const { setPromptId } = useStoreActions((state) => state.settings);
  return (
    <DashboardLayout>
      <GetClientComponent variables={{ clientId }}>
        {({ data }) => <h1 className="text-primary-dark p-4 text-4xl">{data?.getClient.name}</h1>}
      </GetClientComponent>
      <div className="flex">
        <div className="flex-grow overflow-y-auto bg-secondary-light p-4">
          <GetPromptsComponent>
            {({ data }) => (
              <div className="grid grid-cols-3 gap-4">
                {data?.getPrompts.map(({ id, name, category, description }) => (
                  <div
                    key={id}
                    className="cursor-pointer rounded bg-white p-4 shadow"
                    onClick={async () => {
                      setPromptId(id);
                      await router.push("/dashboard/client/ai/completion");
                    }}
                  >
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-gray-600">{description}</p>
                    <p>{category}</p>
                  </div>
                ))}
              </div>
            )}
          </GetPromptsComponent>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
