import axios from "axios";
import { API } from "./config";
import { ApiParams } from "../types";

const getBeer = (id: string) => axios.get(`${API}breweries/${id}`);

const getBeerList = (params?: ApiParams) =>
  axios.get(`${API}breweries/`, { params });

/**
 * @param size Int between 1 and 50. Default is 3.
 * @param cache Boolean value for enable or disable cache . Default is true.
 * @returns New promise with api call for random beer list.
 */
const getRandomBeerList = (size = 3, cache = true) =>
  axios.get(`${API}breweries/random`, {
    params: { size },
    headers: !cache
      ? {
          "Cache-Control": "no-cache",
        }
      : {},
  });

const searchBeerList = (query: string, isAutoComplete = false) =>
  axios.get(`${API}breweries/${isAutoComplete ? "autocomplete" : "search"}`, {
    params: { query },
  });

const getBeerMetaData = (params?: ApiParams) =>
  axios.get(`${API}breweries/meta`, { params });

export {
  getBeer,
  getBeerList,
  getRandomBeerList,
  searchBeerList,
  getBeerMetaData,
};
