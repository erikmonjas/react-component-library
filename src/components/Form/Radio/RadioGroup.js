import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './radio.scss';
import { FormContext } from '../../../hooks/formHook';

const RadioGroup = ({ radioList, name, defaultRadio = radioList[0].value }) => {
  const { handleChange } = useContext(FormContext);

  const [currentRadio, setCurrentRadio] = useState(defaultRadio);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const initialState = {
      [name]: {
        value: defaultRadio,
        required: false,
        valid: true,
      },
    };

    handleChange(initialState);
  }, []);

  const handleClick = value => {
    setCurrentRadio(value);
    handleChange({
      [name]: {
        value: value,
        required: false,
        valid: true,
      },
    });
  };

  const handleKeyPress = e => {
    const currentRadioIndex = radioList.findIndex(radio => radio.value === currentRadio);

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      currentRadioIndex === 0
        ? handleClick(radioList[radioList.length - 1].value)
        : handleClick(radioList[currentRadioIndex - 1].value);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      currentRadioIndex === radioList.length - 1
        ? handleClick(radioList[0].value)
        : handleClick(radioList[currentRadioIndex + 1].value);
    }
  };

  return (
    <div
      role='radiogroup'
      className='radio-group'
      tabIndex='0'
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onKeyDown={e => handleKeyPress(e)}>
      {radioList.map(({ value, text }) => (
        <div
          className={`radio ${currentRadio === value ? 'radio--selected' : ''} ${
            isActive && currentRadio === value ? 'radio--active' : ''
          }`}
          key={value}>
          <input
            type='radio'
            id={value}
            name={value}
            className='radio__input'
            tabIndex='-1'
            defaultChecked={currentRadio === value ? 'checked' : ''}
          />
          <label htmlFor='radio' className='radio__label' onClick={() => handleClick(value)}>
            {text}
            <span className='radio__circle' />
          </label>
        </div>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  radioList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  defaultRadio: PropTypes.string,
};

export default RadioGroup;
