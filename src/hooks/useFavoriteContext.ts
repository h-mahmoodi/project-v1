import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

const useFavotiteContext = () => {
  const data = useContext(FavoriteContext);
  if (!data) {
    throw new Error("Favorite Context Error");
  }
  return data;
};

export default useFavotiteContext;
