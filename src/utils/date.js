export const newDate = new Date()
export const currentMonth = newDate.getMonth()
export const currentYear = newDate.getFullYear()
export const currentDay = newDate.getDate()
export const todayTime = new Date(
  currentYear,
  currentMonth,
  currentDay
).getTime()

export const timeToDate = (format, time, separator = '/') => {
  const monthPlusOne = new Date(time).getMonth() + 1

  const day =
    new Date(time).getDate().toString().length === 1
      ? `0${new Date(time).getDate()}`
      : new Date(time).getDate()
  const month =
    monthPlusOne.toString().length === 1 ? `0${monthPlusOne}` : monthPlusOne
  const year = new Date(time).getFullYear()

  if (format === 'ddmmyyyy') {
    return `${day}${separator}${month}${separator}${year}`
  } else if (format === 'ddmmyy') {
    return `${day}${separator}${month}${separator}${year.toString().slice(2)}`
  } else if (format === 'mmddyyyy') {
    return `${month}${separator}${day}${separator}${year}`
  } else if (format === 'mmddyy') {
    return `${month}${separator}${day}${separator}${year.toString().slice(2)}`
  }
}

export const getYearMonthDay = (format, date) => {
  let day, month, year

  if (format === 'ddmmyyyy' || format === 'ddmmyy') {
    day = parseFloat(date.substring(0, 2))
    month = parseFloat(date.substring(3, 5)) - 1
  }

  if (format === 'mmddyyyy' || format === 'mmddyy') {
    month = parseFloat(date.substring(0, 2)) - 1
    day = parseFloat(date.substring(3, 5))
  }

  if (format === 'mmddyyyy' || format === 'ddmmyyyy') {
    year = parseFloat(date.substring(6, 10))
  } else {
    year = parseFloat(`20${date.substring(6, 8)}`)
  }

  return { year, month, day }
}

export const dateToTime = (format, date) => {
  const day = getYearMonthDay(format, date).day
  const month = getYearMonthDay(format, date).month
  const year = getYearMonthDay(format, date).year

  return new Date(year, month, day).getTime()
}
