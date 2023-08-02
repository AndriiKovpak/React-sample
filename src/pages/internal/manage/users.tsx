import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { CreateUserModal } from "../../../components/modals/CreateUserModal";
import { EditUserModal } from "../../../components/modals/EditUserModal";
import {
  DeleteUserComponent,
  GetFirmComponent,
  GetTimezonesDocument,
  GetTimezonesQuery,
  GetTimezonesQueryVariables,
  GetUsersComponent,
  GetUsersDocument,
  GetUsersQuery,
  GetUsersQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../../../graphql/urql-codegen/code";

import type { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "react-tooltip";
import { useDebounce } from "react-use";
import { ssrExchange } from "urql";
import { InternalLayout } from "../../../components/layout/InternalLayout";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import { useSkipPagination } from "../../../hooks/useSkipPagination";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  const resp = await client.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  if (resp.error || !resp.data?.me) return { redirect: { destination: "/auth/login", permanent: false } };
  if (!resp.data.me.samplePermission) return { redirect: { destination: "/dashboard", permanent: false } };
  await client.query<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, { take: 10, skip: 0 }).toPromise();
  await client.query<GetTimezonesQuery, GetTimezonesQueryVariables>(GetTimezonesDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
};

const Users: NextPage = () => {
  const [userId, setUserId] = useState<string>();
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
      <EditUserModal isOpen={modal === "edit"} id={userId} closeFn={() => setModal("")} />
      <CreateUserModal isOpen={modal === "create"} closeFn={() => setModal("")} />
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
        <GetUsersComponent variables={{ skip, take, search: debouncedValue }}>
          {({ data }) => (
            <InfiniteScroll dataLength={data?.getUsers.length ?? 0} next={loadMore} hasMore={true} loader={<></>} endMessage={<></>}>
              <table className="mx-auto w-fit">
                <thead>
                  <tr className="border-2 border-b-black p-4 font-bold">
                    <th>First</th>
                    <th>Email</th>
                    <th>Firm</th>
                  </tr>
                </thead>
                {data?.getUsers.map((user, index) => (
                  <tbody key={index}>
                    <tr className="border-grey-500 border-2 text-start font-normal">
                      <td className="flex flex-row">
                        <h1>{user.firstName}</h1>
                        <h1>{user.lastName}</h1>
                        <AiFillEdit
                          className="ml-auto flex cursor-pointer hover:opacity-70"
                          size={30}
                          onClick={() => {
                            setUserId(user.id);
                            setModal("edit");
                          }}
                        />
                        <DeleteUserComponent>
                          {({ executeMutation }) => (
                            <>
                              <button
                                className={`delete-button-${user.id}-page flex items-center rounded font-semibold text-red-700 hover:opacity-70`}
                              >
                                <AiFillDelete size={30} />
                              </button>
                              <Tooltip clickable openOnClick anchorSelect={`.delete-button-${user.id}-page`} place="top">
                                <button
                                  className={`delete-button-${user.id} flex items-center rounded bg-red-500 font-semibold text-white hover:bg-red-600`}
                                  onClick={() => executeMutation({ userId: user.id })}
                                >
                                  Confirm
                                </button>
                              </Tooltip>
                            </>
                          )}
                        </DeleteUserComponent>
                      </td>
                      <td className="p-4">{user.email}</td>
                      <GetFirmComponent variables={{ firmId: user.firmId }}>
                        {({ data }) => <td className="p-4">{data?.getFirm.name}</td>}
                      </GetFirmComponent>
                    </tr>
                  </tbody>
                ))}
              </table>
            </InfiniteScroll>
          )}
        </GetUsersComponent>
      </div>
    </InternalLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Users);
