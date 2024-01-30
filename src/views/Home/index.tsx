import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { fetchData } from "./utils";
import { Beer } from "../../types";
import useFavotiteContext from "../../hooks/useFavoriteContext";
import BeerListItemSkeleton from "../../components/ui/BeerListItemSkeleton";

import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import styles from "./Home.module.css";
import useAppContext from "../../hooks/useAppContext";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [searchText, setSearchText] = useState("");
  const [findedBeerList, setFindedBeerList] = useState<Array<Beer>>(beerList);
  const [selectedFavoriteItems, setSelectedFavoriteItems] = useState<
    Array<Beer>
  >([]);

  const favoriteCTX = useFavotiteContext();

  const appCTX = useAppContext();

  const reloadListHandler = () => {
    fetchData(setBeerList, false);
    if (!navigator.onLine) {
      appCTX.addNotify({
        title: "Cant reload the data",
        message:
          "You are in offline mode and you see just the previous data!!!",
        type: "error",
      });
    }
  };

  const searchHandler = (value: string): void => {
    setSearchText(value);
    const findedBeers = beerList.filter((beerItem) => {
      return beerItem.name.toLowerCase().includes(value.toLowerCase());
    });
    setFindedBeerList(findedBeers);
  };

  const selectFavoriteItemHandler = (beer: Beer) => {
    const selectedItem = selectedFavoriteItems.find(
      (item) => item.id === beer.id
    );
    if (selectedItem) {
      setSelectedFavoriteItems((state) =>
        state.filter((item) => item.id !== beer.id)
      );
    } else {
      setSelectedFavoriteItems((state) => [...state, beer]);
    }
  };

  const deleteSelectedFavoriteItems = () => {
    favoriteCTX.removeItems(selectedFavoriteItems);
    setSelectedFavoriteItems([]);
  };

  const clearAllHandler = () => {
    favoriteCTX.clearAll();
  };

  // eslint-disable-next-line
  useEffect(fetchData.bind("this", setBeerList), []);

  useEffect(() => {
    setFindedBeerList(beerList);
  }, [beerList]);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <div className={styles.flex}>
                  <TextField
                    label="Filter..."
                    id="filter"
                    size="small"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => searchHandler(e.target.value)}
                  />
                  {searchText && (
                    <span className={styles.listCount}>
                      {findedBeerList.length} Items founded
                    </span>
                  )}
                </div>

                <Button variant="contained" onClick={reloadListHandler}>
                  Reload list
                </Button>
              </div>
              {searchText && findedBeerList.length === 0 && (
                <div className={styles.notFound}>Cant Find any data !!! </div>
              )}

              {beerList.length > 0 && findedBeerList.length > 0 && (
                <ul className={styles.list}>
                  {findedBeerList.map((beer, index) => (
                    <li key={beer.id}>
                      <Checkbox
                        icon={<FavoriteBorderIcon />}
                        checkedIcon={<FavoriteIcon />}
                        onChange={() => favoriteCTX.toggle(beer)}
                        checked={favoriteCTX.isFavorite(beer.id)}
                      />
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {!beerList.length && (
                <div>
                  <BeerListItemSkeleton count={10} />
                </div>
              )}
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Favotites items</h3>
                <div className={styles.flex}>
                  {selectedFavoriteItems.length > 0 && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={deleteSelectedFavoriteItems}
                    >
                      Remove Selected
                    </Button>
                  )}
                  {favoriteCTX.favorites.length > 0 && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={clearAllHandler}
                    >
                      Remove all
                    </Button>
                  )}
                </div>
              </div>

              <ul className={styles.list}>
                {favoriteCTX.favorites.map((beer, index) => (
                  <li key={beer.id}>
                    <Checkbox
                      onChange={() => selectFavoriteItemHandler(beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!favoriteCTX.favorites.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
