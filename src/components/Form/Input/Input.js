import React, { useEffect, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import './input.scss';
import { FormContext } from '../../../hooks/formHook';

const Input = ({
  name,
  label,
  required,
  defaultValue,
  maxLength,
  minLength,
  errorMessage,
  validationFunction,
  type,
  disabled,
}) => {
  const { handleChange, invalids } = useContext(FormContext);

  const getInitialValue = useCallback(() => (defaultValue ? defaultValue : ''), [defaultValue]);

  const [currentValue, setCurrentValue] = useState(getInitialValue());
  const [isValid, setValid] = useState(true);
  const [isActive, setActive] = useState(false);

  const numberRegEx = /^\d*\.?(?:\d{1,2})?$/;

  const validate = useCallback(
    value => {
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

      if (required || value.length > 0) {
        return validationFunction(value);
      }

      return true;
    },
    [disabled, required, minLength, validationFunction],
  );

  const inputActions = value => {
    setCurrentValue(value);
    setValid(true);
    handleChange({
      [name]: { value: value, required: required, valid: validate(value) },
    });
  };

  useEffect(() => {
    if (!disabled) {
      const initialState = {
        [name]: {
          value: getInitialValue(),
          required: required,
          valid: validate(getInitialValue()),
        },
      };

      handleChange(initialState);
    }
  }, []);

  useEffect(() => {
    const inputInvalid = invalids.find(invalid => invalid[name]);
    if (!!inputInvalid && inputInvalid.hasOwnProperty(name)) {
      setValid(false);
    }
  }, [invalids, name]);

  const validateState = value => {
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

    if (required || value.length > 0) {
      if (!validationFunction(value)) {
        return setValid(false);
      }
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
    validateState(currentValue);
  };

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    validateState(currentValue);
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
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  errorMessage: PropTypes.string,
  validationFunction: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  validationFunction: () => true,
  type: 'text',
  disabled: false,
};

export default Input;
