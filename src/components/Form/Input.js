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
  invalids,
}) => {
  const getInitialValue = () => (defaultValue ? defaultValue : '');

  const [currentValue, setCurrentValue] = useState(getInitialValue());
  const [isValid, setValid] = useState(true);

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

  useEffect(() => {
    const inputInvalid = invalids.find(invalid => invalid[name])
    if (!!inputInvalid && inputInvalid.hasOwnProperty(name)) {
      setValid(false)
    };
  }, [invalids])

  const validate = value => {
    if (required && !value.length) {
      return false;
    }

    if (value.length < parseInt(minLength)) {
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
    handleChange({
      [name]: { value: currentValue, required: required, valid: validate(currentValue) },
    });

    if (required && !currentValue.length) {
      return setValid(false);
    }

    if (currentValue.length < parseInt(minLength)) {
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
    setValid(true);
    handleChange({
      [name]: { value: e.target.value, required: required, valid: validate(e.target.value) },
    });
  };

  const handleEnter = () => {
    validate(currentValue);
    validateState();
  };

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
        onKeyPress={e => e.key === 'Enter' && handleEnter()}
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
  invalids: PropTypes.array.isRequired,
};

Input.defaultProps = {
  required: false,
  valid: true,
};

export default Input;
