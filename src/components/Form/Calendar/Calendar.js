import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import './calendar.scss';
import { FormContext } from '../../../hooks/formHook';
import { formatTime, getYearMonthDate } from '../../../utils/date'

const Calendar = ({ name, label, todaySelected, format, defaultValue }) => {
  const { handleChange, invalids } = useContext(FormContext);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getInitialDay = () => {
    if (todaySelected) {
      return { time: todayTime, formattedDate: formatTime(format, todayTime) }
    } else if (!!defaultValue) {
      const day = getYearMonthDate(format, defaultValue).day
      const month = getYearMonthDate(format, defaultValue).month
      const year = getYearMonthDate(format, defaultValue).year

      return { time: new Date(year, month, day).getTime(), formattedDate: defaultValue }
    } else {
      return { time: null, formattedDate: '' }
    }
  }

  const newDate = new Date();

  const wrapper = useRef(null);

  const currentMonth = newDate.getMonth();
  const currentYear = newDate.getFullYear();
  const currentDay = newDate.getDate();
  const todayTime = new Date(currentYear, currentMonth, currentDay).getTime();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState(getInitialDay())
  const [isActive, setActive] = useState(false);
  const [datepickerShowing, setDatepickerShowing] = useState(false);
  const [datepickerPostion, setDatepickerPosition] = useState('bottom');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isValid, setValid] = useState(true);

  const handleClickOutside = useCallback(
    e => {
      if (wrapper.current.contains(e.target)) {
        if (
          e.target.classList.length > 0 &&
          (e.target.classList[0].includes('calendar__label') ||
            e.target.classList[0].includes('calendar__input'))
        ) {
          setDatepickerShowing(false);
          setActive(true);
        }
      } else {
        setDatepickerShowing(false);
        setActive(false);
      }

      window.removeEventListener('click', handleClickOutside);
    },
    [wrapper],
  );

  useEffect(() => {
    if (!!datepickerShowing) {
      window.addEventListener('click', handleClickOutside);
    }
  }, [datepickerShowing, handleClickOutside]);

  const getDaysInMonth = (month, year) => {
    const initialDate = new Date(year, month, 1);
    const initialDatePositon = initialDate.getDay();
    let initialDateNumber = 0;
    const monthDays = new Date(year, month + 1, 0).getDate();
    const daysUntilEndingSunday =
      new Date(year, month, monthDays).getDay() === 0
        ? 0
        : 7 - new Date(year, month, monthDays).getDay();
    const endingDateNumber = monthDays + daysUntilEndingSunday;

    if (initialDatePositon > 1) {
      initialDateNumber = -(initialDatePositon - 2);
    } else if (initialDatePositon === 0) {
      initialDateNumber = -5;
    } else {
      initialDateNumber = 1;
    }

    let days = [];

    while (initialDateNumber <= endingDateNumber) {
      const dateBase = new Date(year, month, initialDateNumber);
      days.push({
        dayDate: dateBase.getDate(),
        dayMonth: dateBase.getMonth(),
        dayYear: dateBase.getFullYear(),
        dayTime: dateBase.getTime(),
        isMonthDay: initialDateNumber >= 1 && initialDateNumber <= monthDays,
      });

      initialDateNumber = initialDateNumber + 1;
    }
    return days;
  };

  const [selectedMonthDays, setMonthDays] = useState(getDaysInMonth(selectedMonth, selectedYear));

  const getScrollLeft = () => {
    return document.body.offsetHeight - window.pageYOffset - window.innerHeight;
  };

  const getVisibleDistanceToBottomLeft = () => {
    return window.innerHeight - document.getElementById(name).getBoundingClientRect().y;
  };

  const getDistanceToTopLeft = () => {
    return window.pageYOffset + document.getElementById(name).getBoundingClientRect().y;
  };

  const toggleDatePicker = () => {
    setActive(!datepickerShowing)

    if (getScrollLeft() + getVisibleDistanceToBottomLeft() > 325) {
      setDatepickerPosition('bottom');
    } else if (getDistanceToTopLeft() < 318) {
      setDatepickerPosition('bottom');
    } else {
      setDatepickerPosition('top');
    }

    setDatepickerShowing(!datepickerShowing);
  };

  const prevMonth = () => {
    let newMonth, newYear;
    if (selectedMonth > 0) {
      newMonth = selectedMonth - 1;
      newYear = selectedYear;
      setSelectedMonth(selectedMonth - 1);
    } else {
      newMonth = 11;
      newYear = selectedYear - 1;
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    }

    setMonthDays(getDaysInMonth(newMonth, newYear));
  };

  const nextMonth = () => {
    let newMonth, newYear;
    if (selectedMonth < 11) {
      newMonth = selectedMonth + 1;
      newYear = selectedYear;
      setSelectedMonth(selectedMonth + 1);
    } else {
      newMonth = 0;
      newYear = selectedYear + 1;
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    }

    setMonthDays(getDaysInMonth(newMonth, newYear));
  };

  const handleDayClick = ({ dayTime }) => {
    setErrorMessage('');
    setHasError(false);
    setSelectedDay({ time: dayTime, formattedDate: formatTime(format, dayTime) });
    setDatepickerShowing(false);
  };

  const handleInputChange = e => {
    setErrorMessage('');
    setHasError(false);
    setSelectedDay({ time: '', formattedDate: e.target.value });
  };

  const handleBlur = () => {
    setActive(false);

    const inputYear = selectedDay.formattedDate.substring(6, 10);

    const day = getYearMonthDate(format, selectedDay.formattedDate).day
    const month = getYearMonthDate(format, selectedDay.formattedDate).month
    const year = getYearMonthDate(format, selectedDay.formattedDate).year

    const monthDays = new Date(year, month + 1, 0).getDate();

    const timeToSet = new Date(year, month, day).getTime();

    if (isNaN(timeToSet)) {
      setErrorMessage('Invalid Date');
      setHasError(true);
    } else if (day > monthDays || day < 1 || month > 11 || month < 0) {
      setErrorMessage('Invalid Date');
      setHasError(true);
    } else if (
      (format === 'mm/dd/yyyy' && inputYear.length !== 4) ||
      (format === 'mm.dd.yyyy' && inputYear.length !== 4) ||
      (format === 'mm-dd-yyyy' && inputYear.length !== 4) ||
      (format === 'dd/mm/yyyy' && inputYear.length !== 4) ||
      (format === 'dd.mm.yyyy' && inputYear.length !== 4) ||
      (format === 'dd-mm-yyyy' && inputYear.length !== 4)
    ) {
      setErrorMessage('Invalid Date');
      setHasError(true);
    } else if (
      (format === 'mm/dd/yy' && inputYear.length !== 2) ||
      (format === 'mm.dd.yy' && inputYear.length !== 2) ||
      (format === 'mm-dd-yy' && inputYear.length !== 2) ||
      (format === 'dd/mm/yy' && inputYear.length !== 2) ||
      (format === 'dd.mm.yy' && inputYear.length !== 2) ||
      (format === 'dd-mm-yy' && inputYear.length !== 2)
    ) {
      setErrorMessage('Invalid Date');
      setHasError(true);
    } else {
      setSelectedDay({ time: timeToSet, formattedDate: selectedDay.formattedDate });
    }
  };

  return (
    <div className='calendar' ref={wrapper}>
      <div
        className={`calendar__input-wrapper ${isActive ? 'calendar__input-wrapper--active' : ''} ${
          selectedDay && selectedDay.formattedDate.length > 0
            ? 'calendar__input-wrapper--has-content'
            : ''
          } ${hasError ? 'calendar__input-wrapper--has-error' : ''}`}>
        <label htmlFor={name} className='calendar__label'>
          {label}
        </label>
        <div className='calendar__input'>
          <input
            type='text'
            id={name}
            name={name}
            onFocus={() => setActive(true)}
            onBlur={handleBlur}
            value={selectedDay ? selectedDay.formattedDate : ''}
            onChange={handleInputChange}
            className='calendar__input-text'
          />
          <button type='button' onClick={toggleDatePicker}>
            <img
              src='https://s3.amazonaws.com/ionic-marketplace/ionic-multi-date-picker/icon.png'
              alt='calendar icon'
              className='calendar__input-image'
            />
          </button>
          <span className='calendar__input-error-message'>{errorMessage}</span>
        </div>
      </div>
      <div
        className={`calendar__datepicker ${
          datepickerShowing ? 'calendar__datepicker--showing' : ''
          } ${
          datepickerPostion === 'top' ? 'calendar__datepicker--top' : 'calendar__datepicker--bottom'
          }`}>
        <div className='calendar__month-picker d-flex align-items-center justify-content-center'>
          <button
            type='button'
            className='calendar__arrow calendar__arrow--prev'
            onClick={prevMonth}>
            ❮
          </button>
          <p>
            {monthNames[selectedMonth]} {selectedYear}
          </p>
          <button
            type='button'
            className='calendar__arrow calendar__arrow--next'
            onClick={nextMonth}>
            ❯
          </button>
        </div>
        <div className='calendar__day-names d-flex text-center'>
          <span className='calendar__day-name'>Mon</span>
          <span className='calendar__day-name'>Tue</span>
          <span className='calendar__day-name'>Wed</span>
          <span className='calendar__day-name'>Thu</span>
          <span className='calendar__day-name'>Fri</span>
          <span className='calendar__day-name'>Sat</span>
          <span className='calendar__day-name'>Sun</span>
        </div>
        <div className='calendar__week-days d-flex flex-wrap'>
          {selectedMonthDays.map(day => (
            <button
              className={`calendar__day ${!day.isMonthDay ? 'calendar__day--blurred' : ''} ${
                todayTime === day.dayTime ? 'calendar__day--today' : ''
                }
            ${(selectedDay && selectedDay.time) === day.dayTime ? 'calendar__day--active' : ''}`}
              type='button'
              key={day.dayTime}
              onClick={() => handleDayClick(day)}>
              <span className='calendar__day-inner'>{day.dayDate}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  todaySelected: PropTypes.bool,
  format: PropTypes.string.isRequired,
  defaultValue: PropTypes.string
};

Calendar.defaultProps = {
  todaySelected: false,
};

export default Calendar;
