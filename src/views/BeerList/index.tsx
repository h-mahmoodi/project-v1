import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ApiParams, Beer, MetaData, SORT, TYPE } from "../../types";
import { fetchData, fetchMetaData } from "./utils";

import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";

import styles from "./BeerList.module.css";
import useAppContext from "../../hooks/useAppContext";

const types = [
  "micro",
  "nano",
  "regional",
  "brewpub",
  "large",
  "planning",
  "bar",
  "contract",
  "proprietor",
  "closed",
];

const orders = ["desc", "asc"];

const fields = ["name", "type", "country", "state", "city", "postalCode"];

type FiltersType = {
  by_name?: string;
  by_type?: TYPE;
  by_country?: string;
  by_state?: string;
  by_city?: string;
  by_postal?: string;
  per_page?: string;
  page?: string;
};

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "name");
  const [sortType, setSortType] = useState<SORT>(
    (searchParams.get("sort_type") as SORT) || ("asc" as SORT)
  );

  const sort = `${sortBy}:${sortType}`;

  const [filters, setFilters] = useState<FiltersType>({
    by_name: searchParams.get("by_name") || "",
    by_type: (searchParams.get("by_type") as TYPE) || ("" as TYPE),
    by_country: searchParams.get("by_country") || "",
    by_state: searchParams.get("by_state") || "",
    by_city: searchParams.get("by_city") || "",
    by_postal: searchParams.get("by_postal") || "",
    per_page: searchParams.get("per_page") || "5",
    page: searchParams.get("page") || "1",
  });

  const nonEmptyFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  const [params, setParams] = useState<ApiParams>({
    ...nonEmptyFilters,
    sort: sort,
  });
  const [metadata, setMetaData] = useState<MetaData>();

  const appCTX = useAppContext();

  const onFilterChangeHandler = (filterName: string, value: string) => {
    setFilters((state) => {
      return {
        ...state,
        [filterName]: value,
      };
    });
  };

  const onSearchClickHandler = () => {
    if (!navigator.onLine) {
      appCTX.addNotify({
        title: "Cant reload the data",
        message:
          "You are in offline mode and you see just the previous data!!!",
        type: "error",
      });
      return;
    }

    setSearchParams({
      ...nonEmptyFilters,
      sort_by: sortBy,
      sort_type: sortType,
    });

    setParams({ ...nonEmptyFilters, sort: `${sortBy}:${sortType}` });
    setFilters((state) => ({ ...state, page: "1" }));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (!navigator.onLine) {
      appCTX.addNotify({
        title: "Cant reload the data",
        message:
          "You are in offline mode and you see just the previous data!!!",
        type: "error",
      });
      return;
    }

    setFilters((state) => ({ ...state, page: value.toString() }));
    setSearchParams({
      ...nonEmptyFilters,
      page: value.toString(),
      sort_by: sortBy,
      sort_type: sortType,
    });

    setParams({
      ...nonEmptyFilters,
      page: value,
      sort: sort,
    });
  };

  useEffect(() => {
    fetchData(setBeerList, params);
    fetchMetaData(setMetaData, params);
  }, [params]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>

        <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
          <div className={styles.flexCol}>
            <div>
              <TextField
                label="Filter By Name..."
                size="small"
                sx={{ m: 1, width: "315px" }}
                variant="outlined"
                value={filters.by_name}
                onChange={(e) =>
                  onFilterChangeHandler("by_name", e.target.value)
                }
              />

              <FormControl sx={{ m: 1, width: "150px" }} size="small">
                <InputLabel id="by-type-label">ByType</InputLabel>
                <Select
                  labelId="by-type-label"
                  id="by-type-select"
                  label="ByType"
                  value={filters.by_type}
                  onChange={(e) =>
                    onFilterChangeHandler("by_type", e.target.value)
                  }
                >
                  <MenuItem value="">All</MenuItem>
                  {types.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <div>
                <TextField
                  label="By Country"
                  size="small"
                  sx={{ m: 1, maxWidth: "150px" }}
                  variant="outlined"
                  value={filters.by_country}
                  onChange={(e) =>
                    onFilterChangeHandler("by_country", e.target.value)
                  }
                />
                <TextField
                  label="By State"
                  size="small"
                  sx={{ m: 1, maxWidth: "150px" }}
                  variant="outlined"
                  value={filters.by_state}
                  onChange={(e) =>
                    onFilterChangeHandler("by_state", e.target.value)
                  }
                />
                <TextField
                  label="By City"
                  size="small"
                  sx={{ m: 1, maxWidth: "150px" }}
                  variant="outlined"
                  value={filters.by_city}
                  onChange={(e) =>
                    onFilterChangeHandler("by_city", e.target.value)
                  }
                />
                <TextField
                  label="postal code"
                  size="small"
                  sx={{ m: 1, maxWidth: "150px" }}
                  variant="outlined"
                  value={filters.by_postal}
                  onChange={(e) =>
                    onFilterChangeHandler("by_postal", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: "150px" }} size="small">
                <InputLabel id="sortBy">Sort By</InputLabel>
                <Select
                  id="sortBy-select"
                  label="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {fields.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "150px" }} size="small">
                <InputLabel id="sortType">Sort Type</InputLabel>
                <Select
                  id="sortType-select"
                  label="sortType"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value as SORT)}
                >
                  {orders.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "150px" }} size="small">
                <InputLabel id="perPage">Per Page</InputLabel>
                <Select
                  id="perPage-select"
                  label="perPage"
                  value={filters.per_page}
                  onChange={(e) =>
                    onFilterChangeHandler("per_page", e.target.value.toString())
                  }
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                variant="contained"
                sx={{ m: 1, width: "150px" }}
                onClick={onSearchClickHandler}
              >
                Search
              </Button>
            </div>
          </div>
        </Paper>

        <main>
          <Paper style={{ padding: "20px" }}>
            <List>
              {beerList.map((beer) => (
                <ListItemButton
                  key={beer.id}
                  onClick={onBeerClick.bind(this, beer.id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${beer.name} | ${beer.brewery_type}`}
                    secondary={`${beer.country},${beer.state},${beer.city}`}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </main>

        {metadata && (
          <Paper style={{ padding: "20px", margin: "1rem 0" }}>
            <Pagination
              count={Math.ceil(
                Number(metadata.total) / Number(metadata.per_page)
              )}
              shape="rounded"
              color="primary"
              page={Number(filters.page)}
              onChange={handlePageChange}
            />
          </Paper>
        )}
      </section>
    </article>
  );
};

export default BeerList;
