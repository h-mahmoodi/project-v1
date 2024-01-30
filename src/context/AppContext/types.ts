import { AppReducerActions } from "./reducer";

type Notify = {
  title?: string;
  message?: string;
  type?: "success" | "warning" | "error";
};

type AppContextType = {
  notify: Notify;
  addNotify: (notify: Notify) => void;
  removeNotify: () => void;
};

type AppStateType = {
  notify: Notify;
};

type AppContextProviderPropsType = {
  children: React.ReactNode;
};

type AppReducerActionType =
  | {
      type: AppReducerActions.AddNotify;
      payload: Notify;
    }
  | {
      type: AppReducerActions.RemoveNotify;
    };

export type {
  AppContextType,
  AppStateType,
  Notify,
  AppContextProviderPropsType,
  AppReducerActionType,
};
