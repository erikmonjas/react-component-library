import React from 'react';
import MarkDown from 'markdown-to-jsx';
import Form from '../../components/Form';
import Calendar from '../../components/Form/Calendar/Calendar';
import { timeToDate, todayTime } from '../../utils/date';

const CalendarDemo = () => {
  const md = `
    <Calendar
      label="Date (dd/mm/yy)"
      name="calendarExample"
      defaultValue="10/07/19"
      format="ddmmyy"
      separator="/"
      minDate="06/07/19"
      maxDate="24/07/19"
      invalidDateMessage="Date not valid"
      overMaxDateMessage="Max date exceeded"
      underMinDateMessage="Min date not reached"
      emptyDateMessage="Enter a date"
    />
  `;

  return (
    <section id="calendar-demo">
      <h2 className="mt-30 font-weight-bold fz-20 mb-20">Calendar</h2>
      <Form>
        <div className="row">
          <div className="col-12 col-md-4">
            <Calendar
              label="Date (dd/mm/yy)"
              name="calendarExample"
              defaultValue="10/07/19"
              format="ddmmyy"
              minDate="06/07/19"
              maxDate="24/07/19"
              invalidDateMessage="Date not valid"
              overMaxDateMessage="Max date exceeded"
              underMinDateMessage="Min date not reached"
              emptyDateMessage="Enter a date"
            />
          </div>
          <div className="col-12 col-md-4">
            <Calendar
              label="Date (mm/dd/yy)"
              name="calendarExample2"
              todaySelected
              format="mmddyy"
              minDate={timeToDate('mmddyy', todayTime, '/')}
            />
          </div>
        </div>
      </Form>
      <MarkDown
        className="code-block"
        children={md}
        options={{
          overrides: {
            Calendar: {
              component: Calendar
            }
          }
        }}
      />
      <ul className="prop-list mt-20">
        <li>
          <strong>name</strong> <span className="code">string, required</span>:
          identifier for the calendar. It can't be the same for two different
          elements in a form. It should be written in camelcase, without spaces,
          dots, etc.
        </li>
        <li>
          <strong>label</strong>{' '}
          <span className="code">string, not required</span>: text which will
          appear on the calendar giving information about it.
        </li>
        <li>
          <strong>required</strong>{' '}
          <span className="code">boolean, not required</span>: determines
          whether a calendar value must be compulsarily provided or if it can be
          empty. If the value is empty and it's not required, validation won't
          be enforced, as soon as some value is received, validations must be
          passed.
        </li>
        <li>
          <strong>defaultValue</strong>{' '}
          <span className="code">string, not required</span>: initial value for
          the calendar.
        </li>
        <li>
          <strong>errorMessage</strong>{' '}
          <span className="code">string, not required</span>: message which will
          appear under the calendar when validation isn't passed.
        </li>
        <li>
          <strong>disabled</strong>{' '}
          <span className="code">boolean, not required</span>: determines if
          calendar is disabled. By default it's{' '}
          <span className="code">false</span>.
        </li>
        <li>
          <strong>todaySelected</strong>{' '}
          <span className="code">boolean, not required</span>: sets the initial
          value to today's date.
        </li>
        <li>
          <strong>format</strong> <span className="code">string, required</span>
          : accepted format for the date. It must be one of the following:{' '}
          <span className="code mt-5">ddmmyy, mmddyy, ddmmyyyy, mmddyyyy</span>
        </li>
        <li>
          <strong>separator</strong>{' '}
          <span className="code">string, not required</span>: string that will
          separate month, day, year. If you don't provide it, the default is
          '/'.
        </li>
        <li>
          <strong>maxDate</strong>{' '}
          <span className="code">string, not required</span>: date after which
          none can be selected. This date must be provided according to the
          established format.
        </li>
        <li>
          <strong>minDate</strong>{' '}
          <span className="code">string, not required</span>: date before which
          none can be selected. This date must be provided according to the
          established format.
        </li>
        <li>
          <strong>invalidDateMessage</strong>{' '}
          <span className="code">string, not required</span>: custom message
          shown when date contains a generic error.
        </li>
        <li>
          <strong>overMaxDateMessage</strong>{' '}
          <span className="code">string, not required</span>: custom message
          shown when date is subsequent to the maximum date set.
        </li>
        <li>
          <strong>underMinDateMessage</strong>{' '}
          <span className="code">string, not required</span>: custom message
          shown when date is previous to the minimum date set.
        </li>
        <li>
          <strong>emptyDateMessage</strong>{' '}
          <span className="code">string, not required</span>: custom message
          shown when date isn't provided.
        </li>
      </ul>
      <p className="default-paragraph mt-20">
        The calendar has its own default messages, so these last four props are
        completely optional.
      </p>
    </section>
  );
};

export default CalendarDemo;
