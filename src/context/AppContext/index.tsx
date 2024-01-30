import { createContext, useReducer } from "react";
import { AppReducerActions, appReducer } from "./reducer";
import {
  AppContextProviderPropsType,
  AppStateType,
  Notify,
  AppContextType,
} from "./types";

const initialContext: AppContextType = {
  notify: {},
  addNotify: () => {},
  removeNotify: () => {},
};

const AppContext = createContext<AppContextType>(initialContext);

const initialState: AppStateType = {
  notify: {},
};

export const AppContextProvider = ({
  children,
}: AppContextProviderPropsType) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addNotify = ({ title, message, type }: Notify) => {
    dispatch({
      type: AppReducerActions.AddNotify,
      payload: { title, message, type },
    });
  };

  const removeNotify = () => {
    dispatch({
      type: AppReducerActions.RemoveNotify,
    });
  };

  const value = {
    notify: state.notify,
    addNotify,
    removeNotify,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContext;
