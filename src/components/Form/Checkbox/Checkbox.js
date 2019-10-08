import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './checkbox.scss'
import { FormContext } from '../../../hooks/formHook'

const Checkbox = ({
  name,
  label,
  defaultChecked,
  required,
  disabled,
  errorMessage,
  className,
}) => {
  const { handleChange, invalids } = useContext(FormContext)

  const [checked, setChecked] = useState(defaultChecked)
  const [isValid, setValid] = useState(true)
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    if (!disabled) {
      const initialState = {
        [name]: {
          value: defaultChecked,
          required: required,
          valid: validate(defaultChecked),
        },
      }

      handleChange(initialState)
    }
  }, [])

  useEffect(() => {
    const checkboxInvalid = invalids.find(invalid => invalid[name])
    if (!!checkboxInvalid && checkboxInvalid.hasOwnProperty(name)) {
      setValid(false)
    }
  }, [invalids, name])

  const handleCheckboxChange = () => {
    if (!disabled) {
      setChecked(!checked)
      validateState(!checked)
      handleChange({
        [name]: {
          value: checked,
          required: required,
          valid: validate(!checked),
        },
      })
    }
  }

  const validate = checked => {
    if (disabled) {
      return true
    }

    if (required && !checked) {
      return false
    }

    return true
  }

  const validateState = checked => {
    if (disabled) {
      return setValid(true)
    }

    if (required && !checked) {
      return setValid(false)
    }

    return setValid(true)
  }

  const handleKeyPress = e => {
    e.preventDefault()
    if (e.key === 'Enter') {
      handleCheckboxChange()
    }
  }

  return (
    <div
      className={`checkbox ${
        !isValid && !isActive ? 'checkbox--has-error' : ''
      } ${isActive ? 'checkbox--active' : ''} ${
        checked ? 'checkbox--checked' : ''
      } ${disabled ? 'checkbox--disabled' : ''} ${className || ''}`}
    >
      <input
        type='checkbox'
        id={name}
        name={name}
        defaultChecked={checked ? 'checked' : ''}
        disabled={disabled}
        className='checkbox__input'
        tabIndex='-1'
      />
      <label
        htmlFor={name}
        className='checkbox__label'
        onClick={handleCheckboxChange}
        tabIndex={disabled ? '-1' : '0'}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onKeyPress={handleKeyPress}
      >
        {label}
        <span className='checkbox__square' />
      </label>
      {!isValid && errorMessage && (
        <p className='checkbox__error-message'>{errorMessage}</p>
      )}
    </div>
  )
}

export default Checkbox

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.bool,
  className: PropTypes.string,
}

Checkbox.defaultProps = {
  defaultChecked: false,
  required: false,
  disabled: false,
  errorMessage: '',
  className: '',
}
