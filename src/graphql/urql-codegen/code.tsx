import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AdditionalDetails = {
  __typename?: "AdditionalDetails";
  authors: Array<Author>;
  categories: Array<Category>;
  copyright?: Maybe<Scalars["String"]["output"]>;
  language?: Maybe<Scalars["String"]["output"]>;
};

export type AmedmentAction = {
  __typename?: "AmedmentAction";
  actionDate: Scalars["String"]["output"];
  actionTime: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

export type Author = {
  __typename?: "Author";
  avatar?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  url?: Maybe<Scalars["String"]["output"]>;
};

export type BillAction = {
  __typename?: "BillAction";
  actionDate: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

export type BillSummary = {
  __typename?: "BillSummary";
  congress: Scalars["Float"]["output"];
  number: Scalars["String"]["output"];
  originChamber: Scalars["String"]["output"];
  originChamberCode: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
  updateDateIncludingText: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type Category = {
  __typename?: "Category";
  label?: Maybe<Scalars["String"]["output"]>;
  scheme: Scalars["String"]["output"];
  term: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type ClientEntity = {
  __typename?: "ClientEntity";
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  firmId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  objective: Scalars["String"]["output"];
  workspaceId: Scalars["String"]["output"];
};

export type CompletionEntity = {
  __typename?: "CompletionEntity";
  clientId?: Maybe<Scalars["String"]["output"]>;
  completion: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  displayName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  model: Scalars["String"]["output"];
  promptId: Scalars["String"]["output"];
  provider: EAiProvider;
  systemPrompt: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
  userPrompt: Scalars["String"]["output"];
  userSaved: Scalars["Boolean"]["output"];
};

export type CongressCalendarItemEntity = {
  __typename?: "CongressCalendarItemEntity";
  date: Scalars["String"]["output"];
  holiday?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  type: ECongressCalendarItemType;
};

export type Content = {
  __typename?: "Content";
  html?: Maybe<Scalars["String"]["output"]>;
  text?: Maybe<Scalars["String"]["output"]>;
};

export type CurrentModelsDto = {
  __typename?: "CurrentModelsDTO";
  largeToken: ModelDto;
  smallToken: ModelDto;
};

export type DocumentEntity = {
  __typename?: "DocumentEntity";
  clientId: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  displayName: Scalars["String"]["output"];
  ext: EExtension;
  firmId: Scalars["String"]["output"];
  hash: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  url: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
  workspaceId: Scalars["String"]["output"];
};

export enum EAiProvider {
  Anthropic = "Anthropic",
  OpenAi = "OpenAi",
}

export enum ECongressCalendarItemType {
  Both = "Both",
  Holiday = "Holiday",
  House = "House",
  Senate = "Senate",
}

export enum EContentType {
  Doc = "Doc",
  Docx = "Docx",
  Gif = "Gif",
  Jpeg = "Jpeg",
  Mp3 = "Mp3",
  Mp4 = "Mp4",
  Mpeg = "Mpeg",
  Odp = "Odp",
  Ods = "Ods",
  Odt = "Odt",
  Pdf = "Pdf",
  Png = "Png",
  Ppt = "Ppt",
  Pptx = "Pptx",
  Quicktime = "Quicktime",
  Rar = "Rar",
  Rtf = "Rtf",
  Tar = "Tar",
  Txt = "Txt",
  Wav = "Wav",
  Xls = "Xls",
  Xlsx = "Xlsx",
  Zip = "Zip",
}

export enum EExtension {
  Doc = "Doc",
  Docx = "Docx",
  Gif = "Gif",
  Jpeg = "Jpeg",
  Jpg = "Jpg",
  Mov = "Mov",
  Mp3 = "Mp3",
  Mp4 = "Mp4",
  Mpeg = "Mpeg",
  Mpg = "Mpg",
  Odp = "Odp",
  Ods = "Ods",
  Odt = "Odt",
  Pdf = "Pdf",
  Png = "Png",
  Ppt = "Ppt",
  Pptx = "Pptx",
  Rar = "Rar",
  Rtf = "Rtf",
  Tar = "Tar",
  Txt = "Txt",
  Wav = "Wav",
  Xls = "Xls",
  Xlsx = "Xlsx",
  Zip = "Zip",
}

export enum EFirmPermission {
  Admin = "Admin",
  Editor = "Editor",
  Manager = "Manager",
  Viewer = "Viewer",
}

export enum EImageExtension {
  Gif = "Gif",
  Jpeg = "Jpeg",
  Jpg = "Jpg",
  Png = "Png",
}

export enum ELobbymaticPermission {
  Admin = "Admin",
  Editor = "Editor",
  Manager = "Manager",
  Viewer = "Viewer",
}

export enum EPromptCategory {
  Client = "Client",
  Engagement = "Engagement",
  Legislation = "Legislation",
  Pr = "PR",
  Strategy = "Strategy",
}

export enum ETaskStatus {
  Completed = "Completed",
  InProgress = "InProgress",
  ToDo = "ToDo",
}

export type FirmEntity = {
  __typename?: "FirmEntity";
  avatar?: Maybe<Scalars["String"]["output"]>;
  avatarId?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type HomeCommunicationType = {
  __typename?: "HomeCommunicationType";
  code: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type HouseTermDto = {
  __typename?: "HouseTermDTO";
  end?: Maybe<Scalars["Int"]["output"]>;
  start: Scalars["Int"]["output"];
};

export type Image = {
  __typename?: "Image";
  height?: Maybe<Scalars["Float"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  width?: Maybe<Scalars["Float"]["output"]>;
};

export type LegislationAction = {
  __typename?: "LegislationAction";
  actionDate: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

export type LinksData = {
  __typename?: "LinksData";
  Digest: LinksInnerData;
  FullRecord: LinksInnerData;
  House: LinksInnerData;
  Remarks: LinksInnerData;
  Senate: LinksInnerData;
};

export type LinksFileData = {
  __typename?: "LinksFileData";
  Part: Scalars["String"]["output"];
  Url: Scalars["String"]["output"];
};

export type LinksInnerData = {
  __typename?: "LinksInnerData";
  Label: Scalars["String"]["output"];
  Ordinal: Scalars["String"]["output"];
  PDF: Array<LinksFileData>;
};

export type ModelDto = {
  __typename?: "ModelDTO";
  model: Scalars["String"]["output"];
  provider: EAiProvider;
};

export type Mutation = {
  __typename?: "Mutation";
  createClient: ClientEntity;
  createCongressCalendarItem: CongressCalendarItemEntity;
  createDocument: DocumentEntity;
  createFirm: FirmEntity;
  createNote: NoteEntity;
  createRssSubscription: RssSubscriptionEntity;
  createTask: TaskEntity;
  createUser: UserEntity;
  createWorkspace: WorkspaceEntity;
  deleteClient: Scalars["String"]["output"];
  deleteCongressCalendarItem: Scalars["String"]["output"];
  deleteDocument: Scalars["String"]["output"];
  deleteFirm: Scalars["String"]["output"];
  deleteNote: NoteEntity;
  deleteRssSubscription: Scalars["String"]["output"];
  deleteTask: TaskEntity;
  deleteUser: Scalars["String"]["output"];
  deleteWorkspace: Scalars["String"]["output"];
  editCompletion: CompletionEntity;
  getDocumentSignedUrl: Scalars["String"]["output"];
  getFirmAvatarSignedUrl: Scalars["String"]["output"];
  getUserAvatarSignedUrl: Scalars["String"]["output"];
  logCompletion: Scalars["String"]["output"];
  logCompletionResponse: Scalars["Boolean"]["output"];
  login: UserEntity;
  logout: Scalars["Boolean"]["output"];
  saveCompletion: CompletionEntity;
  setFirmAvatar: Scalars["String"]["output"];
  setUserAvatar: UserEntity;
  subToRss: Scalars["Boolean"]["output"];
  unsaveCompletion: Scalars["String"]["output"];
  updateClient: ClientEntity;
  updateCongressCalendarItem: CongressCalendarItemEntity;
  updateFirm: FirmEntity;
  updateNote: NoteEntity;
  updateTask: TaskEntity;
  updateUser: UserEntity;
  updateWorkspace: WorkspaceEntity;
};

export type MutationCreateClientArgs = {
  description: Scalars["String"]["input"];
  firmId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  objective: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
};

export type MutationCreateCongressCalendarItemArgs = {
  date: Scalars["String"]["input"];
  holiday?: InputMaybe<Scalars["String"]["input"]>;
  type: ECongressCalendarItemType;
};

export type MutationCreateFirmArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateNoteArgs = {
  clientId: Scalars["String"]["input"];
  note: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
};

export type MutationCreateRssSubscriptionArgs = {
  url: Scalars["String"]["input"];
};

export type MutationCreateTaskArgs = {
  clientId: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  dueDate: Scalars["String"]["input"];
  objective: Scalars["String"]["input"];
  status: ETaskStatus;
  workspaceId: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  emailVerified: Scalars["Boolean"]["input"];
  firmId: Scalars["String"]["input"];
  firmPermission?: InputMaybe<EFirmPermission>;
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  samplePermission?: InputMaybe<ELobbymaticPermission>;
  password: Scalars["String"]["input"];
  timezone: Scalars["String"]["input"];
};

export type MutationCreateWorkspaceArgs = {
  firmId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationDeleteClientArgs = {
  clientId: Scalars["String"]["input"];
};

export type MutationDeleteCongressCalendarItemArgs = {
  congressCalendarItemId: Scalars["String"]["input"];
};

export type MutationDeleteDocumentArgs = {
  documentId: Scalars["String"]["input"];
};

export type MutationDeleteFirmArgs = {
  firmId: Scalars["String"]["input"];
};

export type MutationDeleteNoteArgs = {
  noteId: Scalars["String"]["input"];
};

export type MutationDeleteRssSubscriptionArgs = {
  subscription_id: Scalars["String"]["input"];
};

export type MutationDeleteTaskArgs = {
  taskId: Scalars["String"]["input"];
};

export type MutationDeleteUserArgs = {
  userId: Scalars["String"]["input"];
};

export type MutationDeleteWorkspaceArgs = {
  workspaceId: Scalars["String"]["input"];
};

export type MutationEditCompletionArgs = {
  completion: Scalars["String"]["input"];
  completionId: Scalars["String"]["input"];
};

export type MutationGetDocumentSignedUrlArgs = {
  clientId: Scalars["String"]["input"];
  displayName: Scalars["String"]["input"];
  ext: EExtension;
  hash: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
};

export type MutationGetFirmAvatarSignedUrlArgs = {
  ext: EImageExtension;
  hash: Scalars["String"]["input"];
};

export type MutationGetUserAvatarSignedUrlArgs = {
  ext: EImageExtension;
  hash: Scalars["String"]["input"];
};

export type MutationLogCompletionArgs = {
  clientId?: InputMaybe<Scalars["String"]["input"]>;
  model: Scalars["String"]["input"];
  promptId: Scalars["String"]["input"];
  provider: EAiProvider;
  systemPrompt: Scalars["String"]["input"];
  userPrompt: Scalars["String"]["input"];
};

export type MutationLogCompletionResponseArgs = {
  completion: Scalars["String"]["input"];
  completionId: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSaveCompletionArgs = {
  clientId?: InputMaybe<Scalars["String"]["input"]>;
  completion: Scalars["String"]["input"];
  displayName: Scalars["String"]["input"];
  model: Scalars["String"]["input"];
  promptId: Scalars["String"]["input"];
  provider: EAiProvider;
  systemPrompt: Scalars["String"]["input"];
  userPrompt: Scalars["String"]["input"];
};

export type MutationSubToRssArgs = {
  subscription_id: Scalars["String"]["input"];
};

export type MutationUnsaveCompletionArgs = {
  completionId: Scalars["String"]["input"];
};

export type MutationUpdateClientArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  objective?: InputMaybe<Scalars["String"]["input"]>;
  workspaceId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateCongressCalendarItemArgs = {
  congressCalendarItemId: Scalars["String"]["input"];
  date: Scalars["String"]["input"];
  holiday?: InputMaybe<Scalars["String"]["input"]>;
  type: ECongressCalendarItemType;
};

export type MutationUpdateFirmArgs = {
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationUpdateNoteArgs = {
  note: Scalars["String"]["input"];
  noteId: Scalars["String"]["input"];
};

export type MutationUpdateTaskArgs = {
  description: Scalars["String"]["input"];
  dueDate: Scalars["String"]["input"];
  objective: Scalars["String"]["input"];
  status: ETaskStatus;
  taskId: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  firmPermission?: InputMaybe<EFirmPermission>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  samplePermission?: InputMaybe<ELobbymaticPermission>;
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateWorkspaceArgs = {
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type NominationAction = {
  __typename?: "NominationAction";
  actionDate: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

export type NominationType = {
  __typename?: "NominationType";
  isMilitary: Scalars["Boolean"]["output"];
};

export type NoteEntity = {
  __typename?: "NoteEntity";
  clientId: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  firmId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  note: Scalars["String"]["output"];
  workspaceId: Scalars["String"]["output"];
};

export type ParentData = {
  __typename?: "ParentData";
  name: Scalars["String"]["output"];
  systemCode: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type PolicyArea = {
  __typename?: "PolicyArea";
  name: Scalars["String"]["output"];
};

export type PromptEntity = {
  __typename?: "PromptEntity";
  category: EPromptCategory;
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getAllRssSubscriptions: Array<RssSubscriptionEntity>;
  getClient: ClientEntity;
  getClients: Array<ClientEntity>;
  getCompletions: Array<CompletionEntity>;
  getCongressCalendar: Array<CongressCalendarItemEntity>;
  getCurrentModels: CurrentModelsDto;
  getDocuments: Array<DocumentEntity>;
  getFirm: FirmEntity;
  getFirms: Array<FirmEntity>;
  getMyRssEntries: Array<RssEntryEntity>;
  getMyRssSubs: Array<RssSubscriptionEntity>;
  getNote: NoteEntity;
  getNotes: Array<NoteEntity>;
  getPrompt: PromptEntity;
  getPrompts: Array<PromptEntity>;
  getS3ContentTypes: Array<EContentType>;
  getStats: StatsDto;
  getSystemPrompt: Scalars["String"]["output"];
  getTask: TaskEntity;
  getTasks: Array<TaskEntity>;
  getTimezones: Array<TimezoneDto>;
  getUser: UserEntity;
  getUsers: Array<UserEntity>;
  getWorkspace: WorkspaceEntity;
  getWorkspaces: Array<WorkspaceEntity>;
  me: UserEntity;
};

export type QueryGetClientArgs = {
  clientId: Scalars["String"]["input"];
};

export type QueryGetClientsArgs = {
  firmId?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  workspaceId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetCompletionsArgs = {
  promptId: Scalars["String"]["input"];
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryGetDocumentsArgs = {
  clientId: Scalars["String"]["input"];
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  workspaceId: Scalars["String"]["input"];
};

export type QueryGetFirmArgs = {
  firmId: Scalars["String"]["input"];
};

export type QueryGetFirmsArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryGetMyRssEntriesArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryGetNoteArgs = {
  noteId: Scalars["String"]["input"];
};

export type QueryGetNotesArgs = {
  clientId: Scalars["String"]["input"];
  search: Scalars["String"]["input"];
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryGetPromptArgs = {
  promptId: Scalars["String"]["input"];
};

export type QueryGetSystemPromptArgs = {
  clientId: Scalars["String"]["input"];
  promptId: Scalars["String"]["input"];
};

export type QueryGetTaskArgs = {
  taskId: Scalars["String"]["input"];
};

export type QueryGetTasksArgs = {
  assigneeId?: InputMaybe<Scalars["String"]["input"]>;
  clientId?: InputMaybe<Scalars["String"]["input"]>;
  firmId: Scalars["String"]["input"];
  workspaceId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetUserArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetUsersArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryGetWorkspaceArgs = {
  workspaceId: Scalars["String"]["input"];
};

export type QueryGetWorkspacesArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type RssEntryEntity = {
  __typename?: "RssEntryEntity";
  additional_details: AdditionalDetails;
  content: Content;
  description?: Maybe<Scalars["String"]["output"]>;
  guid: Scalars["ID"]["output"];
  image: Image;
  link: Scalars["String"]["output"];
  subscription_id: Scalars["String"]["output"];
  time?: Maybe<Scalars["String"]["output"]>;
  timestamp: Scalars["Float"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
};

export type RssSubscriptionEntity = {
  __typename?: "RssSubscriptionEntity";
  createdAt: Scalars["String"]["output"];
  feed_type: Scalars["String"]["output"];
  info: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
  subscription_id: Scalars["ID"]["output"];
  url: Scalars["String"]["output"];
  webhook_url: Scalars["String"]["output"];
};

export type SenateCommunicationType = {
  __typename?: "SenateCommunicationType";
  code: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type SenateTermDto = {
  __typename?: "SenateTermDTO";
  end?: Maybe<Scalars["Int"]["output"]>;
  start: Scalars["Int"]["output"];
};

export type ServedDto = {
  __typename?: "ServedDTO";
  House?: Maybe<Array<HouseTermDto>>;
  Senate?: Maybe<Array<SenateTermDto>>;
};

export type StatsDto = {
  __typename?: "StatsDTO";
  anthropicCost: Scalars["Float"]["output"];
  anthropicTokens: Scalars["Int"]["output"];
  clientCount: Scalars["Int"]["output"];
  completions: Scalars["Int"]["output"];
  firmCount: Scalars["Int"]["output"];
  id: Scalars["String"]["output"];
  openAiCost: Scalars["Float"]["output"];
  openAiTokens: Scalars["Int"]["output"];
  userCount: Scalars["Int"]["output"];
  userSavedCompletions: Scalars["Int"]["output"];
  workspaceCount: Scalars["Int"]["output"];
};

export type SubcommitteeDto = {
  __typename?: "SubcommitteeDTO";
  name: Scalars["String"]["output"];
  systemCode: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type Subscription = {
  __typename?: "Subscription";
  myRssFeed: RssEntryEntity;
};

export type TaskEntity = {
  __typename?: "TaskEntity";
  assigneeId?: Maybe<Scalars["String"]["output"]>;
  clientId: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  dueDate: Scalars["String"]["output"];
  firmId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  objective: Scalars["String"]["output"];
  status: ETaskStatus;
  workspaceId: Scalars["String"]["output"];
};

export type TimezoneDto = {
  __typename?: "TimezoneDTO";
  abbrev: Scalars["String"]["output"];
  altName: Scalars["String"]["output"];
  label: Scalars["String"]["output"];
  offset: Scalars["Int"]["output"];
  value: Scalars["String"]["output"];
};

export type UserEntity = {
  __typename?: "UserEntity";
  avatar?: Maybe<Scalars["String"]["output"]>;
  avatarId?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  emailVerified: Scalars["Boolean"]["output"];
  firmId: Scalars["String"]["output"];
  firmPermission?: Maybe<EFirmPermission>;
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastLogin: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  samplePermission?: Maybe<ELobbymaticPermission>;
  timezone: Scalars["String"]["output"];
};

export type WorkspaceEntity = {
  __typename?: "WorkspaceEntity";
  createdAt: Scalars["String"]["output"];
  firmId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type GetS3ContentTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetS3ContentTypesQuery = { __typename?: "Query"; getS3ContentTypes: Array<EContentType> };

export type ClientFragment = {
  __typename?: "ClientEntity";
  id: string;
  name: string;
  description: string;
  objective: string;
  createdAt: string;
  firmId: string;
  workspaceId: string;
};

export type GetClientsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  firmId?: InputMaybe<Scalars["String"]["input"]>;
  workspaceId?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetClientsQuery = {
  __typename?: "Query";
  getClients: Array<{
    __typename?: "ClientEntity";
    id: string;
    name: string;
    description: string;
    objective: string;
    createdAt: string;
    firmId: string;
    workspaceId: string;
  }>;
};

export type GetClientQueryVariables = Exact<{
  clientId: Scalars["String"]["input"];
}>;

export type GetClientQuery = {
  __typename?: "Query";
  getClient: {
    __typename?: "ClientEntity";
    id: string;
    name: string;
    description: string;
    objective: string;
    createdAt: string;
    firmId: string;
    workspaceId: string;
  };
};

export type CreateClientMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  firmId: Scalars["String"]["input"];
  objective: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
}>;

export type CreateClientMutation = {
  __typename?: "Mutation";
  createClient: {
    __typename?: "ClientEntity";
    id: string;
    name: string;
    description: string;
    objective: string;
    createdAt: string;
    firmId: string;
    workspaceId: string;
  };
};

export type UpdateClientMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  objective: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
}>;

export type UpdateClientMutation = {
  __typename?: "Mutation";
  updateClient: {
    __typename?: "ClientEntity";
    id: string;
    name: string;
    description: string;
    objective: string;
    createdAt: string;
    firmId: string;
    workspaceId: string;
  };
};

export type DeleteClientMutationVariables = Exact<{
  clientId: Scalars["String"]["input"];
}>;

export type DeleteClientMutation = { __typename?: "Mutation"; deleteClient: string };

export type CompletionFragment = {
  __typename?: "CompletionEntity";
  id: string;
  displayName?: string | null;
  promptId: string;
  userPrompt: string;
  completion: string;
  createdAt: string;
};

export type ModelFragment = { __typename?: "ModelDTO"; provider: EAiProvider; model: string };

export type CurrentModelsFragment = {
  __typename?: "CurrentModelsDTO";
  smallToken: { __typename?: "ModelDTO"; provider: EAiProvider; model: string };
  largeToken: { __typename?: "ModelDTO"; provider: EAiProvider; model: string };
};

export type GetCurrentModelsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentModelsQuery = {
  __typename?: "Query";
  getCurrentModels: {
    __typename?: "CurrentModelsDTO";
    smallToken: { __typename?: "ModelDTO"; provider: EAiProvider; model: string };
    largeToken: { __typename?: "ModelDTO"; provider: EAiProvider; model: string };
  };
};

export type GetCompletionsQueryVariables = Exact<{
  promptId: Scalars["String"]["input"];
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
}>;

export type GetCompletionsQuery = {
  __typename?: "Query";
  getCompletions: Array<{
    __typename?: "CompletionEntity";
    id: string;
    displayName?: string | null;
    promptId: string;
    userPrompt: string;
    completion: string;
    createdAt: string;
  }>;
};

export type SaveCompletionMutationVariables = Exact<{
  provider: EAiProvider;
  model: Scalars["String"]["input"];
  promptId: Scalars["String"]["input"];
  systemPrompt: Scalars["String"]["input"];
  userPrompt: Scalars["String"]["input"];
  completion: Scalars["String"]["input"];
  displayName: Scalars["String"]["input"];
  clientId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type SaveCompletionMutation = {
  __typename?: "Mutation";
  saveCompletion: {
    __typename?: "CompletionEntity";
    id: string;
    displayName?: string | null;
    promptId: string;
    userPrompt: string;
    completion: string;
    createdAt: string;
  };
};

export type UnsaveCompletionMutationVariables = Exact<{
  completionId: Scalars["String"]["input"];
}>;

export type UnsaveCompletionMutation = { __typename?: "Mutation"; unsaveCompletion: string };

export type EditCompletionMutationVariables = Exact<{
  completionId: Scalars["String"]["input"];
  completion: Scalars["String"]["input"];
}>;

export type EditCompletionMutation = {
  __typename?: "Mutation";
  editCompletion: {
    __typename?: "CompletionEntity";
    id: string;
    displayName?: string | null;
    promptId: string;
    userPrompt: string;
    completion: string;
    createdAt: string;
  };
};

export type LogCompletionMutationVariables = Exact<{
  provider: EAiProvider;
  model: Scalars["String"]["input"];
  promptId: Scalars["String"]["input"];
  systemPrompt: Scalars["String"]["input"];
  userPrompt: Scalars["String"]["input"];
  clientId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type LogCompletionMutation = { __typename?: "Mutation"; logCompletion: string };

export type LogCompletionResponseMutationVariables = Exact<{
  completionId: Scalars["String"]["input"];
  completion: Scalars["String"]["input"];
}>;

export type LogCompletionResponseMutation = { __typename?: "Mutation"; logCompletionResponse: boolean };

export type CongressCalendarItemFragment = {
  __typename?: "CongressCalendarItemEntity";
  id: string;
  type: ECongressCalendarItemType;
  holiday?: string | null;
  date: string;
};

export type GetCongressCalendarQueryVariables = Exact<{ [key: string]: never }>;

export type GetCongressCalendarQuery = {
  __typename?: "Query";
  getCongressCalendar: Array<{
    __typename?: "CongressCalendarItemEntity";
    id: string;
    type: ECongressCalendarItemType;
    holiday?: string | null;
    date: string;
  }>;
};

export type CreateCongressCalendarItemMutationVariables = Exact<{
  type: ECongressCalendarItemType;
  date: Scalars["String"]["input"];
  holiday?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type CreateCongressCalendarItemMutation = {
  __typename?: "Mutation";
  createCongressCalendarItem: {
    __typename?: "CongressCalendarItemEntity";
    id: string;
    type: ECongressCalendarItemType;
    holiday?: string | null;
    date: string;
  };
};

export type UpdateCongressCalendarItemMutationVariables = Exact<{
  congressCalendarItemId: Scalars["String"]["input"];
  type: ECongressCalendarItemType;
  date: Scalars["String"]["input"];
  holiday?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateCongressCalendarItemMutation = {
  __typename?: "Mutation";
  updateCongressCalendarItem: {
    __typename?: "CongressCalendarItemEntity";
    id: string;
    type: ECongressCalendarItemType;
    holiday?: string | null;
    date: string;
  };
};

export type DocumentFragment = {
  __typename?: "DocumentEntity";
  id: string;
  displayName: string;
  hash: string;
  ext: EExtension;
  url: string;
  createdAt: string;
  userId: string;
  workspaceId: string;
  clientId: string;
};

export type GetDocumentsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  workspaceId: Scalars["String"]["input"];
  clientId: Scalars["String"]["input"];
}>;

export type GetDocumentsQuery = {
  __typename?: "Query";
  getDocuments: Array<{
    __typename?: "DocumentEntity";
    id: string;
    displayName: string;
    hash: string;
    ext: EExtension;
    url: string;
    createdAt: string;
    userId: string;
    workspaceId: string;
    clientId: string;
  }>;
};

export type GetDocumentSignedUrlMutationVariables = Exact<{
  displayName: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
  clientId: Scalars["String"]["input"];
  hash: Scalars["String"]["input"];
  ext: EExtension;
}>;

export type GetDocumentSignedUrlMutation = { __typename?: "Mutation"; getDocumentSignedUrl: string };

export type CreateDocumentMutationVariables = Exact<{ [key: string]: never }>;

export type CreateDocumentMutation = {
  __typename?: "Mutation";
  createDocument: {
    __typename?: "DocumentEntity";
    id: string;
    displayName: string;
    hash: string;
    ext: EExtension;
    url: string;
    createdAt: string;
    userId: string;
    workspaceId: string;
    clientId: string;
  };
};

export type DeleteDocumentMutationVariables = Exact<{
  documentId: Scalars["String"]["input"];
}>;

export type DeleteDocumentMutation = { __typename?: "Mutation"; deleteDocument: string };

export type FirmFragment = { __typename?: "FirmEntity"; id: string; name: string; avatar?: string | null; createdAt: string };

export type GetFirmsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetFirmsQuery = {
  __typename?: "Query";
  getFirms: Array<{ __typename?: "FirmEntity"; id: string; name: string; avatar?: string | null; createdAt: string }>;
};

export type GetFirmQueryVariables = Exact<{
  firmId: Scalars["String"]["input"];
}>;

export type GetFirmQuery = {
  __typename?: "Query";
  getFirm: { __typename?: "FirmEntity"; id: string; name: string; avatar?: string | null; createdAt: string };
};

export type CreateFirmMutationVariables = Exact<{
  name: Scalars["String"]["input"];
}>;

export type CreateFirmMutation = {
  __typename?: "Mutation";
  createFirm: { __typename?: "FirmEntity"; id: string; name: string; avatar?: string | null; createdAt: string };
};

export type UpdateFirmMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
}>;

export type UpdateFirmMutation = {
  __typename?: "Mutation";
  updateFirm: { __typename?: "FirmEntity"; id: string; name: string; avatar?: string | null; createdAt: string };
};

export type DeleteFirmMutationVariables = Exact<{
  firmId: Scalars["String"]["input"];
}>;

export type DeleteFirmMutation = { __typename?: "Mutation"; deleteFirm: string };

export type GetFirmAvatarSignedUrlMutationVariables = Exact<{
  hash: Scalars["String"]["input"];
  ext: EImageExtension;
}>;

export type GetFirmAvatarSignedUrlMutation = { __typename?: "Mutation"; getFirmAvatarSignedUrl: string };

export type SetFirmAvatarMutationVariables = Exact<{ [key: string]: never }>;

export type SetFirmAvatarMutation = { __typename?: "Mutation"; setFirmAvatar: string };

export type NoteFragment = { __typename?: "NoteEntity"; id: string; note: string; clientId: string };

export type GetNotesQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  clientId: Scalars["String"]["input"];
  search: Scalars["String"]["input"];
}>;

export type GetNotesQuery = {
  __typename?: "Query";
  getNotes: Array<{ __typename?: "NoteEntity"; id: string; note: string; clientId: string }>;
};

export type GetNoteQueryVariables = Exact<{
  noteId: Scalars["String"]["input"];
}>;

export type GetNoteQuery = { __typename?: "Query"; getNote: { __typename?: "NoteEntity"; id: string; note: string; clientId: string } };

export type CreateNoteMutationVariables = Exact<{
  clientId: Scalars["String"]["input"];
  note: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
}>;

export type CreateNoteMutation = {
  __typename?: "Mutation";
  createNote: { __typename?: "NoteEntity"; id: string; note: string; clientId: string };
};

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars["String"]["input"];
}>;

export type DeleteNoteMutation = {
  __typename?: "Mutation";
  deleteNote: { __typename?: "NoteEntity"; id: string; note: string; clientId: string };
};

export type UpdateNoteMutationVariables = Exact<{
  note: Scalars["String"]["input"];
  noteId: Scalars["String"]["input"];
}>;

export type UpdateNoteMutation = {
  __typename?: "Mutation";
  updateNote: { __typename?: "NoteEntity"; id: string; note: string; clientId: string };
};

export type PromptFragment = {
  __typename?: "PromptEntity";
  id: string;
  name: string;
  category: EPromptCategory;
  description: string;
  value: string;
  createdAt: string;
};

export type GetPromptsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPromptsQuery = {
  __typename?: "Query";
  getPrompts: Array<{
    __typename?: "PromptEntity";
    id: string;
    name: string;
    category: EPromptCategory;
    description: string;
    value: string;
    createdAt: string;
  }>;
};

export type GetPromptQueryVariables = Exact<{
  promptId: Scalars["String"]["input"];
}>;

export type GetPromptQuery = {
  __typename?: "Query";
  getPrompt: {
    __typename?: "PromptEntity";
    id: string;
    name: string;
    category: EPromptCategory;
    description: string;
    value: string;
    createdAt: string;
  };
};

export type GetSystemPromptQueryVariables = Exact<{
  clientId: Scalars["String"]["input"];
  promptId: Scalars["String"]["input"];
}>;

export type GetSystemPromptQuery = { __typename?: "Query"; getSystemPrompt: string };

export type RssSubscriptionFragment = {
  __typename?: "RssSubscriptionEntity";
  subscription_id: string;
  status: string;
  feed_type: string;
  url: string;
  info: string;
  createdAt: string;
};

export type RssEntryFragment = {
  __typename?: "RssEntryEntity";
  guid: string;
  title?: string | null;
  link: string;
  time?: string | null;
  subscription_id: string;
};

export type GetAllRssSubscriptionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllRssSubscriptionsQuery = {
  __typename?: "Query";
  getAllRssSubscriptions: Array<{
    __typename?: "RssSubscriptionEntity";
    subscription_id: string;
    status: string;
    feed_type: string;
    url: string;
    info: string;
    createdAt: string;
  }>;
};

export type GetMyRssSubsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyRssSubsQuery = {
  __typename?: "Query";
  getMyRssSubs: Array<{
    __typename?: "RssSubscriptionEntity";
    subscription_id: string;
    status: string;
    feed_type: string;
    url: string;
    info: string;
    createdAt: string;
  }>;
};

export type GetMyRssEntriesQueryVariables = Exact<{
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
}>;

export type GetMyRssEntriesQuery = {
  __typename?: "Query";
  getMyRssEntries: Array<{
    __typename?: "RssEntryEntity";
    guid: string;
    title?: string | null;
    link: string;
    time?: string | null;
    subscription_id: string;
  }>;
};

export type CreateRssSubscriptionMutationVariables = Exact<{
  url: Scalars["String"]["input"];
}>;

export type CreateRssSubscriptionMutation = {
  __typename?: "Mutation";
  createRssSubscription: {
    __typename?: "RssSubscriptionEntity";
    subscription_id: string;
    status: string;
    feed_type: string;
    url: string;
    info: string;
    createdAt: string;
  };
};

export type DeleteRssSubscriptionMutationVariables = Exact<{
  subscription_id: Scalars["String"]["input"];
}>;

export type DeleteRssSubscriptionMutation = { __typename?: "Mutation"; deleteRssSubscription: string };

export type MyRssFeedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MyRssFeedSubscription = {
  __typename?: "Subscription";
  myRssFeed: {
    __typename?: "RssEntryEntity";
    guid: string;
    title?: string | null;
    link: string;
    time?: string | null;
    subscription_id: string;
  };
};

export type StatsFragment = {
  __typename?: "StatsDTO";
  id: string;
  firmCount: number;
  workspaceCount: number;
  clientCount: number;
  userCount: number;
  completions: number;
  userSavedCompletions: number;
  openAiTokens: number;
  openAiCost: number;
  anthropicTokens: number;
  anthropicCost: number;
};

export type GetStatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetStatsQuery = {
  __typename?: "Query";
  getStats: {
    __typename?: "StatsDTO";
    id: string;
    firmCount: number;
    workspaceCount: number;
    clientCount: number;
    userCount: number;
    completions: number;
    userSavedCompletions: number;
    openAiTokens: number;
    openAiCost: number;
    anthropicTokens: number;
    anthropicCost: number;
  };
};

export type TaskFragment = {
  __typename?: "TaskEntity";
  id: string;
  objective: string;
  status: ETaskStatus;
  dueDate: string;
  clientId: string;
  workspaceId: string;
  firmId: string;
  assigneeId?: string | null;
  description: string;
};

export type GetTasksQueryVariables = Exact<{
  firmId: Scalars["String"]["input"];
  workspaceId?: InputMaybe<Scalars["String"]["input"]>;
  assigneeId?: InputMaybe<Scalars["String"]["input"]>;
  clientId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetTasksQuery = {
  __typename?: "Query";
  getTasks: Array<{
    __typename?: "TaskEntity";
    id: string;
    objective: string;
    status: ETaskStatus;
    dueDate: string;
    clientId: string;
    workspaceId: string;
    firmId: string;
    assigneeId?: string | null;
    description: string;
  }>;
};

export type GetTaskQueryVariables = Exact<{
  taskId: Scalars["String"]["input"];
}>;

export type GetTaskQuery = {
  __typename?: "Query";
  getTask: {
    __typename?: "TaskEntity";
    id: string;
    objective: string;
    status: ETaskStatus;
    dueDate: string;
    clientId: string;
    workspaceId: string;
    firmId: string;
    assigneeId?: string | null;
    description: string;
  };
};

export type CreateTaskMutationVariables = Exact<{
  clientId: Scalars["String"]["input"];
  workspaceId: Scalars["String"]["input"];
  objective: Scalars["String"]["input"];
  dueDate: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  status: ETaskStatus;
}>;

export type CreateTaskMutation = {
  __typename?: "Mutation";
  createTask: {
    __typename?: "TaskEntity";
    id: string;
    objective: string;
    status: ETaskStatus;
    dueDate: string;
    clientId: string;
    workspaceId: string;
    firmId: string;
    assigneeId?: string | null;
    description: string;
  };
};

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars["String"]["input"];
  objective: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  status: ETaskStatus;
  dueDate: Scalars["String"]["input"];
}>;

export type UpdateTaskMutation = {
  __typename?: "Mutation";
  updateTask: {
    __typename?: "TaskEntity";
    id: string;
    objective: string;
    status: ETaskStatus;
    dueDate: string;
    clientId: string;
    workspaceId: string;
    firmId: string;
    assigneeId?: string | null;
    description: string;
  };
};

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars["String"]["input"];
}>;

export type DeleteTaskMutation = {
  __typename?: "Mutation";
  deleteTask: {
    __typename?: "TaskEntity";
    id: string;
    objective: string;
    status: ETaskStatus;
    dueDate: string;
    clientId: string;
    workspaceId: string;
    firmId: string;
    assigneeId?: string | null;
    description: string;
  };
};

export type GetTimezonesQueryVariables = Exact<{ [key: string]: never }>;

export type GetTimezonesQuery = {
  __typename?: "Query";
  getTimezones: Array<{ __typename?: "TimezoneDTO"; abbrev: string; altName: string; label: string; offset: number; value: string }>;
};

export type UserFragment = {
  __typename?: "UserEntity";
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  email: string;
  emailVerified: boolean;
  firmId: string;
  samplePermission?: ELobbymaticPermission | null;
  firmPermission?: EFirmPermission | null;
  timezone: string;
};

export type GetUsersQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: Array<{
    __typename?: "UserEntity";
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    emailVerified: boolean;
    firmId: string;
    samplePermission?: ELobbymaticPermission | null;
    firmPermission?: EFirmPermission | null;
    timezone: string;
  }>;
};

export type GetUserQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser: {
    __typename?: "UserEntity";
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    emailVerified: boolean;
    firmId: string;
    samplePermission?: ELobbymaticPermission | null;
    firmPermission?: EFirmPermission | null;
    timezone: string;
  };
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  firmId: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  timezone: Scalars["String"]["input"];
  emailVerified: Scalars["Boolean"]["input"];
  firmPermission?: InputMaybe<EFirmPermission>;
  samplePermission?: InputMaybe<ELobbymaticPermission>;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "UserEntity";
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    emailVerified: boolean;
    firmId: string;
    samplePermission?: ELobbymaticPermission | null;
    firmPermission?: EFirmPermission | null;
    timezone: string;
  };
};

export type UpdateUserMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  firmPermission?: InputMaybe<EFirmPermission>;
  samplePermission?: InputMaybe<ELobbymaticPermission>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "UserEntity";
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    emailVerified: boolean;
    firmId: string;
    samplePermission?: ELobbymaticPermission | null;
    firmPermission?: EFirmPermission | null;
    timezone: string;
  };
};

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type DeleteUserMutation = { __typename?: "Mutation"; deleteUser: string };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "UserEntity";
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    emailVerified: boolean;
    firmId: string;
    samplePermission?: ELobbymaticPermission | null;
    firmPermission?: EFirmPermission | null;
    timezone: string;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserEntity";
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    emailVerified: boolean;
    firmId: string;
    samplePermission?: ELobbymaticPermission | null;
    firmPermission?: EFirmPermission | null;
    timezone: string;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type GetUserAvatarSignedUrlMutationVariables = Exact<{
  hash: Scalars["String"]["input"];
  ext: EImageExtension;
}>;

export type GetUserAvatarSignedUrlMutation = { __typename?: "Mutation"; getUserAvatarSignedUrl: string };

export type SetUserAvatarMutationVariables = Exact<{ [key: string]: never }>;

export type SetUserAvatarMutation = {
  __typename?: "Mutation";
  setUserAvatar: {
    __typename?: "UserEntity";
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    emailVerified: boolean;
    firmId: string;
    samplePermission?: ELobbymaticPermission | null;
    firmPermission?: EFirmPermission | null;
    timezone: string;
  };
};

export type WorkspaceFragment = { __typename?: "WorkspaceEntity"; id: string; name: string; firmId: string; createdAt: string };

export type GetWorkspacesQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetWorkspacesQuery = {
  __typename?: "Query";
  getWorkspaces: Array<{ __typename?: "WorkspaceEntity"; id: string; name: string; firmId: string; createdAt: string }>;
};

export type GetWorkspaceQueryVariables = Exact<{
  workspaceId: Scalars["String"]["input"];
}>;

export type GetWorkspaceQuery = {
  __typename?: "Query";
  getWorkspace: { __typename?: "WorkspaceEntity"; id: string; name: string; firmId: string; createdAt: string };
};

export type CreateWorkspaceMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  firmId: Scalars["String"]["input"];
}>;

export type CreateWorkspaceMutation = {
  __typename?: "Mutation";
  createWorkspace: { __typename?: "WorkspaceEntity"; id: string; name: string; firmId: string; createdAt: string };
};

export type UpdateWorkspaceMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
}>;

export type UpdateWorkspaceMutation = {
  __typename?: "Mutation";
  updateWorkspace: { __typename?: "WorkspaceEntity"; id: string; name: string; firmId: string; createdAt: string };
};

export type DeleteWorkspaceMutationVariables = Exact<{
  workspaceId: Scalars["String"]["input"];
}>;

export type DeleteWorkspaceMutation = { __typename?: "Mutation"; deleteWorkspace: string };

export const ClientFragmentDoc = gql`
  fragment client on ClientEntity {
    id
    name
    description
    objective
    createdAt
    firmId
    workspaceId
  }
`;
export const CompletionFragmentDoc = gql`
  fragment completion on CompletionEntity {
    id
    displayName
    promptId
    userPrompt
    completion
    createdAt
  }
`;
export const ModelFragmentDoc = gql`
  fragment model on ModelDTO {
    provider
    model
  }
`;
export const CurrentModelsFragmentDoc = gql`
  fragment currentModels on CurrentModelsDTO {
    smallToken {
      ...model
    }
    largeToken {
      ...model
    }
  }
  ${ModelFragmentDoc}
`;
export const CongressCalendarItemFragmentDoc = gql`
  fragment congressCalendarItem on CongressCalendarItemEntity {
    id
    type
    holiday
    date
  }
`;
export const DocumentFragmentDoc = gql`
  fragment document on DocumentEntity {
    id
    displayName
    hash
    ext
    url
    createdAt
    userId
    workspaceId
    clientId
  }
`;
export const FirmFragmentDoc = gql`
  fragment firm on FirmEntity {
    id
    name
    avatar
    createdAt
  }
`;
export const NoteFragmentDoc = gql`
  fragment note on NoteEntity {
    id
    note
    clientId
  }
`;
export const PromptFragmentDoc = gql`
  fragment prompt on PromptEntity {
    id
    name
    category
    description
    value
    createdAt
  }
`;
export const RssSubscriptionFragmentDoc = gql`
  fragment rssSubscription on RssSubscriptionEntity {
    subscription_id
    status
    feed_type
    url
    info
    createdAt
  }
`;
export const RssEntryFragmentDoc = gql`
  fragment rssEntry on RssEntryEntity {
    guid
    title
    link
    time
    subscription_id
  }
`;
export const StatsFragmentDoc = gql`
  fragment stats on StatsDTO {
    id
    firmCount
    workspaceCount
    clientCount
    userCount
    completions
    userSavedCompletions
    openAiTokens
    openAiCost
    anthropicTokens
    anthropicCost
  }
`;
export const TaskFragmentDoc = gql`
  fragment task on TaskEntity {
    id
    objective
    status
    dueDate
    clientId
    workspaceId
    firmId
    assigneeId
    dueDate
    description
  }
`;
export const UserFragmentDoc = gql`
  fragment user on UserEntity {
    id
    firstName
    lastName
    avatar
    email
    emailVerified
    firmId
    samplePermission
    firmPermission
    timezone
  }
`;
export const WorkspaceFragmentDoc = gql`
  fragment workspace on WorkspaceEntity {
    id
    name
    firmId
    createdAt
  }
`;
export const GetS3ContentTypesDocument = gql`
  query getS3ContentTypes {
    getS3ContentTypes
  }
`;

export const GetS3ContentTypesComponent = (
  props: Omit<Urql.QueryProps<GetS3ContentTypesQuery, GetS3ContentTypesQueryVariables>, "query"> & {
    variables?: GetS3ContentTypesQueryVariables;
  }
) => <Urql.Query {...props} query={GetS3ContentTypesDocument} />;

export function useGetS3ContentTypesQuery(options?: Omit<Urql.UseQueryArgs<GetS3ContentTypesQueryVariables>, "query">) {
  return Urql.useQuery<GetS3ContentTypesQuery, GetS3ContentTypesQueryVariables>({ query: GetS3ContentTypesDocument, ...options });
}
export const GetClientsDocument = gql`
  query GetClients($take: Int!, $skip: Int!, $firmId: String, $workspaceId: String, $search: String) {
    getClients(take: $take, skip: $skip, firmId: $firmId, workspaceId: $workspaceId, search: $search) {
      ...client
    }
  }
  ${ClientFragmentDoc}
`;

export const GetClientsComponent = (
  props: Omit<Urql.QueryProps<GetClientsQuery, GetClientsQueryVariables>, "query"> & { variables: GetClientsQueryVariables }
) => <Urql.Query {...props} query={GetClientsDocument} />;

export function useGetClientsQuery(options: Omit<Urql.UseQueryArgs<GetClientsQueryVariables>, "query">) {
  return Urql.useQuery<GetClientsQuery, GetClientsQueryVariables>({ query: GetClientsDocument, ...options });
}
export const GetClientDocument = gql`
  query getClient($clientId: String!) {
    getClient(clientId: $clientId) {
      ...client
    }
  }
  ${ClientFragmentDoc}
`;

export const GetClientComponent = (
  props: Omit<Urql.QueryProps<GetClientQuery, GetClientQueryVariables>, "query"> & { variables: GetClientQueryVariables }
) => <Urql.Query {...props} query={GetClientDocument} />;

export function useGetClientQuery(options: Omit<Urql.UseQueryArgs<GetClientQueryVariables>, "query">) {
  return Urql.useQuery<GetClientQuery, GetClientQueryVariables>({ query: GetClientDocument, ...options });
}
export const CreateClientDocument = gql`
  mutation CreateClient($name: String!, $description: String!, $firmId: String!, $objective: String!, $workspaceId: String!) {
    createClient(description: $description, firmId: $firmId, name: $name, objective: $objective, workspaceId: $workspaceId) {
      ...client
    }
  }
  ${ClientFragmentDoc}
`;

export const CreateClientComponent = (
  props: Omit<Urql.MutationProps<CreateClientMutation, CreateClientMutationVariables>, "query"> & {
    variables?: CreateClientMutationVariables;
  }
) => <Urql.Mutation {...props} query={CreateClientDocument} />;

export function useCreateClientMutation() {
  return Urql.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument);
}
export const UpdateClientDocument = gql`
  mutation UpdateClient($id: String!, $name: String!, $description: String!, $objective: String!, $workspaceId: String!) {
    updateClient(id: $id, description: $description, name: $name, objective: $objective, workspaceId: $workspaceId) {
      ...client
    }
  }
  ${ClientFragmentDoc}
`;

export const UpdateClientComponent = (
  props: Omit<Urql.MutationProps<UpdateClientMutation, UpdateClientMutationVariables>, "query"> & {
    variables?: UpdateClientMutationVariables;
  }
) => <Urql.Mutation {...props} query={UpdateClientDocument} />;

export function useUpdateClientMutation() {
  return Urql.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument);
}
export const DeleteClientDocument = gql`
  mutation DeleteClient($clientId: String!) {
    deleteClient(clientId: $clientId)
  }
`;

export const DeleteClientComponent = (
  props: Omit<Urql.MutationProps<DeleteClientMutation, DeleteClientMutationVariables>, "query"> & {
    variables?: DeleteClientMutationVariables;
  }
) => <Urql.Mutation {...props} query={DeleteClientDocument} />;

export function useDeleteClientMutation() {
  return Urql.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument);
}
export const GetCurrentModelsDocument = gql`
  query GetCurrentModels {
    getCurrentModels {
      ...currentModels
    }
  }
  ${CurrentModelsFragmentDoc}
`;

export const GetCurrentModelsComponent = (
  props: Omit<Urql.QueryProps<GetCurrentModelsQuery, GetCurrentModelsQueryVariables>, "query"> & {
    variables?: GetCurrentModelsQueryVariables;
  }
) => <Urql.Query {...props} query={GetCurrentModelsDocument} />;

export function useGetCurrentModelsQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentModelsQueryVariables>, "query">) {
  return Urql.useQuery<GetCurrentModelsQuery, GetCurrentModelsQueryVariables>({ query: GetCurrentModelsDocument, ...options });
}
export const GetCompletionsDocument = gql`
  query GetCompletions($promptId: String!, $skip: Int!, $take: Int!) {
    getCompletions(promptId: $promptId, skip: $skip, take: $take) {
      ...completion
    }
  }
  ${CompletionFragmentDoc}
`;

export const GetCompletionsComponent = (
  props: Omit<Urql.QueryProps<GetCompletionsQuery, GetCompletionsQueryVariables>, "query"> & { variables: GetCompletionsQueryVariables }
) => <Urql.Query {...props} query={GetCompletionsDocument} />;

export function useGetCompletionsQuery(options: Omit<Urql.UseQueryArgs<GetCompletionsQueryVariables>, "query">) {
  return Urql.useQuery<GetCompletionsQuery, GetCompletionsQueryVariables>({ query: GetCompletionsDocument, ...options });
}
export const SaveCompletionDocument = gql`
  mutation SaveCompletion(
    $provider: EAiProvider!
    $model: String!
    $promptId: String!
    $systemPrompt: String!
    $userPrompt: String!
    $completion: String!
    $displayName: String!
    $clientId: String
  ) {
    saveCompletion(
      provider: $provider
      model: $model
      promptId: $promptId
      systemPrompt: $systemPrompt
      userPrompt: $userPrompt
      completion: $completion
      displayName: $displayName
      clientId: $clientId
    ) {
      ...completion
    }
  }
  ${CompletionFragmentDoc}
`;

export const SaveCompletionComponent = (
  props: Omit<Urql.MutationProps<SaveCompletionMutation, SaveCompletionMutationVariables>, "query"> & {
    variables?: SaveCompletionMutationVariables;
  }
) => <Urql.Mutation {...props} query={SaveCompletionDocument} />;

export function useSaveCompletionMutation() {
  return Urql.useMutation<SaveCompletionMutation, SaveCompletionMutationVariables>(SaveCompletionDocument);
}
export const UnsaveCompletionDocument = gql`
  mutation UnsaveCompletion($completionId: String!) {
    unsaveCompletion(completionId: $completionId)
  }
`;

export const UnsaveCompletionComponent = (
  props: Omit<Urql.MutationProps<UnsaveCompletionMutation, UnsaveCompletionMutationVariables>, "query"> & {
    variables?: UnsaveCompletionMutationVariables;
  }
) => <Urql.Mutation {...props} query={UnsaveCompletionDocument} />;

export function useUnsaveCompletionMutation() {
  return Urql.useMutation<UnsaveCompletionMutation, UnsaveCompletionMutationVariables>(UnsaveCompletionDocument);
}
export const EditCompletionDocument = gql`
  mutation EditCompletion($completionId: String!, $completion: String!) {
    editCompletion(completionId: $completionId, completion: $completion) {
      ...completion
    }
  }
  ${CompletionFragmentDoc}
`;

export const EditCompletionComponent = (
  props: Omit<Urql.MutationProps<EditCompletionMutation, EditCompletionMutationVariables>, "query"> & {
    variables?: EditCompletionMutationVariables;
  }
) => <Urql.Mutation {...props} query={EditCompletionDocument} />;

export function useEditCompletionMutation() {
  return Urql.useMutation<EditCompletionMutation, EditCompletionMutationVariables>(EditCompletionDocument);
}
export const LogCompletionDocument = gql`
  mutation logCompletion(
    $provider: EAiProvider!
    $model: String!
    $promptId: String!
    $systemPrompt: String!
    $userPrompt: String!
    $clientId: String
  ) {
    logCompletion(
      provider: $provider
      model: $model
      promptId: $promptId
      systemPrompt: $systemPrompt
      userPrompt: $userPrompt
      clientId: $clientId
    )
  }
`;

export const LogCompletionComponent = (
  props: Omit<Urql.MutationProps<LogCompletionMutation, LogCompletionMutationVariables>, "query"> & {
    variables?: LogCompletionMutationVariables;
  }
) => <Urql.Mutation {...props} query={LogCompletionDocument} />;

export function useLogCompletionMutation() {
  return Urql.useMutation<LogCompletionMutation, LogCompletionMutationVariables>(LogCompletionDocument);
}
export const LogCompletionResponseDocument = gql`
  mutation logCompletionResponse($completionId: String!, $completion: String!) {
    logCompletionResponse(completionId: $completionId, completion: $completion)
  }
`;

export const LogCompletionResponseComponent = (
  props: Omit<Urql.MutationProps<LogCompletionResponseMutation, LogCompletionResponseMutationVariables>, "query"> & {
    variables?: LogCompletionResponseMutationVariables;
  }
) => <Urql.Mutation {...props} query={LogCompletionResponseDocument} />;

export function useLogCompletionResponseMutation() {
  return Urql.useMutation<LogCompletionResponseMutation, LogCompletionResponseMutationVariables>(LogCompletionResponseDocument);
}
export const GetCongressCalendarDocument = gql`
  query GetCongressCalendar {
    getCongressCalendar {
      ...congressCalendarItem
    }
  }
  ${CongressCalendarItemFragmentDoc}
`;

export const GetCongressCalendarComponent = (
  props: Omit<Urql.QueryProps<GetCongressCalendarQuery, GetCongressCalendarQueryVariables>, "query"> & {
    variables?: GetCongressCalendarQueryVariables;
  }
) => <Urql.Query {...props} query={GetCongressCalendarDocument} />;

export function useGetCongressCalendarQuery(options?: Omit<Urql.UseQueryArgs<GetCongressCalendarQueryVariables>, "query">) {
  return Urql.useQuery<GetCongressCalendarQuery, GetCongressCalendarQueryVariables>({ query: GetCongressCalendarDocument, ...options });
}
export const CreateCongressCalendarItemDocument = gql`
  mutation CreateCongressCalendarItem($type: ECongressCalendarItemType!, $date: String!, $holiday: String) {
    createCongressCalendarItem(type: $type, date: $date, holiday: $holiday) {
      ...congressCalendarItem
    }
  }
  ${CongressCalendarItemFragmentDoc}
`;

export const CreateCongressCalendarItemComponent = (
  props: Omit<Urql.MutationProps<CreateCongressCalendarItemMutation, CreateCongressCalendarItemMutationVariables>, "query"> & {
    variables?: CreateCongressCalendarItemMutationVariables;
  }
) => <Urql.Mutation {...props} query={CreateCongressCalendarItemDocument} />;

export function useCreateCongressCalendarItemMutation() {
  return Urql.useMutation<CreateCongressCalendarItemMutation, CreateCongressCalendarItemMutationVariables>(
    CreateCongressCalendarItemDocument
  );
}
export const UpdateCongressCalendarItemDocument = gql`
  mutation updateCongressCalendarItem(
    $congressCalendarItemId: String!
    $type: ECongressCalendarItemType!
    $date: String!
    $holiday: String
  ) {
    updateCongressCalendarItem(congressCalendarItemId: $congressCalendarItemId, type: $type, date: $date, holiday: $holiday) {
      ...congressCalendarItem
    }
  }
  ${CongressCalendarItemFragmentDoc}
`;

export const UpdateCongressCalendarItemComponent = (
  props: Omit<Urql.MutationProps<UpdateCongressCalendarItemMutation, UpdateCongressCalendarItemMutationVariables>, "query"> & {
    variables?: UpdateCongressCalendarItemMutationVariables;
  }
) => <Urql.Mutation {...props} query={UpdateCongressCalendarItemDocument} />;

export function useUpdateCongressCalendarItemMutation() {
  return Urql.useMutation<UpdateCongressCalendarItemMutation, UpdateCongressCalendarItemMutationVariables>(
    UpdateCongressCalendarItemDocument
  );
}
export const GetDocumentsDocument = gql`
  query GetDocuments($take: Int!, $skip: Int!, $workspaceId: String!, $clientId: String!) {
    getDocuments(take: $take, skip: $skip, workspaceId: $workspaceId, clientId: $clientId) {
      ...document
    }
  }
  ${DocumentFragmentDoc}
`;

export const GetDocumentsComponent = (
  props: Omit<Urql.QueryProps<GetDocumentsQuery, GetDocumentsQueryVariables>, "query"> & { variables: GetDocumentsQueryVariables }
) => <Urql.Query {...props} query={GetDocumentsDocument} />;

export function useGetDocumentsQuery(options: Omit<Urql.UseQueryArgs<GetDocumentsQueryVariables>, "query">) {
  return Urql.useQuery<GetDocumentsQuery, GetDocumentsQueryVariables>({ query: GetDocumentsDocument, ...options });
}
export const GetDocumentSignedUrlDocument = gql`
  mutation GetDocumentSignedUrl($displayName: String!, $workspaceId: String!, $clientId: String!, $hash: String!, $ext: EExtension!) {
    getDocumentSignedUrl(displayName: $displayName, workspaceId: $workspaceId, clientId: $clientId, hash: $hash, ext: $ext)
  }
`;

export const GetDocumentSignedUrlComponent = (
  props: Omit<Urql.MutationProps<GetDocumentSignedUrlMutation, GetDocumentSignedUrlMutationVariables>, "query"> & {
    variables?: GetDocumentSignedUrlMutationVariables;
  }
) => <Urql.Mutation {...props} query={GetDocumentSignedUrlDocument} />;

export function useGetDocumentSignedUrlMutation() {
  return Urql.useMutation<GetDocumentSignedUrlMutation, GetDocumentSignedUrlMutationVariables>(GetDocumentSignedUrlDocument);
}
export const CreateDocumentDocument = gql`
  mutation CreateDocument {
    createDocument {
      ...document
    }
  }
  ${DocumentFragmentDoc}
`;

export const CreateDocumentComponent = (
  props: Omit<Urql.MutationProps<CreateDocumentMutation, CreateDocumentMutationVariables>, "query"> & {
    variables?: CreateDocumentMutationVariables;
  }
) => <Urql.Mutation {...props} query={CreateDocumentDocument} />;

export function useCreateDocumentMutation() {
  return Urql.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument);
}
export const DeleteDocumentDocument = gql`
  mutation DeleteDocument($documentId: String!) {
    deleteDocument(documentId: $documentId)
  }
`;

export const DeleteDocumentComponent = (
  props: Omit<Urql.MutationProps<DeleteDocumentMutation, DeleteDocumentMutationVariables>, "query"> & {
    variables?: DeleteDocumentMutationVariables;
  }
) => <Urql.Mutation {...props} query={DeleteDocumentDocument} />;

export function useDeleteDocumentMutation() {
  return Urql.useMutation<DeleteDocumentMutation, DeleteDocumentMutationVariables>(DeleteDocumentDocument);
}
export const GetFirmsDocument = gql`
  query GetFirms($take: Int!, $skip: Int!, $search: String) {
    getFirms(take: $take, skip: $skip, search: $search) {
      ...firm
    }
  }
  ${FirmFragmentDoc}
`;

export const GetFirmsComponent = (
  props: Omit<Urql.QueryProps<GetFirmsQuery, GetFirmsQueryVariables>, "query"> & { variables: GetFirmsQueryVariables }
) => <Urql.Query {...props} query={GetFirmsDocument} />;

export function useGetFirmsQuery(options: Omit<Urql.UseQueryArgs<GetFirmsQueryVariables>, "query">) {
  return Urql.useQuery<GetFirmsQuery, GetFirmsQueryVariables>({ query: GetFirmsDocument, ...options });
}
export const GetFirmDocument = gql`
  query GetFirm($firmId: String!) {
    getFirm(firmId: $firmId) {
      ...firm
    }
  }
  ${FirmFragmentDoc}
`;

export const GetFirmComponent = (
  props: Omit<Urql.QueryProps<GetFirmQuery, GetFirmQueryVariables>, "query"> & { variables: GetFirmQueryVariables }
) => <Urql.Query {...props} query={GetFirmDocument} />;

export function useGetFirmQuery(options: Omit<Urql.UseQueryArgs<GetFirmQueryVariables>, "query">) {
  return Urql.useQuery<GetFirmQuery, GetFirmQueryVariables>({ query: GetFirmDocument, ...options });
}
export const CreateFirmDocument = gql`
  mutation CreateFirm($name: String!) {
    createFirm(name: $name) {
      ...firm
    }
  }
  ${FirmFragmentDoc}
`;

export const CreateFirmComponent = (
  props: Omit<Urql.MutationProps<CreateFirmMutation, CreateFirmMutationVariables>, "query"> & { variables?: CreateFirmMutationVariables }
) => <Urql.Mutation {...props} query={CreateFirmDocument} />;

export function useCreateFirmMutation() {
  return Urql.useMutation<CreateFirmMutation, CreateFirmMutationVariables>(CreateFirmDocument);
}
export const UpdateFirmDocument = gql`
  mutation UpdateFirm($id: String!, $name: String!) {
    updateFirm(id: $id, name: $name) {
      ...firm
    }
  }
  ${FirmFragmentDoc}
`;

export const UpdateFirmComponent = (
  props: Omit<Urql.MutationProps<UpdateFirmMutation, UpdateFirmMutationVariables>, "query"> & { variables?: UpdateFirmMutationVariables }
) => <Urql.Mutation {...props} query={UpdateFirmDocument} />;

export function useUpdateFirmMutation() {
  return Urql.useMutation<UpdateFirmMutation, UpdateFirmMutationVariables>(UpdateFirmDocument);
}
export const DeleteFirmDocument = gql`
  mutation DeleteFirm($firmId: String!) {
    deleteFirm(firmId: $firmId)
  }
`;

export const DeleteFirmComponent = (
  props: Omit<Urql.MutationProps<DeleteFirmMutation, DeleteFirmMutationVariables>, "query"> & { variables?: DeleteFirmMutationVariables }
) => <Urql.Mutation {...props} query={DeleteFirmDocument} />;

export function useDeleteFirmMutation() {
  return Urql.useMutation<DeleteFirmMutation, DeleteFirmMutationVariables>(DeleteFirmDocument);
}
export const GetFirmAvatarSignedUrlDocument = gql`
  mutation GetFirmAvatarSignedUrl($hash: String!, $ext: EImageExtension!) {
    getFirmAvatarSignedUrl(hash: $hash, ext: $ext)
  }
`;

export const GetFirmAvatarSignedUrlComponent = (
  props: Omit<Urql.MutationProps<GetFirmAvatarSignedUrlMutation, GetFirmAvatarSignedUrlMutationVariables>, "query"> & {
    variables?: GetFirmAvatarSignedUrlMutationVariables;
  }
) => <Urql.Mutation {...props} query={GetFirmAvatarSignedUrlDocument} />;

export function useGetFirmAvatarSignedUrlMutation() {
  return Urql.useMutation<GetFirmAvatarSignedUrlMutation, GetFirmAvatarSignedUrlMutationVariables>(GetFirmAvatarSignedUrlDocument);
}
export const SetFirmAvatarDocument = gql`
  mutation SetFirmAvatar {
    setFirmAvatar
  }
`;

export const SetFirmAvatarComponent = (
  props: Omit<Urql.MutationProps<SetFirmAvatarMutation, SetFirmAvatarMutationVariables>, "query"> & {
    variables?: SetFirmAvatarMutationVariables;
  }
) => <Urql.Mutation {...props} query={SetFirmAvatarDocument} />;

export function useSetFirmAvatarMutation() {
  return Urql.useMutation<SetFirmAvatarMutation, SetFirmAvatarMutationVariables>(SetFirmAvatarDocument);
}
export const GetNotesDocument = gql`
  query GetNotes($take: Int!, $skip: Int!, $clientId: String!, $search: String!) {
    getNotes(take: $take, skip: $skip, clientId: $clientId, search: $search) {
      ...note
    }
  }
  ${NoteFragmentDoc}
`;

export const GetNotesComponent = (
  props: Omit<Urql.QueryProps<GetNotesQuery, GetNotesQueryVariables>, "query"> & { variables: GetNotesQueryVariables }
) => <Urql.Query {...props} query={GetNotesDocument} />;

export function useGetNotesQuery(options: Omit<Urql.UseQueryArgs<GetNotesQueryVariables>, "query">) {
  return Urql.useQuery<GetNotesQuery, GetNotesQueryVariables>({ query: GetNotesDocument, ...options });
}
export const GetNoteDocument = gql`
  query GetNote($noteId: String!) {
    getNote(noteId: $noteId) {
      ...note
    }
  }
  ${NoteFragmentDoc}
`;

export const GetNoteComponent = (
  props: Omit<Urql.QueryProps<GetNoteQuery, GetNoteQueryVariables>, "query"> & { variables: GetNoteQueryVariables }
) => <Urql.Query {...props} query={GetNoteDocument} />;

export function useGetNoteQuery(options: Omit<Urql.UseQueryArgs<GetNoteQueryVariables>, "query">) {
  return Urql.useQuery<GetNoteQuery, GetNoteQueryVariables>({ query: GetNoteDocument, ...options });
}
export const CreateNoteDocument = gql`
  mutation CreateNote($clientId: String!, $note: String!, $workspaceId: String!) {
    createNote(clientId: $clientId, note: $note, workspaceId: $workspaceId) {
      ...note
    }
  }
  ${NoteFragmentDoc}
`;

export const CreateNoteComponent = (
  props: Omit<Urql.MutationProps<CreateNoteMutation, CreateNoteMutationVariables>, "query"> & { variables?: CreateNoteMutationVariables }
) => <Urql.Mutation {...props} query={CreateNoteDocument} />;

export function useCreateNoteMutation() {
  return Urql.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument);
}
export const DeleteNoteDocument = gql`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId) {
      ...note
    }
  }
  ${NoteFragmentDoc}
`;

export const DeleteNoteComponent = (
  props: Omit<Urql.MutationProps<DeleteNoteMutation, DeleteNoteMutationVariables>, "query"> & { variables?: DeleteNoteMutationVariables }
) => <Urql.Mutation {...props} query={DeleteNoteDocument} />;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
}
export const UpdateNoteDocument = gql`
  mutation UpdateNote($note: String!, $noteId: String!) {
    updateNote(note: $note, noteId: $noteId) {
      ...note
    }
  }
  ${NoteFragmentDoc}
`;

export const UpdateNoteComponent = (
  props: Omit<Urql.MutationProps<UpdateNoteMutation, UpdateNoteMutationVariables>, "query"> & { variables?: UpdateNoteMutationVariables }
) => <Urql.Mutation {...props} query={UpdateNoteDocument} />;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
}
export const GetPromptsDocument = gql`
  query GetPrompts {
    getPrompts {
      ...prompt
    }
  }
  ${PromptFragmentDoc}
`;

export const GetPromptsComponent = (
  props: Omit<Urql.QueryProps<GetPromptsQuery, GetPromptsQueryVariables>, "query"> & { variables?: GetPromptsQueryVariables }
) => <Urql.Query {...props} query={GetPromptsDocument} />;

export function useGetPromptsQuery(options?: Omit<Urql.UseQueryArgs<GetPromptsQueryVariables>, "query">) {
  return Urql.useQuery<GetPromptsQuery, GetPromptsQueryVariables>({ query: GetPromptsDocument, ...options });
}
export const GetPromptDocument = gql`
  query GetPrompt($promptId: String!) {
    getPrompt(promptId: $promptId) {
      ...prompt
    }
  }
  ${PromptFragmentDoc}
`;

export const GetPromptComponent = (
  props: Omit<Urql.QueryProps<GetPromptQuery, GetPromptQueryVariables>, "query"> & { variables: GetPromptQueryVariables }
) => <Urql.Query {...props} query={GetPromptDocument} />;

export function useGetPromptQuery(options: Omit<Urql.UseQueryArgs<GetPromptQueryVariables>, "query">) {
  return Urql.useQuery<GetPromptQuery, GetPromptQueryVariables>({ query: GetPromptDocument, ...options });
}
export const GetSystemPromptDocument = gql`
  query GetSystemPrompt($clientId: String!, $promptId: String!) {
    getSystemPrompt(clientId: $clientId, promptId: $promptId)
  }
`;

export const GetSystemPromptComponent = (
  props: Omit<Urql.QueryProps<GetSystemPromptQuery, GetSystemPromptQueryVariables>, "query"> & { variables: GetSystemPromptQueryVariables }
) => <Urql.Query {...props} query={GetSystemPromptDocument} />;

export function useGetSystemPromptQuery(options: Omit<Urql.UseQueryArgs<GetSystemPromptQueryVariables>, "query">) {
  return Urql.useQuery<GetSystemPromptQuery, GetSystemPromptQueryVariables>({ query: GetSystemPromptDocument, ...options });
}
export const GetAllRssSubscriptionsDocument = gql`
  query GetAllRssSubscriptions {
    getAllRssSubscriptions {
      ...rssSubscription
    }
  }
  ${RssSubscriptionFragmentDoc}
`;

export const GetAllRssSubscriptionsComponent = (
  props: Omit<Urql.QueryProps<GetAllRssSubscriptionsQuery, GetAllRssSubscriptionsQueryVariables>, "query"> & {
    variables?: GetAllRssSubscriptionsQueryVariables;
  }
) => <Urql.Query {...props} query={GetAllRssSubscriptionsDocument} />;

export function useGetAllRssSubscriptionsQuery(options?: Omit<Urql.UseQueryArgs<GetAllRssSubscriptionsQueryVariables>, "query">) {
  return Urql.useQuery<GetAllRssSubscriptionsQuery, GetAllRssSubscriptionsQueryVariables>({
    query: GetAllRssSubscriptionsDocument,
    ...options,
  });
}
export const GetMyRssSubsDocument = gql`
  query GetMyRssSubs {
    getMyRssSubs {
      ...rssSubscription
    }
  }
  ${RssSubscriptionFragmentDoc}
`;

export const GetMyRssSubsComponent = (
  props: Omit<Urql.QueryProps<GetMyRssSubsQuery, GetMyRssSubsQueryVariables>, "query"> & { variables?: GetMyRssSubsQueryVariables }
) => <Urql.Query {...props} query={GetMyRssSubsDocument} />;

export function useGetMyRssSubsQuery(options?: Omit<Urql.UseQueryArgs<GetMyRssSubsQueryVariables>, "query">) {
  return Urql.useQuery<GetMyRssSubsQuery, GetMyRssSubsQueryVariables>({ query: GetMyRssSubsDocument, ...options });
}
export const GetMyRssEntriesDocument = gql`
  query GetMyRssEntries($skip: Int!, $take: Int!) {
    getMyRssEntries(skip: $skip, take: $take) {
      ...rssEntry
    }
  }
  ${RssEntryFragmentDoc}
`;

export const GetMyRssEntriesComponent = (
  props: Omit<Urql.QueryProps<GetMyRssEntriesQuery, GetMyRssEntriesQueryVariables>, "query"> & { variables: GetMyRssEntriesQueryVariables }
) => <Urql.Query {...props} query={GetMyRssEntriesDocument} />;

export function useGetMyRssEntriesQuery(options: Omit<Urql.UseQueryArgs<GetMyRssEntriesQueryVariables>, "query">) {
  return Urql.useQuery<GetMyRssEntriesQuery, GetMyRssEntriesQueryVariables>({ query: GetMyRssEntriesDocument, ...options });
}
export const CreateRssSubscriptionDocument = gql`
  mutation CreateRssSubscription($url: String!) {
    createRssSubscription(url: $url) {
      ...rssSubscription
    }
  }
  ${RssSubscriptionFragmentDoc}
`;

export const CreateRssSubscriptionComponent = (
  props: Omit<Urql.MutationProps<CreateRssSubscriptionMutation, CreateRssSubscriptionMutationVariables>, "query"> & {
    variables?: CreateRssSubscriptionMutationVariables;
  }
) => <Urql.Mutation {...props} query={CreateRssSubscriptionDocument} />;

export function useCreateRssSubscriptionMutation() {
  return Urql.useMutation<CreateRssSubscriptionMutation, CreateRssSubscriptionMutationVariables>(CreateRssSubscriptionDocument);
}
export const DeleteRssSubscriptionDocument = gql`
  mutation DeleteRssSubscription($subscription_id: String!) {
    deleteRssSubscription(subscription_id: $subscription_id)
  }
`;

export const DeleteRssSubscriptionComponent = (
  props: Omit<Urql.MutationProps<DeleteRssSubscriptionMutation, DeleteRssSubscriptionMutationVariables>, "query"> & {
    variables?: DeleteRssSubscriptionMutationVariables;
  }
) => <Urql.Mutation {...props} query={DeleteRssSubscriptionDocument} />;

export function useDeleteRssSubscriptionMutation() {
  return Urql.useMutation<DeleteRssSubscriptionMutation, DeleteRssSubscriptionMutationVariables>(DeleteRssSubscriptionDocument);
}
export const MyRssFeedDocument = gql`
  subscription MyRssFeed {
    myRssFeed {
      ...rssEntry
    }
  }
  ${RssEntryFragmentDoc}
`;

export const MyRssFeedComponent = (
  props: Omit<Urql.SubscriptionProps<MyRssFeedSubscription, MyRssFeedSubscription, MyRssFeedSubscriptionVariables>, "query"> & {
    variables?: MyRssFeedSubscriptionVariables;
  }
) => <Urql.Subscription {...props} query={MyRssFeedDocument} />;

export function useMyRssFeedSubscription<TData = MyRssFeedSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<MyRssFeedSubscriptionVariables>, "query"> = {},
  handler?: Urql.SubscriptionHandler<MyRssFeedSubscription, TData>
) {
  return Urql.useSubscription<MyRssFeedSubscription, TData, MyRssFeedSubscriptionVariables>(
    { query: MyRssFeedDocument, ...options },
    handler
  );
}
export const GetStatsDocument = gql`
  query GetStats {
    getStats {
      ...stats
    }
  }
  ${StatsFragmentDoc}
`;

export const GetStatsComponent = (
  props: Omit<Urql.QueryProps<GetStatsQuery, GetStatsQueryVariables>, "query"> & { variables?: GetStatsQueryVariables }
) => <Urql.Query {...props} query={GetStatsDocument} />;

export function useGetStatsQuery(options?: Omit<Urql.UseQueryArgs<GetStatsQueryVariables>, "query">) {
  return Urql.useQuery<GetStatsQuery, GetStatsQueryVariables>({ query: GetStatsDocument, ...options });
}
export const GetTasksDocument = gql`
  query GetTasks($firmId: String!, $workspaceId: String, $assigneeId: String, $clientId: String) {
    getTasks(firmId: $firmId, workspaceId: $workspaceId, assigneeId: $assigneeId, clientId: $clientId) {
      ...task
    }
  }
  ${TaskFragmentDoc}
`;

export const GetTasksComponent = (
  props: Omit<Urql.QueryProps<GetTasksQuery, GetTasksQueryVariables>, "query"> & { variables: GetTasksQueryVariables }
) => <Urql.Query {...props} query={GetTasksDocument} />;

export function useGetTasksQuery(options: Omit<Urql.UseQueryArgs<GetTasksQueryVariables>, "query">) {
  return Urql.useQuery<GetTasksQuery, GetTasksQueryVariables>({ query: GetTasksDocument, ...options });
}
export const GetTaskDocument = gql`
  query GetTask($taskId: String!) {
    getTask(taskId: $taskId) {
      ...task
    }
  }
  ${TaskFragmentDoc}
`;

export const GetTaskComponent = (
  props: Omit<Urql.QueryProps<GetTaskQuery, GetTaskQueryVariables>, "query"> & { variables: GetTaskQueryVariables }
) => <Urql.Query {...props} query={GetTaskDocument} />;

export function useGetTaskQuery(options: Omit<Urql.UseQueryArgs<GetTaskQueryVariables>, "query">) {
  return Urql.useQuery<GetTaskQuery, GetTaskQueryVariables>({ query: GetTaskDocument, ...options });
}
export const CreateTaskDocument = gql`
  mutation CreateTask(
    $clientId: String!
    $workspaceId: String!
    $objective: String!
    $dueDate: String!
    $description: String!
    $status: ETaskStatus!
  ) {
    createTask(
      clientId: $clientId
      workspaceId: $workspaceId
      objective: $objective
      dueDate: $dueDate
      description: $description
      status: $status
    ) {
      ...task
    }
  }
  ${TaskFragmentDoc}
`;

export const CreateTaskComponent = (
  props: Omit<Urql.MutationProps<CreateTaskMutation, CreateTaskMutationVariables>, "query"> & { variables?: CreateTaskMutationVariables }
) => <Urql.Mutation {...props} query={CreateTaskDocument} />;

export function useCreateTaskMutation() {
  return Urql.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument);
}
export const UpdateTaskDocument = gql`
  mutation UpdateTask($taskId: String!, $objective: String!, $description: String!, $status: ETaskStatus!, $dueDate: String!) {
    updateTask(taskId: $taskId, objective: $objective, description: $description, status: $status, dueDate: $dueDate) {
      ...task
    }
  }
  ${TaskFragmentDoc}
`;

export const UpdateTaskComponent = (
  props: Omit<Urql.MutationProps<UpdateTaskMutation, UpdateTaskMutationVariables>, "query"> & { variables?: UpdateTaskMutationVariables }
) => <Urql.Mutation {...props} query={UpdateTaskDocument} />;

export function useUpdateTaskMutation() {
  return Urql.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument);
}
export const DeleteTaskDocument = gql`
  mutation DeleteTask($taskId: String!) {
    deleteTask(taskId: $taskId) {
      ...task
    }
  }
  ${TaskFragmentDoc}
`;

export const DeleteTaskComponent = (
  props: Omit<Urql.MutationProps<DeleteTaskMutation, DeleteTaskMutationVariables>, "query"> & { variables?: DeleteTaskMutationVariables }
) => <Urql.Mutation {...props} query={DeleteTaskDocument} />;

export function useDeleteTaskMutation() {
  return Urql.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument);
}
export const GetTimezonesDocument = gql`
  query GetTimezones {
    getTimezones {
      abbrev
      altName
      label
      offset
      value
    }
  }
`;

export const GetTimezonesComponent = (
  props: Omit<Urql.QueryProps<GetTimezonesQuery, GetTimezonesQueryVariables>, "query"> & { variables?: GetTimezonesQueryVariables }
) => <Urql.Query {...props} query={GetTimezonesDocument} />;

export function useGetTimezonesQuery(options?: Omit<Urql.UseQueryArgs<GetTimezonesQueryVariables>, "query">) {
  return Urql.useQuery<GetTimezonesQuery, GetTimezonesQueryVariables>({ query: GetTimezonesDocument, ...options });
}
export const GetUsersDocument = gql`
  query GetUsers($take: Int!, $skip: Int!, $search: String) {
    getUsers(take: $take, skip: $skip, search: $search) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

export const GetUsersComponent = (
  props: Omit<Urql.QueryProps<GetUsersQuery, GetUsersQueryVariables>, "query"> & { variables: GetUsersQueryVariables }
) => <Urql.Query {...props} query={GetUsersDocument} />;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, "query">) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables>({ query: GetUsersDocument, ...options });
}
export const GetUserDocument = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

export const GetUserComponent = (
  props: Omit<Urql.QueryProps<GetUserQuery, GetUserQueryVariables>, "query"> & { variables: GetUserQueryVariables }
) => <Urql.Query {...props} query={GetUserDocument} />;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, "query">) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
}
export const CreateUserDocument = gql`
  mutation CreateUser(
    $email: String!
    $firmId: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $timezone: String!
    $emailVerified: Boolean!
    $firmPermission: EFirmPermission
    $samplePermission: ELobbymaticPermission
  ) {
    createUser(
      email: $email
      firmId: $firmId
      firstName: $firstName
      lastName: $lastName
      password: $password
      timezone: $timezone
      emailVerified: $emailVerified
      firmPermission: $firmPermission
      samplePermission: $samplePermission
    ) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

export const CreateUserComponent = (
  props: Omit<Urql.MutationProps<CreateUserMutation, CreateUserMutationVariables>, "query"> & { variables?: CreateUserMutationVariables }
) => <Urql.Mutation {...props} query={CreateUserDocument} />;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
}
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $email: String!
    $id: String!
    $firstName: String!
    $lastName: String!
    $password: String
    $firmPermission: EFirmPermission
    $samplePermission: ELobbymaticPermission
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      firmPermission: $firmPermission
      samplePermission: $samplePermission
      password: $password
    ) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

