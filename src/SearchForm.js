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
  handleCountyInputChange,
  handleRegionInputChange,
  resetLink,
  countySearchTerm,
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
          id="county-search"
          inputType="text"
          onInputChange={handleCountyInputChange}
          value={countySearchTerm}
          placeholder="Search in County"
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
        <br />
        <button type="submit">Search</button>
        <button type="button" onClick={resetLink}>
          Reset
        </button>
        <p style={{ fontWeight: "bold" }}>{url}</p>
        {placesSearchTerm ? (
          <p>
            Searching for <strong>{placesSearchTerm}</strong> in places
          </p>
        ) : areasSearchTerm ? (
          <p>
            Searching for <strong>{areasSearchTerm}</strong> in areas
          </p>
        ) : region ? (
          <p>
            Searching for <strong>{region}</strong> in regions
          </p>
        ) : countySearchTerm ? (
          <p>
            Searching for <strong>{countySearchTerm}</strong> in counties
          </p>
        ) : null}
        {resultsData.isError ? (
          <p>Something went terribly wrong! {resultsData.errorCode}</p>
        ) : resultsData.isLoading ? (
          <p>Loading...</p>
        ) : resultsData.isFetched ? (
          <List response={resultsData.data} key={resultsData.response} />
        ) : (
          <p>No data fetched</p>
        )}
      </div>
    </form>
  );
};
