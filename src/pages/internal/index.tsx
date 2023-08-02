import type { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { ssrExchange } from "urql";
import { InternalLayout } from "../../components/layout/InternalLayout";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import {
  GetStatsComponent,
  GetStatsDocument,
  GetStatsQuery,
  GetStatsQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../graphql/urql-codegen/code";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const resp = await client.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (resp.error || !resp.data?.me) return { redirect: { destination: "/auth/login", permanent: false } };
  if (!resp.data.me.samplePermission) return { redirect: { destination: "/dashboard", permanent: false } };
  await client.query<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
};

const Page: NextPage = () => {
  return (
    <InternalLayout>
      <GetStatsComponent>
        {({ data }) => (
          <div>
            <p>Firms: {data?.getStats.firmCount}</p>
            <p>Workspaces: {data?.getStats.workspaceCount}</p>
            <p>Clients: {data?.getStats.clientCount}</p>
            <p>Users: {data?.getStats.userCount}</p>
            <p>Completions: {data?.getStats.completions}</p>
            <p>Saved Completions: {data?.getStats.userSavedCompletions}</p>
            <p>OpenAi Tokens: {data?.getStats.openAiTokens}</p>
            <p>OpenAi Cost: ${data?.getStats.openAiCost}</p>
            <p>Anthropic Tokens: {data?.getStats.anthropicTokens}</p>
            <p>Anthropic Cost: ${data?.getStats.anthropicCost}</p>
          </div>
        )}
      </GetStatsComponent>
    </InternalLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
