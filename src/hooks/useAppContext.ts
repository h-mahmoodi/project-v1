import { useContext } from "react";
import AppContext from "../context/AppContext";

const useAppContext = () => {
  const data = useContext(AppContext);
  if (!data) {
    throw new Error("app context error");
  }
  return data;
};

export default useAppContext;
