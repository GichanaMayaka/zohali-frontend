import React from "react";

export const List = ({ response }) => {
  return (
    response.map((res, index) => {
      return (
        <div key={index - 1}>
          <Item response={res} key={index + 1}/>
        </div>
      );
    })
  );
};

const Item = ({ response }) => {
  return (
    <div style={{ margin: "20px" }}>
      <span><strong>{response.region}</strong></span>
      <span>{response.county}</span>
      <span>
        {
          response.area.map((a, i) => <span key={i}>{a}</span>)
        }
      </span>
      <span>{response.places}</span>
      <span>{response.time}</span>
      <span>{response.date}</span>
    </div>
  );
};
