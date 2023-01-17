import React from "react";
import { InputWithLabel } from "./Input";
import { List } from "./List";

export const SearchForm = ({
                             count,
                             resultsData,
                             region,
                             handleSearch,
                             handleAreaInputChange,
                             areasSearchTerm,
                             handlePlacesInputChange,
                             placesSearchTerm,
                             handleCountInputChange,
                             handleRegionInputChange,
                             resetLink,
                             url,
                           }) => {
  return (
    <form onSubmit={handleSearch}>
      <div>
        &nbsp;
        <InputWithLabel
          id="region-search"
          inputType="text"
          onInputChange={handleRegionInputChange}
          value={region}
          placeholder="Search in Regions"
        />
        &nbsp;
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
        {/*TODO: Disable after 100 input value limit*/}
        <InputWithLabel
          id="count"
          inputType="number"
          onInputChange={handleCountInputChange}
          value={count}
          placeholder="Set Count"
        />
        {/*disabled={!(placesSearchTerm && areasSearchTerm)}*/}
        <br/>
        <button type="submit">Search</button>
        <button type="button" onClick={resetLink}>Reset</button>
        <p style={{ fontWeight: "bold"}}>{url}</p>
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