import { Cache, cacheExchange, ResolveInfo } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import {
  CreateClientMutation,
  CreateClientMutationVariables,
  CreateDocumentMutation,
  CreateDocumentMutationVariables,
  CreateFirmMutation,
  CreateFirmMutationVariables,
  CreateNoteMutation,
  CreateNoteMutationVariables,
  CreateTaskMutation,
  CreateTaskMutationVariables,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables,
  DeleteClientMutation,
  DeleteClientMutationVariables,
  DeleteDocumentMutation,
  DeleteDocumentMutationVariables,
  DeleteFirmMutation,
  DeleteFirmMutationVariables,
  DeleteNoteMutation,
  DeleteNoteMutationVariables,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables,
  GetClientsDocument,
  GetClientsQuery,
  GetClientsQueryVariables,
  GetCompletionsDocument,
  GetCompletionsQuery,
  GetCompletionsQueryVariables,
  GetDocumentsDocument,
  GetDocumentsQuery,
  GetDocumentsQueryVariables,
  GetFirmsDocument,
  GetFirmsQuery,
  GetFirmsQueryVariables,
  GetMyRssEntriesDocument,
  GetMyRssEntriesQuery,
  GetMyRssEntriesQueryVariables,
  GetNotesDocument,
  GetNotesQuery,
  GetNotesQueryVariables,
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
  GetUsersDocument,
  GetUsersQuery,
  GetUsersQueryVariables,
  GetWorkspacesDocument,
  GetWorkspacesQuery,
  GetWorkspacesQueryVariables,
  LogoutMutation,
  LogoutMutationVariables,
  MyRssFeedSubscription,
  MyRssFeedSubscriptionVariables,
  SaveCompletionMutation,
  SaveCompletionMutationVariables,
  UnsaveCompletionMutation,
  UnsaveCompletionMutationVariables,
} from "../urql-codegen/code";
import schema from "../urql-codegen/introspection.json";

