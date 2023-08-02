import type { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "react-tooltip";
import { useDebounce } from "react-use";
import { ssrExchange } from "urql";
import { InternalLayout } from "../../../components/layout/InternalLayout";
import { CreateFirmModal } from "../../../components/modals/CreateFirmModal";
import { EditFirmModal } from "../../../components/modals/EditFirmModal";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  DeleteFirmComponent,
  GetFirmsComponent,
  GetFirmsDocument,
  GetFirmsQuery,
  GetFirmsQueryVariables,
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
  await client.query<GetFirmsQuery, GetFirmsQueryVariables>(GetFirmsDocument, { take: 10, skip: 0 }).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
};

const Firms: NextPage = () => {
  const [firmId, setFirmId] = useState<string>();
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
      <EditFirmModal isOpen={modal === "edit"} id={firmId} closeFn={() => setModal("")} />
      <CreateFirmModal isOpen={modal === "create"} closeFn={() => setModal("")} />
      <button className="mx-auto flex">
        <AiFillPlusCircle size={50} onClick={() => setModal("create")} />
      </button>
      <div>
        <input
          className="w-[30%] border-2 border-neutral-800 bg-black p-4 text-lg"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <GetFirmsComponent variables={{ skip, take, search: debouncedValue }}>
          {({ data }) => (
            <InfiniteScroll dataLength={data?.getFirms.length ?? 0} next={loadMore} hasMore={true} loader={<></>} endMessage={<></>}>
              <table className="mx-auto w-fit">
                <thead>
                  <tr className="border-2 border-b-black p-4 font-bold">
                    <th>Name</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                {data?.getFirms.map((item, index) => (
                  <tbody key={index}>
                    <tr className="border-grey-500 border-2 text-start font-normal">
                      <td className="flex flex-row">
                        <h1>{item.name}</h1>
                        <AiFillEdit
                          className="ml-auto flex cursor-pointer hover:opacity-70"
                          size={30}
                          onClick={() => {
                            setFirmId(item.id);
                            setModal("edit");
                          }}
                        />
                        <DeleteFirmComponent>
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
                                  onClick={() => executeMutation({ firmId: item.id })}
                                >
                                  Confirm
                                </button>
                              </Tooltip>
                            </>
                          )}
                        </DeleteFirmComponent>
                      </td>
                      <td className="p-4">{item.createdAt}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </InfiniteScroll>
          )}
        </GetFirmsComponent>
      </div>
    </InternalLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Firms);
