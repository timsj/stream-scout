import React from "react";

const FormInputSelect = ({ name, value, options, handleChange, labelText }) => {
  return (
    <>
      <label htmlFor={name}>{labelText || name}</label>
      <select
        name={name}
        value={value}
        className="form-select"
        onChange={handleChange}
      >
        {options.map((option, i) => {
          return (
            <option value={option} key={i}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default FormInputSelect;
