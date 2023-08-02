import cx from "classnames";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { AiFillCheckCircle, AiOutlineBell, AiOutlinePlus } from "react-icons/ai";
import { BsFillGearFill, BsThreeDots } from "react-icons/bs";
import { FaBuilding, FaUser } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { LuNetwork } from "react-icons/lu";
import { MdFormatLineSpacing } from "react-icons/md";
import { PiArrowsLeftRightFill, PiDotsNineBold } from "react-icons/pi";
import { RiFilePaper2Line } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-tabs/style/react-tabs.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import { useBoolean } from "react-use";
import sampleSVG from "../../../public/images/sample.svg";
import {
  GetClientsComponent,
  GetFirmComponent,
  GetWorkspacesComponent,
  LogoutComponent,
  useMeQuery,
} from "../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../hooks/useSkipPagination";
import { useStoreActions, useStoreState } from "../../store/global.store";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { timezone } = useStoreState((state) => state.settings);
  dayjs.tz.setDefault(timezone);
  const router = useRouter();
  const workspacesPagination = useSkipPagination(6);
  const clientsPagination = useSkipPagination(6);
  const [showWorkspaces, toggleShowWorkspaces] = useBoolean(false);
  const { clientId, workspaceId } = useStoreState((state) => state.settings);
  const { setClientId, setWorkspaceId } = useStoreActions((actions) => actions.settings);
  const resetStore = useStoreActions((actions) => actions.reset);
  const [{ data }] = useMeQuery();

  return (
    <div className="grid min-h-screen flex-grow grid-cols-12 items-start">
      <div className="col-span-2 flex min-h-screen flex-col justify-between p-4">
        <div className="space-y-2">
          <ToastContainer />
          <div className="flex items-center justify-center">
            <Image src={sampleSVG} className="brightness-0 invert-0 saturate-100 filter" alt="sample" />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaBuilding />
              <GetFirmComponent variables={{ firmId: data?.me.firmId ?? "" }}>
                {({ data }) => <span>{data?.getFirm.name}</span>}
              </GetFirmComponent>
            </div>
            <BsFillGearFill />
          </div>
          <hr className="border border-gray-300" />
          <div className="flex items-center space-x-2">
            <PiDotsNineBold />
            <div>Dashboard</div>
          </div>
          <div className="flex items-center space-x-2">
            <RiFilePaper2Line />
            <div>Legislation</div>
          </div>
          <div className="flex items-center space-x-2">
            <GiOpenBook />
            <div>Directories</div>
          </div>
          <div className="flex items-center space-x-2">
            <AiFillCheckCircle />
            <div>Tasks</div>
          </div>
          <hr className="border border-gray-300" />
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <LuNetwork />
              <div>Workspaces</div>
            </div>
            <PiArrowsLeftRightFill className="cursor-pointer" onClick={() => toggleShowWorkspaces()} />
          </div>
          {showWorkspaces && (
            <GetWorkspacesComponent variables={{ take: workspacesPagination.take, skip: workspacesPagination.skip }}>
              {({ data }) => (
                <div className="overflow-auto" id="scrollableWorkspaces">
                  <InfiniteScroll
                    dataLength={data?.getWorkspaces.length ?? 0}
                    next={workspacesPagination.loadMore}
                    hasMore={true}
                    loader={<></>}
                    endMessage={<></>}
                    scrollableTarget="scrollableWorkspaces"
                  >
                    {data?.getWorkspaces.map((workspace) => (
                      <div
                        key={workspace.id}
                        className={cx(
                          { "bg-gray-800 font-semibold text-white": workspaceId === workspace.id },
                          "cursor-pointer rounded px-4 py-2"
                        )}
                        onClick={async () => {
                          setWorkspaceId(workspace.id);
                          await router.push(`/dashboard/workspace`);
                        }}
                      >
                        {workspace.name}
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              )}
            </GetWorkspacesComponent>
          )}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <MdFormatLineSpacing />
              <div>Clients</div>
            </div>
            <AiOutlinePlus />
          </div>
          <hr className="border border-gray-300" />
          <GetClientsComponent variables={{ take: clientsPagination.take, skip: clientsPagination.skip }}>
            {({ data }) => (
              <div className="overflow-auto" id="scrollableClients">
                <InfiniteScroll
                  dataLength={data?.getClients.length ?? 0}
                  next={clientsPagination.loadMore}
                  hasMore={true}
                  loader={<></>}
                  endMessage={<></>}
                  scrollableTarget="scrollableClients"
                >
                  <div className="space-y-2">
                    {data?.getClients.map((client, index) => (
                      <div
                        key={index}
                        className={cx({ "bg-gray-100 py-1 pl-1 font-semibold": clientId === client.id }, "cursor-pointer rounded")}
                        onClick={async () => {
                          setClientId(client.id);
                          await router.push(`/dashboard/client`);
                        }}
                      >
                        {client.name}
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            )}
          </GetClientsComponent>
        </div>
        <div className="space-y-2">
          <hr className="border border-gray-300" />
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              {data?.me.avatar ? <Image height={6} width={6} alt="" src={data.me.avatar} /> : <FaUser className="h-6 w-6 rounded" />}
              <div className="text-lg">{data?.me.firstName}</div>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineBell className="ml-4 h-4 w-4" />
              <BsThreeDots className="menu-anchor h-4 w-4 cursor-pointer" />
              <Tooltip clickable openOnClick anchorSelect=".menu-anchor" place="bottom">
                <div className="flex flex-col space-y-2">
                  <Link href="/dashboard/profile/settings" className="cursor-pointer">
                    Settings
                  </Link>
                  <LogoutComponent>
                    {({ executeMutation }) => (
                      <button
                        type="button"
                        onClick={async () => {
                          await router.push("/auth/login");
                          await executeMutation({});
                          resetStore();
                        }}
                      >
                        Logout
                      </button>
                    )}
                  </LogoutComponent>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-10 min-h-screen overflow-y-auto bg-gray-200 p-4">{children}</div>
    </div>
  );
};
