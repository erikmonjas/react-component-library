import React from "react";
import MarkDown from "markdown-to-jsx";
import Form from "../../components/Form";
import Calendar from "../../components/Form/Calendar/Calendar";
import { timeToDate, todayTime } from "../../utils/date";

const CalendarDemo = () => {
  const md = `
    <Calendar
      label="Date (dd/mm/yy)"
      name="calendarExample"
      defaultValue="10/07/19"
      format="dd/mm/yy"
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
              format="dd/mm/yy"
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
              format="mm/dd/yy"
              minDate={timeToDate("mm/dd/yy", todayTime)}
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
          <strong>label</strong>{" "}
          <span className="code">string, not required</span>: text which will
          appear on the select giving information about it.
        </li>
        <li>
          <strong>required</strong>{" "}
          <span className="code">boolean, not required</span>: determines
          whether a select value must be compulsary provided or if it can be
          empty. If the value is empty and it's not required, validation won't
          be enforced, as soon as some value is received, validations must be
          passed.
        </li>
        <li>
          <strong>options</strong>{" "}
          <span className="code">array of objects, not required</span>: list of
          options that will be available in the select. Each of them must be an
          object in which <span className="code">text</span> will determine
          which text will be shown for that option, while{" "}
          <span className="code">value</span> sets which value will receive the
          select when that option is chosen.
        </li>
        <li>
          <strong>defaultValue</strong>{" "}
          <span className="code">string, not required</span>: initial value for
          the select.
        </li>
        <li>
          <strong>errorMessage</strong>{" "}
          <span className="code">string, not required</span>: message which will
          appear under the select when validation isn't passed.
        </li>
        <li>
          <strong>disabled</strong>{" "}
          <span className="code">boolean, not required</span>: determines if
          select is disabled. By default it's{" "}
          <span className="code">false</span>.
        </li>
        <li>
          <strong>className</strong>{" "}
          <span className="code">string, not required</span>: class that the
          select will receive.
        </li>
      </ul>
    </section>
  );
};

export default CalendarDemo;
