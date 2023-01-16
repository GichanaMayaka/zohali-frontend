import React from "react";

export function InputWithLabel({
                                 id,
                                 inputType = "text",
                                 onInputChange,
                                 value,
                                 placeholder,
                                 children,
                               }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input type={inputType} id={id} onChange={onInputChange} value={value} placeholder={placeholder}/>
    </>
  );
}
