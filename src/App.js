import axios from "axios";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./App.module.css";
import { List } from "./List";
import { resultsReducer } from "./Reducers";
import { SearchForm } from "./SearchForm";

const API_ENDPOINT = new URL("http://127.0.0.1:8000/all");


function App() {
  const [url, setUrl] = useState(API_ENDPOINT);
  const [count, setCount] = useState(10);
  const [placesSearchTerm, setPlacesSearchTerm] = useState("");
  const [areasSearchTerm, setAreasSearchTerm] = useState("");
  const [resultsData, dispatcher] = useReducer(resultsReducer, {
    data: [],
    isError: false,
    isFetched: false,
    isLoading: false,
  });

  const handleFetchData = useCallback(async () => {
    try {
      dispatcher({ type: "DATA_FETCH_INIT" });

      const response = await axios.get(url.href);

      dispatcher({
        type: "DATA_FETCH_SUCCESS",
        payload: response.data.response,
      });
    } catch (error) {
      dispatcher({ type: "DATA_FETCH_FAILURE" });
    }
  }, [url.href]);

  const handleSearch = (event) => {
    event.preventDefault();

    const tempLink = new URL(url);

    if (count) {
      tempLink.searchParams.set("count", count.toString());
    }
    if (placesSearchTerm) {
      tempLink.searchParams.set("place", placesSearchTerm);
    }
    if (areasSearchTerm) {
      tempLink.searchParams.set("area", areasSearchTerm);
    }
    console.log(tempLink.href);
    setUrl(tempLink);
  };

  const handlePlacesInputChange = (event) => {
    setPlacesSearchTerm(event.target.value);
  };

  const handleAreaInputChange = (event) => {
    setAreasSearchTerm(event.target.value);
  };

  const handleCountInputChange = (event) => {
    setCount(event.target.value);
  };

  useEffect(() => {
    handleFetchData();
  }, [url.href, handleFetchData]);

  return (
    <div className={styles.container}>
      <h2>Zohali</h2>
      {/*TODO: Fix bug where link search params persist over multiple fetches*/}
      <SearchForm count={count}
                  resultsData={resultsData}
                  handleCountInputChange={handleCountInputChange}
                  handleAreaInputChange={handleAreaInputChange}
                  handlePlacesInputChange={handlePlacesInputChange}
                  handleSearch={handleSearch}
                  placesSearchTerm={placesSearchTerm}
                  areasSearchTerm={areasSearchTerm}
      />
    </div>
  );
}

export default App;
