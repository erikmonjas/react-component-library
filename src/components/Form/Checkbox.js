import React from "react";

const Checkbox = ({
  handleChange,
  name,
  label,
  defaultValue,
  errorMessage,
  valid,
  invalids,
  disabled
}) => {
  return (
    <div className="checkbox">
      <input type="checkbox" id={name} name={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
