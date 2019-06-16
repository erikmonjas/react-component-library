import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './select.scss';

const Select = ({
  options,
  defaultValue = '',
  handleChange,
  name,
  invalids,
  label,
  errorMessage,
}) => {
  const defaultValueIndex = options.findIndex(option => option.value === defaultValue);
  const initialValue = defaultValueIndex >= 0 ? defaultValue : '';

  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState(true);
  const [optionsShowing, setShowing] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentValuePosition, setPosition] = useState(null);

  const changeActions = value => {
    setValue(value);
    setOptionIndex(value);
    validateState(value);
    handleChange({
      [name]: { value: value, valid: validate(value) },
    });
  };

  useEffect(() => {
    setOptionIndex(defaultValue);

    const initialState = {
      [name]: {
        value: initialValue,
        valid: validate(initialValue),
      },
    };
    handleChange(initialState);
  }, []);

  useEffect(() => {
    const selectInvalid = invalids.find(invalid => invalid[name]);
    if (!!selectInvalid && selectInvalid.hasOwnProperty(name)) {
      setValid(false);
    }
  }, [invalids]);

  useEffect(() => {
    if (!!optionsShowing) {
      window.addEventListener('click', handleClickOutside);
    }
  }, [optionsShowing]);

  const setOptionIndex = value => {
    const optionIndex = options.findIndex(option => option.value === value);

    setPosition(optionIndex);
  };

  const handleClick = (e, option) => {
    e.preventDefault();
    changeActions(option.value);
    setShowing(false);
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

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setShowing(!optionsShowing);
    }
    if (e.key === 'Tab') {
      setShowing(false);
    }
    if (e.key === 'ArrowDown') {
      let newPosition = 0;
      if (currentValuePosition === options.length - 1) {
        newPosition = 0;
      } else {
        newPosition = currentValuePosition + 1;
      }
      setPosition(newPosition);
      changeActions(options[newPosition].value);
    }

    if (e.key === 'ArrowUp') {
      let newPosition = 0;
      if (currentValuePosition === 0) {
        newPosition = options.length - 1;
      } else if (currentValuePosition === -1) {
        newPosition = options.length - 1;
      } else {
        newPosition = currentValuePosition - 1;
      }
      setPosition(newPosition);
      changeActions(options[newPosition].value);
    }
  };

  const handleOptions = () => {
    window.addEventListener('click', handleClickInside, false);
  };

  const handleClickInside = () => {
    window.removeEventListener('click', handleClickInside, false);
    setShowing(true);
    setActive(true);
  };

  const handleClickOutside = e => {
    setShowing(false);
    console.log('click out');
    if (e.target.classList[0] === 'select__option') {
      // document.querySelector('.select').focus();
    } else {
      setActive(false);
      return window.removeEventListener('click', handleClickOutside);
    }
  };

  return (
    <div
      className={`select ${!valid ? 'select--has-error' : ''} ${isActive ? 'select--active' : ''} ${
        value.length > 0 ? 'select--has-content' : ''
      }`}
      tabIndex='0'
      onFocus={() => {
        setActive(true);
      }}
      onBlur={() => {
        setActive(false);
        changeActions(value);
      }}
      onKeyDown={e => handleKeyPress(e)}>
      <p className='select__label' onClick={handleOptions}>
        {label}
      </p>
      <div className='select__box' onClick={handleOptions}>
        <p>{options[value] ? options[value].text : ''}</p>
      </div>
      <div className={`select__options ${optionsShowing ? 'select__options--showing' : ''}`}>
        {optionsShowing &&
          options.map((option, index) => (
            <button
              key={option.value}
              className={`select__option ${
                index === currentValuePosition ? 'select__option--active' : ''
              }`}
              onClick={e => handleClick(e, option)}>
              {option.text}
            </button>
          ))}
      </div>
      {!valid && <p className='select__error-message'>{errorMessage}</p>}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  invalids: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
};

Select.defaultProps = {
  label: '',
  errorMessage: '',
};

export default Select;
