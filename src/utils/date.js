export const formatTime = (format, time) => {
    const monthPlusOne = new Date(time).getMonth() + 1;

    const day =
        new Date(time).getDate().toString().length === 1
            ? `0${new Date(time).getDate()}`
            : new Date(time).getDate();
    const month = monthPlusOne.toString().length === 1 ? `0${monthPlusOne}` : monthPlusOne;
    const year = new Date(time).getFullYear();

    if (format === 'dd/mm/yyyy') {
        return `${day}/${month}/${year}`;
    } else if (format === 'dd/mm/yy') {
        return `${day}/${month}/${year.toString().slice(2)}`;
    } else if (format === 'mm/dd/yyyy') {
        return `${month}/${day}/${year}`;
    } else if (format === 'mm/dd/yy') {
        return `${month}/${day}/${year.toString().slice(2)}`;
    } else if (format === 'dd-mm-yyyy') {
        return `${day}-${month}-${year}`;
    } else if (format === 'dd-mm-yy') {
        return `${day}-${month}-${year.toString().slice(2)}`;
    } else if (format === 'mm-dd-yyyy') {
        return `${month}-${day}-${year}`;
    } else if (format === 'mm-dd-yy') {
        return `${month}-${day}-${year.toString().slice(2)}`;
    } else if (format === 'dd.mm.yyyy') {
        return `${day}.${month}.${year}`;
    } else if (format === 'dd.mm.yy') {
        return `${day}.${month}.${year.toString().slice(2)}`;
    } else if (format === 'mm.dd.yyyy') {
        return `${month}.${day}.${year}`;
    } else if (format === 'mm.dd.yy') {
        return `${month}.${day}.${year.toString().slice(2)}`;
    }
};

export const getYearMonthDate = (format, date) => {
    let day, month, year;

    if (
        format === 'dd/mm/yyyy' ||
        format === 'dd/mm/yy' ||
        format === 'dd.mm.yyyy' ||
        format === 'dd.mm.yy' ||
        format === 'dd-mm-yyyy' ||
        format === 'dd-mm-yy'
    ) {
        day = date.substring(0, 2);
        month = parseFloat(date.substring(3, 5)) - 1;
    }

    if (
        format === 'mm/dd/yyyy' ||
        format === 'mm/dd/yy' ||
        format === 'mm.dd.yyyy' ||
        format === 'mm.dd.yy' ||
        format === 'mm-dd-yyyy' ||
        format === 'mm-dd-yy'
    ) {
        month = parseFloat(date.substring(0, 2)) - 1;
        day = date.substring(3, 5);
    }

    if (
        format === 'mm/dd/yyyy' ||
        format === 'mm.dd.yyyy' ||
        format === 'mm-dd-yyyy' ||
        format === 'dd/mm/yyyy' ||
        format === 'dd.mm.yyyy' ||
        format === 'dd-mm-yyyy'
    ) {
        year = date.substring(6, 10);
    } else {
        year = `20${date.substring(6, 8)}`;
    }

    return { year, month, day }
}