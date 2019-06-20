import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./checkbox.scss";
import { FormContext } from "../../hooks/formHook";

const Checkbox = ({ name, label, defaultChecked, required, disabled }) => {
  const { handleChange, invalids } = useContext(FormContext);

  const [checked, setChecked] = useState(defaultChecked);
  const [isValid, setValid] = useState(true);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const initialState = {
      [name]: {
        value: defaultChecked,
        required: required,
        valid: validate(defaultChecked)
      }
    };

    handleChange(initialState);
  }, []);

  useEffect(() => {
    const checkboxInvalid = invalids.find(invalid => invalid[name]);
    if (!!checkboxInvalid && checkboxInvalid.hasOwnProperty(name)) {
      setValid(false);
    }
  }, [invalids]);

  const handleCheckboxChange = () => {
    handleChange({
      [name]: {
        value: checked,
        required: required,
        valid: validate(!checked)
      }
    });
    validateState(!checked);
    setChecked(!checked);
  };

  const validate = checked => {
    if (disabled) {
      return true;
    }

    if (required && !checked) {
      return false;
    }

    return true;
  };

  const validateState = checked => {
    if (disabled) {
      return setValid(true);
    }

    if (required && !checked) {
      return setValid(false);
    }

    return setValid(true);
  };

  return (
    <div
      className={`checkbox ${!isValid ? "checkbox--has-error" : ""} ${
        isActive ? "checkbox--active" : ""
      }`}
    >
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={handleCheckboxChange}
        checked={checked}
        disabled={disabled}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="checkbox__input"
      />
      <label htmlFor={name} className="checkbox__label">
        {label}
        <span
          className={`checkbox__square ${
            checked ? "checkbox__square--checked" : ""
          }`}
        />
      </label>
    </div>
  );
};

export default Checkbox;

Checkbox.prototypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

Checkbox.defaultProps = {
  label: "",
  defaultChecked: false,
  required: false,
  disabled: false
};
