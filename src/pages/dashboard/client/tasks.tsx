import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import alibarray from "alib-array";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillTrashFill } from "react-icons/bs";
import "react-tabs/style/react-tabs.css";
import { ssrExchange } from "urql";
import { CalendarComponent } from "../../../components/dashboard/CalendarComponent";
import { RSSFeed } from "../../../components/dashboard/rss";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";
import {
  DeleteTaskComponent,
  ETaskStatus,
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
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
  GetWorkspaceDocument,
  GetWorkspaceQuery,
  GetWorkspaceQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  TaskFragment,
  useGetTasksQuery,
} from "../../../graphql/urql-codegen/code";
import { nextReduxWrapper, useStoreState } from "../../../store/global.store";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export const getServerSideProps = nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { clientId, workspaceId, firmId } = store.getState().settings;
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
  await urqlClient.query<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, { clientId, workspaceId, firmId }).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
});

const Page: NextPage = () => {
  const { clientId, firmId, workspaceId } = useStoreState((state) => state.settings);
  const [{ data }] = useGetTasksQuery({ variables: { firmId, clientId, workspaceId } });
  console.log({ data });
  const statusToTasks: Record<ETaskStatus, TaskFragment[]> = {
    [ETaskStatus.ToDo]: [],
    [ETaskStatus.InProgress]: [],
    [ETaskStatus.Completed]: [],
  };
  for (const task of data?.getTasks ?? []) {
    statusToTasks[task.status].push(task);
  }

  return (
    <DashboardLayout>
      <GetClientComponent variables={{ clientId }}>
        {({ data }) => <h1 className="text-primary-dark p-4 text-4xl">{data?.getClient.name}</h1>}
      </GetClientComponent>
      <div className="flex">
        <div className="w-96 p-4">
          <RSSFeed />
          <CalendarComponent />
        </div>
        <div className="p-4">
          <h2 className="text-primary-base mb-4 text-2xl">Task Board</h2>
          <DragDropContext
            onDragEnd={(result, _provided) => {
              if (!result.destination) return;
              if (result.source.droppableId === result.destination.droppableId && result.source.index === result.destination.index) return;
              if (result.source.droppableId === result.destination.droppableId) {
                alibarray(statusToTasks[result.source.droppableId as ETaskStatus]).move(result.source.index, result.destination.index);
              } else {
                const [task] = statusToTasks[result.source.droppableId as ETaskStatus].splice(result.source.index, 1);
                alibarray(statusToTasks[result.destination.droppableId as ETaskStatus]).insert(task, result.destination.index);
              }
            }}
          >
            <div className={`grid grid-cols-${Object.values(ETaskStatus).length} gap-4`}>
              {Object.values(ETaskStatus).map((statusColumn) => (
                <Droppable droppableId={statusColumn}>
                  {(droppableProvided) => (
                    <div
                      className="space-y-2 rounded-md bg-white p-4"
                      {...droppableProvided.droppableProps}
                      ref={droppableProvided.innerRef}
                    >
                      <p className="flex text-center">{statusColumn}</p>
                      {statusToTasks[statusColumn].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(draggableProvided) => (
                            <div
                              key={task.id}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              className="space-y-2 rounded-lg bg-yellow-200 p-4"
                            >
                              <p className="text-lg">{task.objective}</p>
                              <div className="flex justify-between">
                                <p className="text-sm">Status: {task.status}</p>
                                {task.dueDate && <p className="text-sm">Due Date: {dayjs(task.dueDate).tz().format("MM-DD-YYYY")}</p>}
                              </div>
                              <p className="text-sm">Description: {task.description}</p>
                              <DeleteTaskComponent>
                                {({ executeMutation }) => (
                                  <BsFillTrashFill className="cursor-pointer" onClick={() => executeMutation({ taskId: task.id })} />
                                )}
                              </DeleteTaskComponent>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {droppableProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
