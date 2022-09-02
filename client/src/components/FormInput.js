import React from "react";

const FormInput = ({ type, name, labelText, value, onChange }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="form-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