export const UpdateUserComponent = (
  props: Omit<Urql.MutationProps<UpdateUserMutation, UpdateUserMutationVariables>, "query"> & { variables?: UpdateUserMutationVariables }
) => <Urql.Mutation {...props} query={UpdateUserDocument} />;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
}
export const DeleteUserDocument = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

export const DeleteUserComponent = (
  props: Omit<Urql.MutationProps<DeleteUserMutation, DeleteUserMutationVariables>, "query"> & { variables?: DeleteUserMutationVariables }
) => <Urql.Mutation {...props} query={DeleteUserDocument} />;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
}
export const MeDocument = gql`
  query Me {
    me {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

export const MeComponent = (props: Omit<Urql.QueryProps<MeQuery, MeQueryVariables>, "query"> & { variables?: MeQueryVariables }) => (
  <Urql.Query {...props} query={MeDocument} />
);

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

export const LoginComponent = (
  props: Omit<Urql.MutationProps<LoginMutation, LoginMutationVariables>, "query"> & { variables?: LoginMutationVariables }
) => <Urql.Mutation {...props} query={LoginDocument} />;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export const LogoutComponent = (
  props: Omit<Urql.MutationProps<LogoutMutation, LogoutMutationVariables>, "query"> & { variables?: LogoutMutationVariables }
) => <Urql.Mutation {...props} query={LogoutDocument} />;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
}
export const GetUserAvatarSignedUrlDocument = gql`
  mutation GetUserAvatarSignedUrl($hash: String!, $ext: EImageExtension!) {
    getUserAvatarSignedUrl(hash: $hash, ext: $ext)
  }
