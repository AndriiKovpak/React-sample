import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { LogoutComponent, MeComponent } from "../../graphql/urql-codegen/code";
import { useStoreActions } from "../../store/global.store";

const InternalNavbar = () => {
  const router = useRouter();
  const resetStore = useStoreActions((actions) => actions.reset);
  return (
    <div className="h-10vh fixed top-0 z-50 flex w-full items-center justify-between border-b-2 border-gray-400 bg-black px-4">
      <img
        className="cursor-pointer hover:opacity-75"
        src="/Logo M.svg"
        alt="Main Logo"
        style={{ height: "35px", width: "auto" }}
        onClick={() => router.push("/")}
      />
      <div className="flex items-center">
        <MeComponent>
          {({ data }) => (
            <button
              className="rounded-md border border-white bg-transparent px-3 py-2 text-white hover:bg-white hover:text-black focus:outline-none"
              onClick={() => router.push(`/dashboard/profile/settings`)}
            >
              <div className="flex items-center space-x-2">
                {data?.me.avatar ? (
                  <Image height={32} width={32} alt="" src={data.me.avatar} />
                ) : (
                  <FaUser className="h-4 w-4 rounded-full" />
                )}
                <span className="max-w-xs truncate">{data?.me.firstName}</span>
              </div>
            </button>
          )}
        </MeComponent>
        <LogoutComponent>
          {({ executeMutation }) => (
            <button
              className="ml-2 rounded-md border border-white bg-transparent px-3 py-2 text-white hover:bg-white hover:text-black focus:outline-none"
              onClick={async () => {
                executeMutation({});
                await router.push("/auth/login");
                resetStore();
              }}
            >
              <RiLogoutBoxRLine className="h-4 w-4" />
            </button>
          )}
        </LogoutComponent>
        <ToastContainer />
      </div>
    </div>
  );
};

export const InternalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>React</title>
        <meta name="description" content="React Internal Dashboard" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <InternalNavbar />
        <div className="grid flex-grow grid-cols-12">
          <div className="col-span-1 overflow-y-auto bg-gray-800 p-4 pl-0">
            <InternalSidebar />
          </div>
          <main className="col-span-11 overflow-y-auto bg-black  p-4">
            <div className="min-h-screen bg-black text-white">
              <div className="flex h-full flex-col justify-center gap-y-5 pt-12 text-center">
                <div className="mx-auto flex flex-row">
                  <h1 className="mt-5 text-5xl font-bold">Internal admin dashboard</h1>
                </div>
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export const InternalSidebar = () => {
  const router = useRouter();

  return (
    <aside className="h-full overflow-y-auto bg-gray-800">
      <div className="max-w-xs py-6 lg:px-8">
        <h2 className="mb-4 mt-6 text-lg font-semibold text-white">Sidebar</h2>
        <nav>
          <ul className="text-start text-white">
            <li className="mb-2">
              <button
                onClick={() => {
                  router.push("/internal/manage/clients");
                }}
                className={`text-primary-base ${
                  router.pathname === "/internal/manage/clients" && "rounded-full border-2 border-white px-2"
                }`}
              >
                Clients
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  router.push("/internal/manage/firms");
                }}
                className={`text-primary-base ${router.pathname === "/internal/manage/firms" && "rounded-full border-2 border-white px-2"}`}
              >
                Firms
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  router.push("/internal/manage/users");
                }}
                className={`text-primary-base ${router.pathname === "/internal/manage/users" && "rounded-full border-2 border-white px-2"}`}
              >
                Users
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  router.push("/internal/manage/workspaces");
                }}
                className={`text-primary-base ${
                  router.pathname === "/internal/manage/workspaces" && "rounded-full border-2 border-white px-2"
                }`}
              >
                Workspaces
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  router.push("/internal/manage/congress-calendar");
                }}
                className={`text-primary-base ${
                  router.pathname === "/internal/manage/congress-calendar" && "rounded-full border-2 border-white px-2"
                }`}
              >
                Congress Calendar
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  router.push("/internal/manage/rss-feeds");
                }}
                className={`text-primary-base ${
                  router.pathname === "/internal/manage/rss-feeds" && "rounded-full border-2 border-white px-2"
                }`}
              >
                RSS Feeds
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
