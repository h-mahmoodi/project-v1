import { getBeer } from "../../api";
import { Beer } from "../../types";
import handle from "../../utils/error";

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
    } catch (error) {
      const allData = JSON.parse(localStorage.beers);
      const data = allData.filter((item: Beer) => item.id === id)[0];
      setData(data);
      if (!data) {
        handle(error);
      }
    }
  })();
};

export { fetchData };
