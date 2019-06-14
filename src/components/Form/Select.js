import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./select.scss";

const Select = ({
  initText,
  options,
  defaultValue = "",
  handleChange,
  name,
  invalids
}) => {
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const initialState = {
      [name]: {
        value: defaultValue,
        valid: validate(defaultValue)
      }
    };
    handleChange(initialState);
  }, []);

  useEffect(() => {
    const selectInvalid = invalids.find(invalid => invalid[name]);
    if (!!selectInvalid && selectInvalid.hasOwnProperty(name)) {
      setValid(false);
    }
  }, [invalids]);

  const handleClick = (e, option) => {
    e.preventDefault();
    setValue(option.value);
    validateState(option.value);
    handleChange({
      [name]: { value: option.value, valid: validate(option.value) }
    });
  };

  const validate = value => {
    if (!!options.find(option => option.value === value)) {
      return true;
    } else {
      return false;
    }
  };

  const validateState = incomingValue => {
    if (!!options.find(option => option.value === incomingValue)) {
      return setValid(true);
    } else {
      return setValid(false);
    }
  };

  return (
    <div className={`select ${!valid && "select--has-error"}`}>
      <div className="select__box">
        <p>{value.length > 0 ? value : initText}</p>
      </div>
      <div className="select__options">
        {options.map(option => (
          <button
            key={option.value}
            className="select__option"
            onClick={e => handleClick(e, option)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

Select.propTypes = {
  initText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  invalids: PropTypes.array.isRequired
};

Select.defaultProps = {
  initText: "Choose an option"
};

export default Select;
