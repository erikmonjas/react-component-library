import React from "react";
import FormDemoExplanation from "../demos/form/FormDemo";
import InputDemo from "../demos/form/InputDemo";
import SelectDemo from "../demos/form/SelectDemo";
import RadioDemo from "../demos/form/RadioDemo";
import CheckboxDemo from "../demos/form/CheckboxDemo";
import CalendarDemo from "../demos/form/CalendarDemo";

const FormDemo = () => {
  return (
    <div className="mb-40">
      <div className="sticky-header">
        <nav>
          <ul>
            <li>
              <a href="#form-demo">Form</a>
            </li>
            <li>
              <a href="#input-demo">Input</a>
            </li>
            <li>
              <a href="#select-demo">Select</a>
            </li>
            <li>
              <a href="#radio-demo">Radio</a>
            </li>
            <li>
              <a href="#checkbox-demo">Checkbox</a>
            </li>
            <li>
              <a href="#calendar-demo">Calendar</a>
            </li>
          </ul>
        </nav>
      </div>
      <FormDemoExplanation />
      <InputDemo />
      <SelectDemo />
      <RadioDemo />
      <CheckboxDemo />
      <CalendarDemo />
    </div>
  );
};

export default FormDemo;
