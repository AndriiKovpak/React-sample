import type { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "react-tooltip";
import { useDebounce } from "react-use";
import { ssrExchange } from "urql";
import { InternalLayout } from "../../../components/layout/InternalLayout";
import { CreateClientModal } from "../../../components/modals/CreateClientModal";
import { EditClientModal } from "../../../components/modals/EditClientModal";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  DeleteClientComponent,
  GetClientsComponent,
  GetClientsDocument,
  GetClientsQuery,
  GetClientsQueryVariables,
  GetFirmComponent,
  GetWorkspaceComponent,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../../hooks/useSkipPagination";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const resp = await client.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (resp.error || !resp.data?.me) return { redirect: { destination: "/auth/login", permanent: false } };
  if (!resp.data.me.samplePermission) return { redirect: { destination: "/dashboard", permanent: false } };
  await client.query<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, { take: 10, skip: 0 }).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
};

export const Clients: NextPage = () => {
  const [clientId, setClientId] = useState<string>();
  const { take, skip, loadMore } = useSkipPagination(10);
  const [search, setSearch] = useState<string>();
  const [modal, setModal] = useState<"create" | "edit" | "">("");
  const [debouncedValue, setDebouncedValue] = useState<string>();
  useDebounce(
    () => {
      setDebouncedValue(search);
    },
    500,
    [search]
  );
  return (
    <InternalLayout>
      <EditClientModal isOpen={modal === "edit"} id={clientId} closeFn={() => setModal("")} />
      <CreateClientModal isOpen={modal === "create"} closeFn={() => setModal("")} />
      <button type="button" className="mx-auto flex">
        <AiFillPlusCircle size={50} onClick={() => setModal("create")} />
      </button>
      <div>
        <input
          className="w-[30%] border-2 border-neutral-800 bg-black p-4 text-lg"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <GetClientsComponent variables={{ skip, take, search: debouncedValue }}>
          {({ data }) => (
            <InfiniteScroll dataLength={data?.getClients.length ?? 0} next={loadMore} hasMore={true} loader={<></>} endMessage={<></>}>
              <table className="mx-auto mt-4 w-fit">
                <thead>
                  <tr className="border-2 border-b-black p-4 font-bold">
                    <th>Name</th>
                    <th>Firm</th>
                    <th>Workspace</th>
                    <th>Objective</th>
                    <th>Description</th>
                  </tr>
                </thead>
                {data?.getClients.map((item, index) => (
                  <tbody key={index}>
                    <tr className="border-grey-500 border-2 text-start font-normal">
                      <td className="flex flex-row">
                        <h1>{item.name}</h1>
                        <AiFillEdit
                          className="ml-auto flex cursor-pointer hover:opacity-70"
                          size={30}
                          onClick={() => {
                            setClientId(item.id);
                            setModal("edit");
                          }}
                        />
                        <DeleteClientComponent>
                          {({ executeMutation }) => (
                            <>
                              <button
                                className={`delete-button-${item.id}-page flex items-center rounded font-semibold text-red-700 hover:opacity-70`}
                              >
                                <AiFillDelete size={30} />
                              </button>
                              <Tooltip clickable openOnClick anchorSelect={`.delete-button-${item.id}-page`} place="top">
                                <button
                                  className={`delete-button-${item.id} flex items-center rounded bg-red-500 font-semibold text-white hover:bg-red-600`}
                                  onClick={() => executeMutation({ clientId: item.id })}
                                >
                                  Confirm
                                </button>
                              </Tooltip>
                            </>
                          )}
                        </DeleteClientComponent>
                      </td>
                      <GetFirmComponent variables={{ firmId: item.firmId }}>
                        {({ data, fetching, error }) => <td className="p-3">{fetching || error ? "Unknown" : data?.getFirm.name}</td>}
                      </GetFirmComponent>
                      <GetWorkspaceComponent variables={{ workspaceId: item.workspaceId }}>
                        {({ data, fetching, error }) => <td className="p-3">{fetching || error ? "Unknown" : data?.getWorkspace.name}</td>}
                      </GetWorkspaceComponent>
                      <td className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap px-4">{item.objective}</td>
                      <td className="max-w-sm">
                        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap px-4">{item.description}</h1>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </InfiniteScroll>
          )}
        </GetClientsComponent>
      </div>
    </InternalLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Clients);
