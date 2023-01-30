import axios from "axios";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./App.module.css";
import { resultsReducer } from "./Reducers";
import { SearchForm } from "./SearchForm";

const API_ENDPOINT = new URL("http://127.0.0.1:8000/prev");

export default function Prev() {
  const [url, setUrl] = useState(API_ENDPOINT);
  const [count, setCount] = useState(10);
  const [placesSearchTerm, setPlacesSearchTerm] = useState("");
  const [areasSearchTerm, setAreasSearchTerm] = useState("");
  const [countySearchTerm, setCountySearchTerm] = useState("");
  const [regionSearchTerm, setRegionSearchTerm] = useState("");
  const [resultsData, dispatcher] = useReducer(resultsReducer, {
    data: [],
    isError: false,
    isFetched: false,
    isLoading: false,
    errorCode: null,
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
      if (error.response) {
        dispatcher({
          errorCode: error.response.status,
          type: "DATA_FETCH_FAILURE",
        });
      }
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
    if (countySearchTerm) {
      tempLink.searchParams.set("county", countySearchTerm);
    }
    if (regionSearchTerm) {
      tempLink.searchParams.set("region", regionSearchTerm);
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
    setRegionSearchTerm(event.target.value);
  };

  const handleCountyInputChange = (event) => {
    setCountySearchTerm(event.target.value);
  };

  const resetLink = () => {
    setCountySearchTerm("");
    setAreasSearchTerm("");
    setPlacesSearchTerm("");
    setRegionSearchTerm("");
    setUrl(API_ENDPOINT);
  };

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div className={styles.container}>
      <h2>
        <a
          href="https://github.com/GichanaMayaka/zohali"
          target="_blank"
          rel="noreferrer"
        >
          Zohali
        </a>
      </h2>
      <SearchForm
        count={count}
        resultsData={resultsData}
        region={regionSearchTerm}
        countySearchTerm={countySearchTerm}
        handleCountyInputChange={handleCountyInputChange}
        handleCountInputChange={handleCountInputChange}
        handleAreaInputChange={handleAreaInputChange}
        handlePlacesInputChange={handlePlacesInputChange}
        handleRegionInputChange={handleRegionInputChange}
        handleSearch={handleSearch}
        placesSearchTerm={placesSearchTerm}
        areasSearchTerm={areasSearchTerm}
        resetLink={resetLink}
        // TODO: only display searchParams
        url={url.href}
      />
    </div>
  );
}
