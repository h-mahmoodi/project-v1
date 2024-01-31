import { getBeerList, getBeerMetaData } from "../../api";
import { ApiParams, Beer } from "../../types";
import handle from "../../utils/error";

const fetchData = (
  setData: (data: Array<Beer>) => void,
  params?: ApiParams
) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      setData(response.data);
      localStorage.setItem("beerList", JSON.stringify(response.data));
    } catch (error) {
      let data = [];
      if (localStorage.beerList) {
        data = JSON.parse(localStorage.beerList);
      }
      setData(data);
      if (!data) {
        handle(error);
      }
    }
  })();
};

const fetchMetaData = (
  setData: (data: { total: string; page: string; per_page: string }) => void,
  params?: ApiParams
) => {
  (async () => {
    try {
      const response = await getBeerMetaData(params);
      setData(response.data);
    } catch (error) {
      // handle(error);
    }
  })();
};

export { fetchData, fetchMetaData };
