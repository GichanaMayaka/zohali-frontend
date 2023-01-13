import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";

const API_ENDPOINT = "http://127.0.0.1:8000/all";

const Item = ({ response }) => {
  return (
    response.map((res, index) => {
      return (
        <div key={index} style={{ margin: "20px" }}>
          <span><strong>{res.region}</strong></span>
          <span>{res.county}</span>
          <span>{
            res.area.map((a, i) => <span key={i}>{a}</span>)
          }</span>
          <span>{res.place}</span>
          <span>{res.time}</span>
          <span>{res.date}</span>
        </div>
      );
    }));
};

function InputWithLabelAndButton({ id, inputType, buttonType, onUserInput, onInputChange, value, children }) {
  return (
    <>
      <div>
        <label htmlFor={id}>{children}</label>
        <input type={inputType} id={id} onChange={onInputChange} value={value}/>
        <button type={buttonType} onClick={onUserInput} disabled={!value}>Search</button>
      </div>
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const link = new URL(API_ENDPOINT);
  const [url, setUrl] = useState(link);

  const handleFetchData = useCallback(async () => {
    try {
      const response = await axios.get(url.href);
      setData(response.data);
      setIsFetched(true);
    } catch (error) {
      setIsFetched(false);
    }
  }, [url.href]);

  const handleSearchPlaces = (event) => {
    event.preventDefault();
    let tempLink = new URL(url);
    tempLink.searchParams.set("place", searchTerm);
    setUrl(tempLink);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    handleFetchData();
  }, [url, handleFetchData]);

  return (
    <div className={styles.container}>
      <h2>Zohali</h2>
      <InputWithLabelAndButton id="search" inputType="text" buttonType="button"
                               onUserInput={handleSearchPlaces}
                               onInputChange={handleInputChange} value={searchTerm}>Search</InputWithLabelAndButton>
      {searchTerm ? (
        <p>
          Searching for <strong>{searchTerm}</strong>
        </p>
      ) : null}
      {
        isFetched ? <Item response={data.response}/> : <p>No data fetched!</p>
      }
    </div>
  );
}

export default App;
