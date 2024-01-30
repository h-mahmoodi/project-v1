import { FavoriteReducerAction, FavoriteStateType } from "./types";

export enum FavoriteReducerActions {
  SetData = "Favorite/SetData",
  Add = "Favorite/Add",
  Remove = "Favorite/Remove",
  ClearAll = "Favorite/ClearAll",
  SetFristLoad = "Favorite/SetFirstLoad",
}

export const favoriteReducer = (
  state: FavoriteStateType,
  action: FavoriteReducerAction
) => {
  switch (action.type) {
    case FavoriteReducerActions.SetData: {
      return {
        ...state,
        favorites: action.payload,
      };
    }
    case FavoriteReducerActions.SetFristLoad: {
      return {
        ...state,
        firstLoad: action.payload,
      };
    }
    case FavoriteReducerActions.Add: {
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
      };
    }
    case FavoriteReducerActions.Remove: {
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };
    }
    case FavoriteReducerActions.ClearAll: {
      return {
        ...state,
        favorites: [],
      };
    }

    default:
      return state;
  }
};