export const normalizedCache = cacheExchange({
  schema,
  keys: {
    RssSubscriptionEntity: (data) => String(data.subscription_id),
    RssEntryEntity: (data) => String(data.guid),
    TimezoneDTO: (data) => String(data.abbrev),
    ModelDTO: (data) => String(data.provider) + String(data.model),
    CurrentModelsDTO: () => "CurrentModelsDTO",
  },
  resolvers: {
    Query: {
      getDocuments: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
      getNotes: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
      getMyRssEntries: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
      getCompletions: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
      getClients: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
      getFirms: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
      getWorkspaces: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
      getUsers: simplePagination({ limitArgument: "take", offsetArgument: "skip" }),
    },
  },
  updates: {
    Mutation: {
      logout: (_parent: LogoutMutation, _fieldArgs: LogoutMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.invalidate("Query");
      },
      createDocument: async (parent: CreateDocumentMutation, _args: CreateDocumentMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.updateQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(
          {
            query: GetDocumentsDocument,
            variables: { skip: 0, take: 9, clientId: parent.createDocument.clientId, workspaceId: parent.createDocument.workspaceId },
          },
          (data) => {
            if (!data) return { getDocuments: [parent.createDocument] };
            data.getDocuments.unshift(parent.createDocument);
            return data;
          }
        );
      },
      deleteDocument: async (parent: DeleteDocumentMutation, _args: DeleteDocumentMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getDocuments" && field.arguments) {
            cache.updateQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(
              {
                query: GetDocumentsDocument,
                variables: field.arguments as GetDocumentsQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getDocuments = data.getDocuments.filter((doc) => doc.id !== parent.deleteDocument);
                return data;
              }
            );
          }
        }
      },
      createNote: async (parent: CreateNoteMutation, _args: CreateNoteMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.updateQuery<GetNotesQuery, GetNotesQueryVariables>(
          {
            query: GetNotesDocument,
            variables: { skip: 0, take: 9, clientId: parent.createNote.clientId, search: "" },
          },
          (data) => {
            if (!data) return { getNotes: [parent.createNote] };
            data.getNotes.unshift(parent.createNote);
            return data;
          }
        );
      },
      deleteNote: async (parent: DeleteNoteMutation, _args: DeleteNoteMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getNotes" && field.arguments) {
            cache.updateQuery<GetNotesQuery, GetNotesQueryVariables>(
              {
                query: GetNotesDocument,
                variables: field.arguments as GetNotesQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getNotes = data.getNotes.filter((note) => note.id !== parent.deleteNote.id);
                return data;
              }
            );
          }
        }
      },
      createTask: async (parent: CreateTaskMutation, _args: CreateTaskMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.updateQuery<GetTasksQuery, GetTasksQueryVariables>(
          {
            query: GetTasksDocument,
            variables: {
              clientId: parent.createTask.clientId,
              firmId: parent.createTask.firmId,
              workspaceId: parent.createTask.workspaceId,
            },
          },
          (data) => {
            if (!data) return { getTasks: [parent.createTask] };
            data.getTasks.unshift(parent.createTask);
            return data;
          }
        );
      },
      deleteTask: async (parent: DeleteTaskMutation, _args: DeleteTaskMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getTasks" && field.arguments) {
            cache.updateQuery<GetTasksQuery, GetTasksQueryVariables>(
              {
                query: GetTasksDocument,
                variables: field.arguments as GetTasksQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getTasks = data.getTasks.filter((task) => task.id !== parent.deleteTask.id);
                return data;
              }
            );
          }
        }
      },
      saveCompletion: async (parent: SaveCompletionMutation, _args: SaveCompletionMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.updateQuery<GetCompletionsQuery, GetCompletionsQueryVariables>(
          {
            query: GetCompletionsDocument,
            variables: { skip: 0, take: 9, promptId: parent.saveCompletion.promptId },
          },
          (data) => {
            if (!data) return { getCompletions: [parent.saveCompletion] };
            data.getCompletions.unshift(parent.saveCompletion);
            return data;
          }
        );
      },
      unsaveCompletion: async (
        parent: UnsaveCompletionMutation,
        _args: UnsaveCompletionMutationVariables,
        cache: Cache,
        _info: ResolveInfo
      ) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getCompletions" && field.arguments) {
            cache.updateQuery<GetCompletionsQuery, GetCompletionsQueryVariables>(
              {
                query: GetCompletionsDocument,
                variables: field.arguments as GetCompletionsQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getCompletions = data.getCompletions.filter((completion) => completion.id !== parent.unsaveCompletion);
                return data;
              }
            );
          }
        }
      },
      createClient: async (parent: CreateClientMutation, _args: CreateClientMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getClients" && (field?.arguments?.skip as number) === 0) {
            cache.updateQuery<GetClientsQuery, GetClientsQueryVariables>(
              {
                query: GetClientsDocument,
                variables: field.arguments as GetClientsQueryVariables,
              },
              (data) => {
                if (!data) return { getClients: [parent.createClient] };
                data.getClients.unshift(parent.createClient);
                return data;
              }
            );
          }
        }
      },
      createFirm: async (parent: CreateFirmMutation, _args: CreateFirmMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getFirms" && (field?.arguments?.skip as number) === 0) {
            cache.updateQuery<GetFirmsQuery, GetFirmsQueryVariables>(
              {
                query: GetFirmsDocument,
                variables: field.arguments as GetFirmsQueryVariables,
              },
              (data) => {
                if (!data) return { getFirms: [parent.createFirm] };
                data.getFirms.unshift(parent.createFirm);
                return data;
              }
            );
          }
        }
      },
      createWorkspace: async (
        parent: CreateWorkspaceMutation,
        _args: CreateWorkspaceMutationVariables,
        cache: Cache,
        _info: ResolveInfo
      ) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getWorkspaces" && (field?.arguments?.skip as number) === 0) {
            cache.updateQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(
              {
                query: GetWorkspacesDocument,
                variables: field.arguments as GetWorkspacesQueryVariables,
              },
              (data) => {
                if (!data) return { getWorkspaces: [parent.createWorkspace] };
                data.getWorkspaces.unshift(parent.createWorkspace);
                return data;
              }
            );
          }
        }
      },
      createUser: async (parent: CreateUserMutation, _args: CreateUserMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getUsers" && (field?.arguments?.skip as number) === 0) {
            cache.updateQuery<GetUsersQuery, GetUsersQueryVariables>(
              {
                query: GetUsersDocument,
                variables: field.arguments as GetUsersQueryVariables,
              },
              (data) => {
                if (!data) return { getUsers: [parent.createUser] };
                data.getUsers.unshift(parent.createUser);
                return data;
              }
            );
          }
        }
      },
      deleteUser: async (parent: DeleteUserMutation, _args: DeleteUserMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getUsers" && field.arguments) {
            cache.updateQuery<GetUsersQuery, GetUsersQueryVariables>(
              {
                query: GetUsersDocument,
                variables: field.arguments as GetClientsQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getUsers = data.getUsers.filter((user) => user.id !== parent.deleteUser);
                return data;
              }
            );
          }
        }
      },
      deleteClient: async (parent: DeleteClientMutation, _args: DeleteClientMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getClients" && field.arguments) {
            cache.updateQuery<GetClientsQuery, GetClientsQueryVariables>(
              {
                query: GetClientsDocument,
                variables: field.arguments as GetClientsQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getClients = data.getClients.filter((client) => client.id !== parent.deleteClient);
                return data;
              }
            );
          }
        }
      },
      deleteFirm: async (parent: DeleteFirmMutation, _args: DeleteFirmMutationVariables, cache: Cache, _info: ResolveInfo) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getFirms" && field.arguments) {
            cache.updateQuery<GetFirmsQuery, GetFirmsQueryVariables>(
              {
                query: GetFirmsDocument,
                variables: field.arguments as GetFirmsQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getFirms = data.getFirms.filter((firm) => firm.id !== parent.deleteFirm);
                return data;
              }
            );
          }
        }
      },
      deleteWorkspace: async (
        parent: DeleteWorkspaceMutation,
        _args: DeleteWorkspaceMutationVariables,
        cache: Cache,
        _info: ResolveInfo
      ) => {
        for (const field of cache.inspectFields("Query")) {
          if (field?.fieldName === "getWorkspaces" && field.arguments) {
            cache.updateQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(
              {
                query: GetWorkspacesDocument,
                variables: field.arguments as GetWorkspacesQueryVariables,
              },
              (data) => {
                if (!data) return data;
                data.getWorkspaces = data.getWorkspaces.filter((workspace) => workspace.id !== parent.deleteWorkspace);
                return data;
              }
            );
          }
        }
      },
    },
    Subscription: {
      myRssFeed: async (parent: MyRssFeedSubscription, _args: MyRssFeedSubscriptionVariables, cache: Cache, _info: ResolveInfo) => {
        cache.updateQuery<GetMyRssEntriesQuery, GetMyRssEntriesQueryVariables>(
          { query: GetMyRssEntriesDocument, variables: { skip: 0, take: 9 } },
          (data) => {
            if (!data) return { getMyRssEntries: [parent.myRssFeed] };
            data.getMyRssEntries.unshift(parent.myRssFeed);
            return data;
          }
        );
      },
    },
  },
});
