import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import useFavotiteContext from "../../hooks/useFavoriteContext";
import BeerSkeleton from "../../components/ui/BeerSkeleton";

import { Paper, Link, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import styles from "./Beer.module.css";

const Beer = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const favoriteCTX = useFavotiteContext();
  const isFav = beer ? favoriteCTX.isFavorite(beer.id) : false;

  const onToggleClickHandler = () => {
    if (!beer) {
      return;
    }
    favoriteCTX.toggle(beer);
  };

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  if (!beer && !navigator.onLine) {
    return (
      <Paper style={{ padding: "20px" }}>
        <div className={styles.offlineError}>
          <div className={styles.text_lg}>
            <strong>You are offline!!!</strong>
          </div>
          <div>You are offline and this data doesent cache in your device</div>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </Paper>
    );
  }
  if (!beer) {
    return <BeerSkeleton />;
  }

  return (
    <article>
      {/* {!beer && <BeerSkeleton />} */}
      {beer && (
        <section>
          <main>
            <Paper style={{ padding: "20px" }}>
              <header className={styles.flex}>
                <SportsBarIcon fontSize="large" />
                <h1 className={styles.title}>{beer?.name}</h1>
              </header>
              <section className={styles.listContainer}>
                <div className={styles.listItems}>
                  <span className={styles.itemTitle}>Type : </span>
                  <span className={styles.itemData}>{beer?.brewery_type}</span>
                </div>

                <div className={styles.listItems}>
                  <span className={styles.itemTitle}>Address : </span>
                  <span className={styles.itemData}>
                    {beer?.street}, {beer?.city}, {beer?.state}{" "}
                    {beer?.postal_code}, {beer?.country}
                  </span>
                </div>

                <div className={styles.listItems}>
                  <span className={styles.itemTitle}>Phone : </span>
                  <span className={styles.itemData}>{beer?.phone}</span>
                </div>

                <div className={styles.listItems}>
                  <span className={styles.itemTitle}>Website : </span>
                  <Link href={beer?.website_url} className={styles.itemData}>
                    {beer?.website_url} &rarr;
                  </Link>
                </div>
              </section>

              <div className={styles.buttons}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                {isFav ? (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<FavoriteIcon />}
                    onClick={onToggleClickHandler}
                  >
                    REMOVE
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<FavoriteBorderIcon />}
                    onClick={onToggleClickHandler}
                  >
                    ADD
                  </Button>
                )}
              </div>
            </Paper>
          </main>
        </section>
      )}
    </article>
  );
};

export default Beer;
