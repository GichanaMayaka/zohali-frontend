import React from "react";
import { InputWithLabel } from "./Input";
import { List } from "./List";

export const SearchForm = ({ count, resultsData, handleSearch, handleAreaInputChange, areasSearchTerm, handlePlacesInputChange, placesSearchTerm, handleCountInputChange }) => {
  return (
    <form onSubmit={handleSearch}>
      <div>
        <InputWithLabel
          id="area-search"
          inputType="text"
          onInputChange={handleAreaInputChange}
          value={areasSearchTerm}
          placeholder="Search in Areas"
        />
        &nbsp;
        <InputWithLabel
          id="places-search"
          inputType="text"
          onInputChange={handlePlacesInputChange}
          value={placesSearchTerm}
          placeholder="Search in Places"
        />
        &nbsp;
        <InputWithLabel
          id="count"
          inputType="number"
          onInputChange={handleCountInputChange}
          value={count}
          placeholder="Set Count"
        />
        &nbsp;
        {/*disabled={!(placesSearchTerm && areasSearchTerm)}*/}
        <button type="submit">Search</button>
        {
          placesSearchTerm ? (
            <p>
              Searching for <strong>{placesSearchTerm}</strong>
            </p>
          ) : null}
        {
          resultsData.isError ? <p>Something went terribly wrong!</p> :
            resultsData.isLoading ? <p>Loading...</p> :
              resultsData.isFetched ? <List response={resultsData.data} key={resultsData.response}/> :
                <p>No data fetched</p>
        }
      </div>
    </form>
  );
};