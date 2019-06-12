import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Input = ({
  handleChange,
  name,
  label,
  required,
  defaultValue,
  maxLength,
  minLength,
  errorMessage,
  valid,
}) => {
  const getInitialValue = () => (defaultValue ? defaultValue : '');

  const [currentValue, setCurrentValue] = useState(getInitialValue());
  const [isValid, setValid] = useState(true);

  const validate = value => {
    if (required && !value.length) {
      return false;
    }

    if (value.length < minLength) {
      if (required) {
        return false;
      } else {
        if (value.length > 0) {
          return false;
        }
      }
    }

    if (!valid) {
      return false;
    }

    return true;
  };

  const validateState = () => {
    if (required && !currentValue.length) {
      return setValid(false);
    }

    if (currentValue.length < minLength) {
      if (required) {
        return setValid(false);
      } else {
        if (currentValue.length > 0) {
          return setValid(false);
        }
      }
    }

    if (!valid) {
      return setValid(false);
    }

    return setValid(true);
  };

  const handleInputChange = e => {
    setCurrentValue(e.target.value);
    handleChange({
      [name]: { value: e.target.value, required: required, valid: validate(e.target.value) },
    });
  };

  useEffect(() => {
    const initialState = {
      [name]: {
        value: getInitialValue(),
        required: required,
        valid: validate(getInitialValue()),
      },
    };

    handleChange(initialState);
  }, []);

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type='text'
        id={name}
        name={name}
        value={currentValue}
        onChange={handleInputChange}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        onBlur={validateState}
        onKeyUp={e => e.key === 'Enter' && validateState()}
      />
      {!isValid && errorMessage && <span>{errorMessage}</span>}
    </>
  );
};

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  errorMessage: PropTypes.string,
  valid: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  valid: true,
};

export default Input;
