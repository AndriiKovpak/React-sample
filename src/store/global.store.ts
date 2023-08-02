import { Action, ActionOn, State, TargetPayload, action, actionOn, createStore, createTypedHooks } from "easy-peasy";
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { ISettingsStore, SettingsStore, initialSettingsState } from "./settings.store";

interface IGlobalStore {
  settings: ISettingsStore;
  reset: Action<IGlobalStore>;
  ssrHydrate: ActionOn<IGlobalStore, IGlobalStore>;
}

const typedHooks = createTypedHooks<IGlobalStore>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const nextReduxWrapper = createWrapper(
  wrapMakeStore(() =>
    createStore<IGlobalStore>(
      {
        settings: SettingsStore,
        reset: action((_state) => ({ settings: initialSettingsState })),
        ssrHydrate: actionOn(
          () => HYDRATE,
          (state, target: TargetPayload<State<IGlobalStore>>) => ({ ...state, ...target.payload })
        ),
      },
      {
        middleware: [
          nextReduxCookieMiddleware({
            subtrees: ["settings"],
          }),
        ],
      }
    )
  )
);
