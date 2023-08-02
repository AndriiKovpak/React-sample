import { useCompletion } from "ai/react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import type { NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { FC, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiCopy, FiEdit, FiRefreshCcw, FiX } from "react-icons/fi";
import { GiBrain } from "react-icons/gi";
import { MdStop } from "react-icons/md";
import { RiDeleteBinLine, RiSave3Line } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useBoolean, useDebounce } from "react-use";
import { ssrExchange } from "urql";
import { DashboardLayout } from "../../../../components/layout/DashboardLayout";
import { getModelFromTokens, getTokenEstimate } from "../../../../functions/getTokenEstimate";
import { nextUrqlClient } from "../../../../graphql/urql-client/nextUrqlClient";
import {
  CompletionFragment,
  EditCompletionComponent,
  GetClientComponent,
  GetClientDocument,
  GetClientQuery,
  GetClientQueryVariables,
  GetCompletionsComponent,
  GetCurrentModelsDocument,
  GetCurrentModelsQuery,
  GetCurrentModelsQueryVariables,
  GetPromptComponent,
  GetPromptDocument,
  GetPromptQuery,
  GetPromptQueryVariables,
  GetWorkspaceDocument,
  GetWorkspaceQuery,
  GetWorkspaceQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  ModelFragment,
  UnsaveCompletionComponent,
  useGetCurrentModelsQuery,
  useGetSystemPromptQuery,
  useSaveCompletionMutation,
} from "../../../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../../../hooks/useSkipPagination";
import { useToastFormikErrors } from "../../../../hooks/useToastFormikErrors";
import { nextReduxWrapper, useStoreState } from "../../../../store/global.store";

export const getServerSideProps = nextReduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { clientId, workspaceId, promptId } = store.getState().settings;
  if (!promptId) return { redirect: { destination: "/dashboard/client/ai", permanent: false } };
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
  await urqlClient.query<GetPromptQuery, GetPromptQueryVariables>(GetPromptDocument, { promptId }).toPromise();
  await urqlClient.query<GetCurrentModelsQuery, GetCurrentModelsQueryVariables>(GetCurrentModelsDocument, {}).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
});