`;

export const GetUserAvatarSignedUrlComponent = (
  props: Omit<Urql.MutationProps<GetUserAvatarSignedUrlMutation, GetUserAvatarSignedUrlMutationVariables>, "query"> & {
    variables?: GetUserAvatarSignedUrlMutationVariables;
  }
) => <Urql.Mutation {...props} query={GetUserAvatarSignedUrlDocument} />;

export function useGetUserAvatarSignedUrlMutation() {
  return Urql.useMutation<GetUserAvatarSignedUrlMutation, GetUserAvatarSignedUrlMutationVariables>(GetUserAvatarSignedUrlDocument);
}
export const SetUserAvatarDocument = gql`
  mutation SetUserAvatar {
    setUserAvatar {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

export const SetUserAvatarComponent = (
  props: Omit<Urql.MutationProps<SetUserAvatarMutation, SetUserAvatarMutationVariables>, "query"> & {
    variables?: SetUserAvatarMutationVariables;
  }
) => <Urql.Mutation {...props} query={SetUserAvatarDocument} />;

export function useSetUserAvatarMutation() {
  return Urql.useMutation<SetUserAvatarMutation, SetUserAvatarMutationVariables>(SetUserAvatarDocument);
}
export const GetWorkspacesDocument = gql`
  query GetWorkspaces($take: Int!, $skip: Int!, $search: String) {
    getWorkspaces(take: $take, skip: $skip, search: $search) {
      ...workspace
    }
  }
  ${WorkspaceFragmentDoc}
`;

export const GetWorkspacesComponent = (
  props: Omit<Urql.QueryProps<GetWorkspacesQuery, GetWorkspacesQueryVariables>, "query"> & { variables: GetWorkspacesQueryVariables }
) => <Urql.Query {...props} query={GetWorkspacesDocument} />;

export function useGetWorkspacesQuery(options: Omit<Urql.UseQueryArgs<GetWorkspacesQueryVariables>, "query">) {
  return Urql.useQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>({ query: GetWorkspacesDocument, ...options });
}
export const GetWorkspaceDocument = gql`
  query GetWorkspace($workspaceId: String!) {
    getWorkspace(workspaceId: $workspaceId) {
      ...workspace
    }
  }
  ${WorkspaceFragmentDoc}
`;

export const GetWorkspaceComponent = (
  props: Omit<Urql.QueryProps<GetWorkspaceQuery, GetWorkspaceQueryVariables>, "query"> & { variables: GetWorkspaceQueryVariables }
) => <Urql.Query {...props} query={GetWorkspaceDocument} />;

export function useGetWorkspaceQuery(options: Omit<Urql.UseQueryArgs<GetWorkspaceQueryVariables>, "query">) {
  return Urql.useQuery<GetWorkspaceQuery, GetWorkspaceQueryVariables>({ query: GetWorkspaceDocument, ...options });
}
export const CreateWorkspaceDocument = gql`
  mutation CreateWorkspace($name: String!, $firmId: String!) {
    createWorkspace(firmId: $firmId, name: $name) {
      ...workspace
    }
  }
  ${WorkspaceFragmentDoc}
`;

export const CreateWorkspaceComponent = (
  props: Omit<Urql.MutationProps<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>, "query"> & {
    variables?: CreateWorkspaceMutationVariables;
  }
) => <Urql.Mutation {...props} query={CreateWorkspaceDocument} />;

export function useCreateWorkspaceMutation() {
  return Urql.useMutation<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument);
}
export const UpdateWorkspaceDocument = gql`
  mutation UpdateWorkspace($id: String!, $name: String!) {
    updateWorkspace(id: $id, name: $name) {
      ...workspace
    }
  }
  ${WorkspaceFragmentDoc}
`;

export const UpdateWorkspaceComponent = (
  props: Omit<Urql.MutationProps<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>, "query"> & {
    variables?: UpdateWorkspaceMutationVariables;
  }
) => <Urql.Mutation {...props} query={UpdateWorkspaceDocument} />;

export function useUpdateWorkspaceMutation() {
  return Urql.useMutation<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument);
}
export const DeleteWorkspaceDocument = gql`
  mutation DeleteWorkspace($workspaceId: String!) {
    deleteWorkspace(workspaceId: $workspaceId)
  }
`;

export const DeleteWorkspaceComponent = (
  props: Omit<Urql.MutationProps<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>, "query"> & {
    variables?: DeleteWorkspaceMutationVariables;
  }
) => <Urql.Mutation {...props} query={DeleteWorkspaceDocument} />;

export function useDeleteWorkspaceMutation() {
  return Urql.useMutation<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(DeleteWorkspaceDocument);
}
