import { Beer } from "../../types";
import { FavoriteReducerActions } from "./reducer";

type FavoriteContextType = {
  favorites: Array<Beer>;
  toggle: (beer: Beer) => void;
  isFavorite: (id: string) => boolean;
  removeItems: (items: Beer[]) => void;
  clearAll: () => void;
};

type FavoriteStateType = {
  firstLoad: boolean;
  favorites: Array<Beer>;
};

type FavoriteContextProviderPropsType = {
  children: React.ReactNode;
};

type FavoriteReducerAction =
  | { type: FavoriteReducerActions.SetData; payload: Beer[] }
  | { type: FavoriteReducerActions.SetFristLoad; payload: boolean }
  | { type: FavoriteReducerActions.Add; payload: Beer }
  | { type: FavoriteReducerActions.Remove; payload: string }
  | { type: FavoriteReducerActions.ClearAll };

export type {
  FavoriteStateType,
  FavoriteContextType,
  FavoriteContextProviderPropsType,
  FavoriteReducerAction,
};