const Page: NextPage = () => {
  const [isEditing, toggleEdit] = useBoolean(false);
  const [isEdited, toggleEdited] = useBoolean(false);
  const [currentModel, setCurrentModel] = useState<ModelFragment>();
  const [currentCompletion, setCurrentCompletion] = useState<CompletionFragment>();
  const { take, skip, loadMore } = useSkipPagination(9);
  const { clientId, promptId } = useStoreState((state) => state.settings);
  const [systemPromptResp] = useGetSystemPromptQuery({ variables: { clientId, promptId } });
  const [CurrentModelsResp] = useGetCurrentModelsQuery();

  const { completion, input, isLoading, handleInputChange, handleSubmit, stop, complete, setCompletion, setInput } = useCompletion({
    api: "/api/ai-completion",
    onResponse: () =>
      setCurrentModel(getModelFromTokens(systemPromptResp.data?.getSystemPrompt + input, CurrentModelsResp.data!.getCurrentModels)),
    onError: (error) => console.error(error),
    body: {
      systemPrompt: systemPromptResp.data?.getSystemPrompt,
      promptId,
      clientId,
      models: CurrentModelsResp.data?.getCurrentModels,
    },
  });

  const [tokenCount, setTokenCount] = useState(getTokenEstimate(systemPromptResp.data?.getSystemPrompt + input));
  useDebounce(() => setTokenCount(getTokenEstimate(systemPromptResp.data?.getSystemPrompt + input)), 100, [
    systemPromptResp.data?.getSystemPrompt,
    input,
  ]);

  const tokenMax = 100_000;
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center space-x-4 ">
          <GetPromptComponent variables={{ promptId }}>
            {({ data }) => (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4 ">
                  <GiBrain />
                  <p>AI Tools</p>
                  <div>{data?.getPrompt.name}</div>
                </div>
                <div>{data?.getPrompt.description}</div>
              </div>
            )}
          </GetPromptComponent>
          <div className="h-full border-l border-black" />
          <GetClientComponent variables={{ clientId }}>{({ data }) => <h1>{data?.getClient.name}</h1>}</GetClientComponent>
          <form onSubmit={handleSubmit}>
            <button className="btn" type="submit">
              Generate
            </button>
          </form>
        </div>
        <hr className="w-full border border-gray-800" />
        <p>
          Token Count: {tokenCount}/{tokenMax}
        </p>
        <textarea onChange={handleInputChange} maxLength={tokenMax * 4} className="h-36 w-96 rounded border border-gray-200 p-2" />
        <hr className="border border-gray-300" />
        <GetCompletionsComponent variables={{ promptId, skip, take }}>
          {({ data }) => (
            <InfiniteScroll
              dataLength={data?.getCompletions.length ?? 0}
              next={loadMore}
              hasMore={(data?.getCompletions.length ?? 1) % take === 0}
              loader={<></>}
              endMessage={<></>}
              scrollableTarget="completions-infinite"
            >
              <div className="flex flex-col space-y-2">
                {data?.getCompletions.map((completion) => (
                  <div key={completion.id} className="flex items-center space-x-2">
                    <button type="button" onClick={() => setCurrentCompletion(completion)} className="btn">
                      <AiFillEye />
                    </button>
                    <p>{completion.displayName}</p>
                    <div>{dayjs(completion.createdAt).fromNow()}</div>
                    <button className={`e-prompt-anchor-${completion.id}-page btn`}>
                      <RiDeleteBinLine />
                    </button>
                    <Tooltip clickable openOnClick anchorSelect={`.e-prompt-anchor-${completion.id}-page`} place="top">
                      <UnsaveCompletionComponent>
                        {({ executeMutation }) => (
                          <button
                            className={`e-prompt-anchor-${completion.id} btn`}
                            onClick={() => executeMutation({ completionId: completion.id })}
                          >
                            Confirm
                          </button>
                        )}
                      </UnsaveCompletionComponent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          )}
        </GetCompletionsComponent>
        {(completion || currentCompletion) && (
          <div className="flex flex-col">
            <div className="flex space-x-2">
              {isLoading ? (
                <button type="button" onClick={stop} className="btn">
                  <MdStop />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigator.clipboard.writeText(completion).then(() => toast.success("Copied to clipboard"))}
                    className="btn"
                    type="button"
                  >
                    <FiCopy />
                  </button>
                  <button type="button" onClick={() => complete(input)} className="btn">
                    <FiRefreshCcw />
                  </button>
                  {!isEditing ? (
                    <button onClick={() => toggleEdit(true)} type="button" className="btn">
                      <FiEdit />
                    </button>
                  ) : (
                    <button onClick={() => toggleEdit(false)} type="button" className="btn">
                      <FiX />
                    </button>
                  )}
                  {currentModel && (
                    <SaveButton
                      callback={() => {
                        setCompletion("");
                        setInput("");
                      }}
                      currentModel={currentModel}
                      completion={completion}
                      promptId={promptId}
                      systemPrompt={systemPromptResp.data?.getSystemPrompt}
                      userPrompt={input}
                      clientId={clientId}
                    />
                  )}
                  {currentCompletion && !isEditing && isEdited && (
                    <EditCompletionComponent>
                      {({ executeMutation }) => (
                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            executeMutation({ completion: currentCompletion!.completion, completionId: currentCompletion!.id })
                          }
                        >
                          <RiSave3Line />
                        </button>
                      )}
                    </EditCompletionComponent>
                  )}
                  {currentCompletion && (
                    <>
                      <button className={`e-prompt-anchor-${currentCompletion?.id}-modal btn`}>
                        <RiDeleteBinLine />
                      </button>
                      <Tooltip clickable openOnClick anchorSelect={`.e-prompt-anchor-${currentCompletion?.id}-modal`} place="bottom">
                        <UnsaveCompletionComponent>
                          {({ executeMutation }) => (
                            <button
                              className="btn"
                              onClick={() =>
                                executeMutation({ completionId: currentCompletion?.id ?? "" }).then(() => setCurrentCompletion(undefined))
                              }
                            >
                              Confirm
                            </button>
                          )}
                        </UnsaveCompletionComponent>
                      </Tooltip>
                    </>
                  )}
                </>
              )}
            </div>
            {isEditing ? (
              <div className="mt-6 min-h-[65vh] w-[65vw] rounded bg-gray-200 p-4">
                <textarea
                  value={currentCompletion?.completion ?? completion}
                  onTouchStart={() => toggleEdited(true)}
                  onChange={(e) =>
                    currentCompletion
                      ? setCurrentCompletion({ ...currentCompletion, completion: e.target.value })
                      : setCompletion(e.target.value)
                  }
                  className="h-full w-full flex-1 resize-none rounded-md border border-gray-200 p-2"
                />
              </div>
            ) : (
              <div className="mt-6 min-h-[65vh] w-[65vw] overflow-y-auto rounded bg-gray-200 p-4">
                <div className="whitespace-pre-wrap">{currentCompletion?.completion ?? completion}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);

interface SaveButtonProps {
  currentModel?: ModelFragment;
  callback: Function;
  completion: string;
  promptId: string;
  systemPrompt?: string;
  userPrompt: string;
  clientId?: string;
}

const SaveButton: FC<SaveButtonProps> = ({ currentModel, completion, promptId, callback, systemPrompt = "", userPrompt, clientId }) => {
  const [, saveCompletionFN] = useSaveCompletionMutation();
  const { model, provider } = currentModel!;
  const { isSubmitting, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik<{ displayName: string }>({
    initialValues: { displayName: "" },
    onSubmit: async ({ displayName }) => {
      const { error } = await saveCompletionFN({
        model,
        provider,
        completion,
        promptId,
        systemPrompt,
        userPrompt,
        clientId,
        displayName,
      });
      if (error) console.error(error);
      else callback();
    },
  });
  useToastFormikErrors(errors, touched);
  return (
    <>
      <button type="button" className={`e-prompt-anchor-${promptId} btn`}>
        <RiSave3Line />
      </button>
      <Tooltip clickable openOnClick anchorSelect={`.e-prompt-anchor-${promptId}`} place="top">
        <form onSubmit={handleSubmit}>
          <input
            name="displayName"
            placeholder="Display Name"
            type="text"
            className="rounded px-2 py-1 text-sm leading-tight text-black"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button type="submit" className="btn">
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </Tooltip>
    </>
  );
};
