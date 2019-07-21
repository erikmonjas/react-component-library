import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback
} from "react";
import PropTypes from "prop-types";
import "./select.scss";
import { FormContext } from "../../../hooks/formHook";

const Select = ({
  options,
  defaultValue = "",
  name,
  label,
  errorMessage,
  disabled,
  className,
  required
}) => {
  const wrapper = useRef(null);
  const { handleChange, invalids } = useContext(FormContext);

  const defaultValueIndex = options.findIndex(
    option => option.value === defaultValue
  );
  const initialValue = defaultValueIndex >= 0 ? defaultValue : "";

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
      [name]: {
        value: value,
        required,
        valid: validate(value)
      }
    });
  };

  const handleClickOutside = useCallback(
    e => {
      if (wrapper.current.contains(e.target)) {
        wrapper.current.focus();
        setActive(true);
      } else {
        wrapper.current.blur();
        setActive(false);
      }
      setShowing(false);
      window.removeEventListener("click", handleClickOutside);
    },
    [wrapper]
  );

  useEffect(() => {
    if (!disabled) {
      setOptionIndex(defaultValue);

      const initialState = {
        [name]: {
          value: initialValue,
          required,
          valid: validate(initialValue)
        }
      };
      handleChange(initialState);
    }
  }, []);

  useEffect(() => {
    const selectInvalid = invalids.find(invalid => invalid[name]);
    if (!!selectInvalid && selectInvalid.hasOwnProperty(name)) {
      setValid(false);
    }
  }, [invalids, name]);

  useEffect(() => {
    if (!!optionsShowing) {
      window.addEventListener("click", handleClickOutside);
    }
  }, [optionsShowing, handleClickOutside]);

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
    if (disabled) {
      return true;
    }

    if (!required) {
      return true;
    }

    if (!!options.find(option => option.value === value)) {
      return true;
    } else {
      return false;
    }
  };

  const validateState = incomingValue => {
    if (disabled) {
      return setValid(true);
    }

    if (!required) {
      return true;
    }

    if (!!options.find(option => option.value === incomingValue)) {
      return setValid(true);
    } else {
      return setValid(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      setShowing(!optionsShowing);
    }
    if (e.key === "Tab") {
      setShowing(false);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      let newPosition = 0;
      if (currentValuePosition === options.length - 1) {
        newPosition = 0;
      } else {
        newPosition = currentValuePosition + 1;
      }
      setPosition(newPosition);
      changeActions(options[newPosition].value);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
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
    window.addEventListener("click", handleClickInside, false);
  };

  const handleClickInside = () => {
    window.removeEventListener("click", handleClickInside, false);
    setActive(true);
    setShowing(true);
  };

  return (
    <div
      ref={wrapper}
      className={`select ${!valid ? "select--has-error" : ""} ${
        isActive ? "select--active" : ""
      } ${value.length > 0 ? "select--has-content" : ""} ${
        disabled ? "select--disabled" : ""
      } ${className ? className : ""}`}
      tabIndex={disabled ? "" : "0"}
      onFocus={() => {
        setActive(true);
      }}
      onBlur={() => {
        setActive(false);
        changeActions(value);
      }}
      onKeyDown={e => handleKeyPress(e)}
    >
      <p
        className="select__label"
        onClick={disabled ? null : handleOptions}
        htmlFor={name + "Label"}
      >
        {label}
      </p>
      <div
        className="select__box"
        onClick={disabled ? null : handleOptions}
        role="listbox"
        id={name}
        aria-labelledby={name + "Label"}
      >
        <p>{options[value] ? options[value].text : ""}</p>
      </div>
      {optionsShowing && (
        <div
          className={`select__options ${
            optionsShowing ? "select__options--showing" : ""
          }`}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              className={`select__option ${
                index === currentValuePosition ? "select__option--active" : ""
              }`}
              role="option"
              aria-selected={index === currentValuePosition ? "true" : "false"}
              onClick={e => handleClick(e, option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
      {!valid && !optionsShowing && (
        <p className="select__error-message">{errorMessage}</p>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string
};

Select.defaultProps = {
  label: "",
  errorMessage: "",
  disabled: false,
  required: false,
  className: ""
};

export default Select;
