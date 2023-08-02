import { action, Action, State } from "easy-peasy";
import { UserFragment } from "../graphql/urql-codegen/code";

export interface ISettingsStore {
  timezone: string;
  clientId: string;
  workspaceId: string;
  firmId: string;
  userId: string;
  promptId: string;

  setLoginState: Action<ISettingsStore, UserFragment>;
  setClientId: Action<ISettingsStore, string>;
  setWorkspaceId: Action<ISettingsStore, string>;
  setPromptId: Action<ISettingsStore, string>;
}

export const initialSettingsState: State<ISettingsStore> = {
  timezone: "",
  clientId: "",
  workspaceId: "",
  firmId: "",
  userId: "",
  promptId: "",
};

export const SettingsStore: ISettingsStore = {
  ...initialSettingsState,
  setLoginState: action((state, user) => {
    state.timezone = user.timezone;
    state.firmId = user.firmId;
    state.userId = user.id;
  }),
  setClientId: action((state, clientId) => {
    state.clientId = clientId;
  }),
  setWorkspaceId: action((state, workspaceId) => {
    state.workspaceId = workspaceId;
  }),
  setPromptId: action((state, promptId) => {
    state.promptId = promptId;
  }),
};
