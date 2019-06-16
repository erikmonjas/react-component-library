import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './input.scss';

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
  type,
  disabled,
}) => {
  const getInitialValue = () => (defaultValue ? defaultValue : '');

  const [currentValue, setCurrentValue] = useState(getInitialValue());
  const [isValid, setValid] = useState(true);
  const [isActive, setActive] = useState(false);

  const numberRegEx = /^\d*\.?(?:\d{1,2})?$/;

  const inputActions = value => {
    setCurrentValue(value);
    setValid(true);
    handleChange({
      [name]: { value: value, required: required, valid: validate(value) },
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

  useEffect(() => {
    const inputInvalid = invalids.find(invalid => invalid[name]);
    if (!!inputInvalid && inputInvalid.hasOwnProperty(name)) {
      setValid(false);
    }
  }, [invalids]);

  const validate = value => {
    if (disabled) {
      return true;
    }

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
      [name]: {
        value: currentValue,
        required: required,
        valid: validate(currentValue),
      },
    });

    if (disabled) {
      return setValid(true);
    }

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
    if (type === 'number') {
      if (e.target.value === '' || numberRegEx.test(e.target.value)) {
        inputActions(e.target.value);
      }
    } else {
      inputActions(e.target.value);
    }
  };

  const handleEnter = () => {
    validate(currentValue);
    validateState();
  };

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    validateState();
    setActive(false);
  };

  return (
    <div
      className={`input ${isActive ? 'input--active' : ''}
        ${currentValue.length > 0 ? 'input--has-content' : ''}
        ${!isValid ? 'input--has-error' : ''} ${disabled ? 'input--disabled' : ''}`}>
      {label && (
        <label className={`input__label`} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className='input__input'
        type='text'
        disabled={disabled}
        id={name}
        name={name}
        value={currentValue}
        onChange={handleInputChange}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyPress={e => e.key === 'Enter' && handleEnter()}
      />
      {!isValid && errorMessage && <span className='input__error-message'>{errorMessage}</span>}
    </div>
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
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  valid: true,
  type: 'text',
  disabled: false,
};

export default Input;
