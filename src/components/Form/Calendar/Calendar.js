import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './calendar.scss';

const Calendar = ({ name, label }) => {
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

  const newDate = new Date();

  const currentMonth = newDate.getMonth();
  const currentYear = newDate.getFullYear();
  const currentDay = newDate.getDate();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime(),
  );
  const [isActive, setActive] = useState(false);
  const [datepickerShowing, setDatepickerShowing] = useState(false);
  const [datepickerPostion, setDatepickerPosition] = useState('bottom');

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
    if (getScrollLeft() + getVisibleDistanceToBottomLeft() > 330) {
      setDatepickerPosition('bottom');
    } else if (getDistanceToTopLeft() < 330) {
      setDatepickerPosition('bottom');
    } else {
      setDatepickerPosition('top');
    }

    setDatepickerShowing(!datepickerShowing);
  };

  const prevMonth = () => {
    let newMonth = 0;
    let newYear = 0;
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
    let newMonth = 0;
    let newYear = 0;
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

  return (
    <div className='calendar'>
      <div
        className={`calendar__input-wrapper ${isActive ? 'calendar__input-wrapper--active' : ''}`}>
        <label htmlFor={name} className='calendar__label'>
          {label}
        </label>
        <div className='calendar__input'>
          <input
            type='text'
            id={name}
            name={name}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
          />
          <img
            src='https://s3.amazonaws.com/ionic-marketplace/ionic-multi-date-picker/icon.png'
            alt='calendar icon'
            className='calendar__input-image'
            onClick={toggleDatePicker}
          />
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
              className={`calendar__day ${!day.isMonthDay ? 'calendar__day--blurred' : ''} 
            ${day.dayTime === selectedDay ? 'calendar__day--active' : ''}`}
              type='button'
              key={day.dayTime}>
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
};

export default Calendar;
