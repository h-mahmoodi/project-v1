import { getRandomBeerList } from "../../api";
import { Beer } from "../../types";
import handle from "../../utils/error";

const fetchData = (
  setData: (data: Array<Beer>) => void,
  cache: boolean = true
) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10, cache);
      setData(data);
      localStorage.setItem("beers", JSON.stringify(data));
    } catch (error) {
      const data = JSON.parse(localStorage.beers);
      setData(data);
      if (!data) {
        handle(error);
      }
    }
  })();
};

export { fetchData };
