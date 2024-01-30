import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Beer } from "../../types";
import { FavoriteReducerActions, favoriteReducer } from "./reducer";
import useAppContext from "../../hooks/useAppContext";
import {
  FavoriteContextProviderPropsType,
  FavoriteContextType,
  FavoriteStateType,
} from "./types";

const initialContext: FavoriteContextType = {
  favorites: [],
  toggle: (beer: Beer) => {},
  isFavorite: (id: string) => false,
  removeItems: (items: Beer[]) => {},
  clearAll: () => {},
};

export const FavoriteContext =
  createContext<FavoriteContextType>(initialContext);

const initialState: FavoriteStateType = {
  firstLoad: true,
  favorites: [],
};

export const FavoriteContextProvider = ({
  children,
}: FavoriteContextProviderPropsType) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  const appCTX = useAppContext();

  useEffect(() => {
    if (!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", "[]");
    } else {
      const data = JSON.parse(localStorage.favorites);
      dispatch({ type: FavoriteReducerActions.SetData, payload: data });
    }
  }, []);

  useEffect(() => {
    if (!state.firstLoad) {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }

    dispatch({ type: FavoriteReducerActions.SetFristLoad, payload: false });
  }, [state.favorites, state.firstLoad]);

  const toggleFavorite = (beer: Beer): void => {
    if (!state.favorites.filter((item) => item.id === beer.id).length) {
      dispatch({ type: FavoriteReducerActions.Add, payload: beer });
      appCTX.addNotify({
        title: "Added Successfully",
        message: `${beer.name} Added to your favorite list`,
        type: "success",
      });
    } else {
      dispatch({ type: FavoriteReducerActions.Remove, payload: beer.id });
      appCTX.addNotify({
        title: "Removed Successfully",
        message: `${beer.name} Removed from your favorite list`,
        type: "warning",
      });
    }
  };

  const isFavorite = (id: string): boolean => {
    if (state.favorites.filter((item) => item.id === id).length) {
      return true;
    }
    return false;
  };

  const removeFavoriteItems = (items: Array<Beer>) => {
    items.forEach((item) => {
      dispatch({ type: FavoriteReducerActions.Remove, payload: item.id });
    });
    appCTX.addNotify({
      title: "Removed Successfully",
      message: `${items.length} Items Removed from your favorite list`,
      type: "warning",
    });
  };

  const clearAll = () => {
    dispatch({ type: FavoriteReducerActions.ClearAll });
    appCTX.addNotify({
      title: "Removed Successfully",
      message: `All Items Removed from your favorite list`,
      type: "warning",
    });
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites: state.favorites,
        toggle: toggleFavorite,
        isFavorite,
        removeItems: removeFavoriteItems,
        clearAll,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
