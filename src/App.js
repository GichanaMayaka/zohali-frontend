import axios from "axios";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./App.module.css";
import { resultsReducer } from "./Reducers";
import { SearchForm } from "./SearchForm";

const API_ENDPOINT = new URL("http://127.0.0.1:8000/all");

function App() {
  const [url, setUrl] = useState(API_ENDPOINT);
  const [count, setCount] = useState(10);
  const [placesSearchTerm, setPlacesSearchTerm] = useState("");
  const [areasSearchTerm, setAreasSearchTerm] = useState("");
  const [regionsSearchTerm, setRegionsSearchTerm] = useState("");
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
    if (regionsSearchTerm) {
      tempLink.searchParams.set("region", regionsSearchTerm);
    }
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

  const handleRegionInputChange = (event) => {
    setRegionsSearchTerm(event.target.value);
    console.log(regionsSearchTerm);
  };

  const resetLink = () => {
    setRegionsSearchTerm("");
    setAreasSearchTerm("");
    setPlacesSearchTerm("");
    setUrl(API_ENDPOINT);
  };

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div className={styles.container}>
      <h2>
        <a href="https://github.com/GichanaMayaka/zohali" target="#_blank">
          Zohali
        </a>
      </h2>
      {/*TODO: Fix bug where large data dump crashes list/item component*/}
      <SearchForm
        count={count}
        resultsData={resultsData}
        region={regionsSearchTerm}
        handleRegionInputChange={handleRegionInputChange}
        handleCountInputChange={handleCountInputChange}
        handleAreaInputChange={handleAreaInputChange}
        handlePlacesInputChange={handlePlacesInputChange}
        handleSearch={handleSearch}
        placesSearchTerm={placesSearchTerm}
        areasSearchTerm={areasSearchTerm}
        resetLink={resetLink}
        // TODO: Hide full path
        url={url.href}
      />
    </div>
  );
}

export default App;
