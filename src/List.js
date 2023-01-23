import React from "react";
import styles from "./App.module.css";

export const List = ({ response }) => {
  return response.map((res, index) => {
    return (
      <div key={index - 1} className={styles.list}>
        <Item response={res} key={index + 1} position={index} />
      </div>
    );
  });
};

const Item = ({ response, position }) => {
  return (
    <>
      <span>{position + 1} </span>
      <span>
        <strong>{response.region}</strong>
      </span>
      <span>{response.county}</span>
      <span>
        {response.area.map((a, i) => (
          <span key={i}>{a}</span>
        ))}
      </span>
      <span>{response.places}</span>
      <span>{response.time}</span>
      <span>{response.date}</span>
    </>
  );
};
