import { AppReducerActionType, AppStateType } from "./types";

export enum AppReducerActions {
  AddNotify = "App/AddNotify",
  RemoveNotify = "App/RemoveNotify",
}

export const appReducer = (
  state: AppStateType,
  action: AppReducerActionType
) => {
  switch (action.type) {
    case AppReducerActions.AddNotify: {
      return {
        ...state,
        notify: {
          title: action.payload.title,
          message: action.payload.message,
          type: action.payload.type,
        },
      };
    }
    case AppReducerActions.RemoveNotify: {
      return {
        ...state,
        notify: {},
      };
    }
    default: {
      return state;
    }
  }
};
