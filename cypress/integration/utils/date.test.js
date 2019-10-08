import {
  timeToDate,
  getYearMonthDay,
  dateToTime,
} from '../../../src/utils/date'

describe('date utils', () => {
  it('timeToDate', () => {
    expect(timeToDate('ddmmyyyy', 1559858400000, '/')).to.eql('07/06/2019')
    expect(timeToDate('ddmmyyyy', 1559858400000, '-')).to.eql('07-06-2019')
    expect(timeToDate('ddmmyy', 1559858400000, '-')).to.eql('07-06-19')
    expect(timeToDate('mmddyyyy', 1559858400000, '/')).to.eql('06/07/2019')
    expect(timeToDate('mmddyy', 1559858400000, '-')).to.eql('06-07-19')
  })

  it('getYearMonthDay', () => {
    expect(getYearMonthDay('ddmmyy', '15/06/19')).to.eql({
      year: 2019,
      day: 15,
      month: 5,
    })
    expect(getYearMonthDay('ddmmyyyy', '15.06.2019')).to.eql({
      year: 2019,
      day: 15,
      month: 5,
    })
    expect(getYearMonthDay('mmddyyyy', '06-15-2019')).to.eql({
      year: 2019,
      day: 15,
      month: 5,
    })
    expect(getYearMonthDay('mmddyy', '06-15-19')).to.eql({
      year: 2019,
      day: 15,
      month: 5,
    })
  })

  it('dateTotime', () => {
    expect(dateToTime('ddmmyyyy', '24/11/2018')).to.eql(1543014000000)
    expect(dateToTime('ddmmyy', '24/11/18')).to.eql(1543014000000)
    expect(dateToTime('mmddyyyy', '11/24/2018')).to.eql(1543014000000)
    expect(dateToTime('mmddyy', '11/24/18')).to.eql(1543014000000)
  })
})
