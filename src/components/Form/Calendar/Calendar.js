import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react'
import PropTypes from 'prop-types'
import './calendar.scss'
import { FormContext } from '../../../hooks/formHook'
import {
  timeToDate,
  dateToTime,
  getYearMonthDay,
  todayTime,
  currentMonth,
  currentYear,
} from '../../../utils/date'

const Calendar = ({
  name,
  label,
  todaySelected,
  format,
  defaultValue,
  maxDate,
  minDate,
  disabled,
  required,
  invalidDateMessage = 'Invalid date',
  overMaxDateMessage = `The date must be equal or previous to ${maxDate}`,
  underMinDateMessage = `The date must be equal or subsequent to ${minDate}`,
  emptyDateMessage = 'Please, enter a date',
  separator,
}) => {
  const { handleChange, invalids } = useContext(FormContext)

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
  ]

  const getInitialDay = () => {
    if (todaySelected) {
      return {
        time: todayTime,
        formattedDate: timeToDate(format, todayTime, separator),
      }
    } else if (defaultValue.length > 0) {
      return {
        time: dateToTime(format, defaultValue),
        formattedDate: defaultValue,
      }
    } else {
      return { time: null, formattedDate: '' }
    }
  }

  const getInitial = what => {
    const currentWhat = what === 'year' ? currentYear : currentMonth
    if (todaySelected) {
      return currentWhat
    } else if (defaultValue.length > 0) {
      return what === 'year'
        ? new Date(dateToTime(format, defaultValue)).getFullYear()
        : new Date(dateToTime(format, defaultValue)).getMonth()
    } else {
      return currentWhat
    }
  }

  const getLimitDateTime = date => {
    if (date.length > 0) {
      return dateToTime(format, date)
    } else {
      return null
    }
  }

  const wrapper = useRef(null)
  const datepickerRef = useRef(null)

  const minDateTime = getLimitDateTime(minDate)
  const maxDateTime = getLimitDateTime(maxDate)

  const [selectedMonth, setSelectedMonth] = useState(getInitial('month'))
  const [selectedYear, setSelectedYear] = useState(getInitial('year'))
  const [selectedDay, setSelectedDay] = useState(getInitialDay())
  const [isActive, setActive] = useState(false)
  const [datepickerShowing, setDatepickerShowing] = useState(false)
  const [datepickerPostion, setDatepickerPosition] = useState('bottom')
  const [errorMessage, setErrorMessage] = useState('')
  const [isImageFocused, setImageFocus] = useState(false)
  const [isValid, setValid] = useState(true)
  const [isPristine, setPristine] = useState(true)

  const validate = ({ time, formattedDate }) => {
    if (disabled) {
      setValid(true)
      return true
    }

    if (required && time === null) {
      const calendarInvalid = invalids.find(invalid => invalid[name])
      if (!isPristine || !!calendarInvalid) {
        setErrorMessage(emptyDateMessage)
      }
      setValid(false)
      return false
    }

    if (!required && time === null && formattedDate.length === 0) {
      setErrorMessage('')
      setValid(true)
      return true
    }

    if (!!minDate && time < minDateTime) {
      setValid(false)
      if (!isPristine) {
        time === null
          ? setErrorMessage(invalidDateMessage)
          : setErrorMessage(underMinDateMessage)
      }
      return false
    }

    if (!!maxDate && time > maxDateTime) {
      setValid(false)
      if (!isPristine) {
        time === null
          ? setErrorMessage(invalidDateMessage)
          : setErrorMessage(overMaxDateMessage)
      }
      return false
    }

    setErrorMessage('')
    setValid(true)
    return true
  }

  const handleClickOutside = useCallback(
    e => {
      if (wrapper.current.contains(e.target)) {
        if (
          e.target.classList.length > 0 &&
          (e.target.classList[0].includes('calendar__label') ||
            e.target.classList[0].includes('calendar__input'))
        ) {
          setDatepickerShowing(false)
          setActive(true)
          window.removeEventListener('click', handleClickOutside)
        }
      } else {
        setDatepickerShowing(false)
        setActive(false)
        window.removeEventListener('click', handleClickOutside)
      }
    },
    [wrapper]
  )

  useEffect(() => {
    if (!disabled) {
      const initialState = {
        [name]: {
          value: selectedDay,
          required,
          valid: validate(selectedDay),
        },
      }

      handleChange(initialState)
    }
  }, [])

  useEffect(() => {
    const calendarInvalid = invalids.find(invalid => invalid[name])
    if (!!calendarInvalid && calendarInvalid.hasOwnProperty(name)) {
      setPristine(false)
      validate(selectedDay)
    }
  }, [invalids, name, selectedDay])

  useEffect(() => {
    if (datepickerShowing) {
      window.addEventListener('click', handleClickOutside)
    }
  }, [datepickerShowing, handleClickOutside])

  useEffect(() => {
    if (datepickerShowing) {
      const chosenDay = datepickerRef.current.querySelector(
        '.calendar__day--active'
      )
      const todayDay = datepickerRef.current.querySelector(
        '.calendar__day--today'
      )

      if (chosenDay) {
        chosenDay.focus()
      } else if (todayDay) {
        todayDay.focus()
      } else {
        datepickerRef.current
          .querySelector('.calendar__day:not(.calendar__day--blurred)')
          .focus()
      }
    }
  }, [datepickerShowing, datepickerRef])

  const getDaysInMonth = (month, year) => {
    const initialDate = new Date(year, month, 1)
    const initialDatePositon = initialDate.getDay()
    let initialDateNumber = 0
    const monthDays = new Date(year, month + 1, 0).getDate()
    const daysUntilEndingSunday =
      new Date(year, month, monthDays).getDay() === 0
        ? 0
        : 7 - new Date(year, month, monthDays).getDay()
    const endingDateNumber = monthDays + daysUntilEndingSunday

    if (initialDatePositon > 1) {
      initialDateNumber = -(initialDatePositon - 2)
    } else if (initialDatePositon === 0) {
      initialDateNumber = -5
    } else {
      initialDateNumber = 1
    }

    const days = []

    while (initialDateNumber <= endingDateNumber) {
      const dateBase = new Date(year, month, initialDateNumber)
      days.push({
        dayDate: dateBase.getDate(),
        dayMonth: dateBase.getMonth(),
        dayYear: dateBase.getFullYear(),
        dayTime: dateBase.getTime(),
        isMonthDay: initialDateNumber >= 1 && initialDateNumber <= monthDays,
      })

      initialDateNumber = initialDateNumber + 1
    }
    return days
  }

  const [selectedMonthDays, setMonthDays] = useState(
    getDaysInMonth(selectedMonth, selectedYear)
  )

  const getScrollLeft = () => {
    return document.body.offsetHeight - window.pageYOffset - window.innerHeight
  }

  const getVisibleDistanceToBottomLeft = () => {
    return (
      window.innerHeight -
      document.getElementById(name).getBoundingClientRect().y
    )
  }

  const getDistanceToTopLeft = () => {
    return (
      window.pageYOffset +
      document.getElementById(name).getBoundingClientRect().y
    )
  }

  const toggleDatePicker = () => {
    if (getScrollLeft() + getVisibleDistanceToBottomLeft() > 325) {
      setDatepickerPosition('bottom')
    } else if (getDistanceToTopLeft() < 318) {
      setDatepickerPosition('bottom')
    } else {
      setDatepickerPosition('top')
    }

    setDatepickerShowing(!datepickerShowing)
  }

  const prevMonth = () => {
    let newMonth, newYear
    if (selectedMonth > 0) {
      newMonth = selectedMonth - 1
      newYear = selectedYear
      setSelectedMonth(newMonth)
    } else {
      newMonth = 11
      newYear = selectedYear - 1
      setSelectedMonth(newMonth)
      setSelectedYear(newYear)
    }

    setMonthDays(getDaysInMonth(newMonth, newYear))
  }

  const nextMonth = () => {
    let newMonth, newYear
    if (selectedMonth < 11) {
      newMonth = selectedMonth + 1
      newYear = selectedYear
      setSelectedMonth(selectedMonth + 1)
    } else {
      newMonth = 0
      newYear = selectedYear + 1
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    }

    setMonthDays(getDaysInMonth(newMonth, newYear))
  }

  const handleDayClick = ({ dayTime }) => {
    const dayObject = {
      time: dayTime,
      formattedDate: timeToDate(format, dayTime),
    }
    setErrorMessage('')
    setValid(true)
    setSelectedDay(dayObject)
    handleChange({
      [name]: {
        value: dayObject,
        required,
        valid: validate(dayObject),
      },
    })
    setDatepickerShowing(false)
    setActive(false)
    window.removeEventListener('click', handleClickOutside)
  }

  const handleInputChange = e => {
    setErrorMessage('')
    setValid(true)
    setSelectedDay({ time: '', formattedDate: e.target.value.trim() })
  }

  const handleBlur = () => {
    const setDate = (object, valid) => {
      setSelectedDay(object)
      handleChange({
        [name]: {
          value: object,
          required,
          valid,
        },
      })
    }

    const inputYear = selectedDay.formattedDate.substring(6, 10)

    const day = getYearMonthDay(format, selectedDay.formattedDate).day
    const month = getYearMonthDay(format, selectedDay.formattedDate).month
    const year = getYearMonthDay(format, selectedDay.formattedDate).year

    const monthDays = new Date(year, month + 1, 0).getDate()

    const timeToSet = new Date(year, month, day).getTime()

    const invalidObject = {
      time: null,
      formattedDate: selectedDay.formattedDate,
    }

    if (isNaN(timeToSet)) {
      if (selectedDay.formattedDate.length > 0) {
        setErrorMessage(invalidDateMessage)
        setValid(false)
        setDate(invalidObject, false)
      } else {
        if (required) {
          setErrorMessage(emptyDateMessage)
          setValid(false)
          setDate(invalidObject, false)
        } else {
          setValid(true)
          setDate(invalidObject, true)
        }
      }
    } else if (day > monthDays || day < 1 || month > 11 || month < 0) {
      setErrorMessage(invalidDateMessage)
      setValid(false)
      setDate(invalidObject, false)
    } else if (
      (format === 'mmddyyyy' && inputYear.length !== 4) ||
      (format === 'ddmmyyyy' && inputYear.length !== 4)
    ) {
      setErrorMessage(invalidDateMessage)
      setValid(false)
      setDate(invalidObject, false)
    } else if (
      (format === 'mmddyy' && inputYear.length !== 2) ||
      (format === 'ddmmyy' && inputYear.length !== 2)
    ) {
      setErrorMessage(invalidDateMessage)
      setValid(false)
      setDate(invalidObject, false)
    } else {
      const length = format.substring(6, 8) === '' ? 8 : 10

      const dayObject = {
        time: timeToSet,
        formattedDate: selectedDay.formattedDate.trim().substring(0, length),
      }

      setDate(dayObject, validate(dayObject))
    }
  }

  const handleDayKeyPress = (e, index) => {
    const days = datepickerRef.current.querySelectorAll('.calendar__day')
    if (e.key === 'ArrowRight') {
      if (days[index + 1]) {
        if (days[index + 1].getAttribute('disabled') === null) {
          days[index + 1].focus()
        }
      } else {
        if (days[0].getAttribute('disabled') === null) {
          days[0].focus()
        }
      }
    }
    if (e.key === 'ArrowLeft') {
      if (days[index - 1]) {
        if (days[index - 1].getAttribute('disabled') === null) {
          days[index - 1].focus()
        }
      } else {
        if (days[days.length - 1].getAttribute('disabled') === null) {
          days[days.length - 1].focus()
        }
      }
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      datepickerRef.current.querySelector('.calendar__arrow--prev').focus()
    }
  }

  const handleInputKey = e => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  return (
    <div
      className={`calendar ${disabled ? 'calendar--disabled' : ''}`}
      ref={wrapper}
    >
      <div
        className={`calendar__input-wrapper ${
          isActive ? 'calendar__input-wrapper--active' : ''
        } ${
          selectedDay && selectedDay.formattedDate.length > 0
            ? 'calendar__input-wrapper--has-content'
            : ''
        } ${isValid || isPristine ? '' : 'calendar__input-wrapper--has-error'}`}
      >
        <label htmlFor={name} className='calendar__label'>
          {label}
        </label>
        <div className='calendar__input'>
          <input
            type='text'
            id={name}
            name={name}
            onFocus={() => {
              setActive(true)
            }}
            onBlur={() => {
              setPristine(false)
              setActive(false)
              handleBlur()
            }}
            onKeyDown={handleInputKey}
            value={selectedDay ? selectedDay.formattedDate : ''}
            onChange={handleInputChange}
            className='calendar__input-text'
            disabled={disabled}
          />
          <button
            type='button'
            onClick={toggleDatePicker}
            className={`calendar__input-image ${
              isImageFocused ? 'calendar__input-image--focused' : ''
            }`}
            onFocus={() => setImageFocus(true)}
            onBlur={() => setImageFocus(false)}
            disabled={disabled}
          />
          <span className='calendar__input-error-message'>{errorMessage}</span>
        </div>
      </div>
      <div
        className={`calendar__datepicker ${
          datepickerShowing ? 'calendar__datepicker--showing' : ''
        } ${
          datepickerPostion === 'top'
            ? 'calendar__datepicker--top'
            : 'calendar__datepicker--bottom'
        }`}
        ref={datepickerRef}
      >
        <div className='calendar__month-picker d-flex align-items-center justify-content-center'>
          <button
            type='button'
            className='calendar__arrow calendar__arrow--prev'
            onClick={prevMonth}
          >
            ❮
          </button>
          <p>
            {monthNames[selectedMonth]} {selectedYear}
          </p>
          <button
            type='button'
            className='calendar__arrow calendar__arrow--next'
            onClick={nextMonth}
          >
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
          {selectedMonthDays.map((day, index) => (
            <button
              disabled={
                (minDateTime !== null && day.dayTime < minDateTime) ||
                (maxDateTime !== null && day.dayTime > maxDateTime)
              }
              className={`calendar__day ${
                !day.isMonthDay ? 'calendar__day--blurred' : ''
              } ${todayTime === day.dayTime ? 'calendar__day--today' : ''} ${
                (minDateTime !== null && day.dayTime < minDateTime) ||
                (maxDateTime !== null && day.dayTime > maxDateTime)
                  ? 'calendar__day--blurred'
                  : ''
              }
            ${
            (selectedDay && selectedDay.time) === day.dayTime
              ? 'calendar__day--active'
              : ''
            }`}
              type='button'
              key={day.dayTime}
              onClick={() => handleDayClick(day)}
              onKeyDown={e => handleDayKeyPress(e, index)}
            >
              <span className='calendar__day-inner'>{day.dayDate}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

Calendar.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  todaySelected: PropTypes.bool,
  format: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  emptyDateMessage: PropTypes.string,
  overMaxDateMessage: PropTypes.string,
  underMinDateMessage: PropTypes.string,
  invalidDateMessage: PropTypes.string,
  separator: PropTypes.string,
}

Calendar.defaultProps = {
  todaySelected: false,
  defaultValue: '',
  maxDate: '',
  minDate: '',
  disabled: false,
  required: false,
  separator: '/',
}

export default Calendar
