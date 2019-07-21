import React from "react";
import Input from "../components/Form/Input/Input";
import Select from "../components/Form/Select/Select";
import Checkbox from "../components/Form/Checkbox/Checkbox";
import Form from "../components/Form";
import RadioGroup from "../components/Form/Radio/RadioGroup";
import Calendar from "../components/Form/Calendar/Calendar";
import { FormContext } from "../hooks/formHook";
import { timeToDate, todayTime } from "../utils/date";
import InputDemo from '../demos/form/InputDemo';

const FormDemo = () => {
  const submitAction = formValues => console.log("Valid", formValues);

  const invalidAction = invalids => console.log("Invalid", invalids);

  const otherTextValidationFunction = value => value.includes("hi");

  const numberValidationFunction = value => parseFloat(value) > 10.5;

  const selectOptions = [
    { text: "Option 0", value: "0" },
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" }
  ];

  const radioList = [
    { text: "Option 0", value: "0" },
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" }
  ];

  return (
    <div className="mb-40">
      <section id="form-demo">
        <h2 className="fz-24 font-weight-bold mb-20">Form</h2>
        <Form submitAction={submitAction} invalidAction={invalidAction}>
          <div className="row">
            <div className="col-12 col-md-4">
              <Input
                name="text"
                label="Text"
                errorMessage="Error"
                defaultValue={"Default value"}
                minLength="5"
              />
            </div>
            <div className="col-12 col-md-4">
              <Input
                name="otherText"
                label="Other text"
                minLength="4"
                errorMessage="Error"
                validationFunction={otherTextValidationFunction}
              />
            </div>
            <div className="col-12 col-md-4">
              <Input
                name="requiredText"
                label="Required text"
                required
                minLength="4"
                errorMessage="Error"
                validationFunction={otherTextValidationFunction}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-4">
              <Input
                required
                name="number"
                label="Number"
                errorMessage="Error"
                type="number"
                validationFunction={numberValidationFunction}
              />
            </div>
            <div className="col-12 col-md-4">
              <Select
                label="Initial text"
                options={selectOptions}
                name="select"
                errorMessage="Error select"
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <Select
                label="Initial text"
                options={selectOptions}
                name="disabledSelect"
                errorMessage="Error select"
                defaultValue="1"
                disabled
              />
            </div>
          </div>

          <div className="row mb-15">
            <div className="col-4">
              <RadioGroup
                radioList={radioList}
                name="radioGroup"
                defaultRadio="2"
              />
            </div>
            <div className="col-4">
              <Checkbox
                name="otherCheckbox"
                label="Checkbox text"
                errorMessage="This checkbox is required"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <Calendar
                label="Date (dd/mm/yyyy)"
                name="calendar1"
                format="dd/mm/yyyy"
                required
              />
            </div>
            <div className="col-4">
              <Calendar
                label="Date (mm/dd/yy)"
                name="calendar2"
                todaySelected
                format="mm/dd/yy"
                minDate={timeToDate("mm/dd/yy", todayTime)}
              />
            </div>
            <div className="col-4">
              <Calendar
                label="Date (dd/mm/yy)"
                name="calendar3"
                defaultValue="10/07/19"
                format="dd/mm/yy"
                maxDate={timeToDate("dd/mm/yy", todayTime)}
              />
            </div>
            <div className="col-4">
              <Calendar
                label="Date (dd/mm/yy)"
                name="calendar4"
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
          </div>

          <div className="d-flex justify-content-end">
            <FormContext.Consumer>
              {value => (
                <>
                  <button
                    type="button"
                    className="button"
                    onClick={() => console.log(value.formValues)}
                  >
                    Log values
                  </button>
                </>
              )}
            </FormContext.Consumer>
            <button type="submit" className="button ml-10" formNoValidate>
              Submit
            </button>
          </div>
        </Form>
      </section>
      <p className="default-paragraph mt-20">All controls are validated on blur and it must be taken into account that initially error messages aren't shown even if the default value isn't valid. This error message will be shown on blur or if the user tries to submit the form. While typing also the control is always set to valid.</p>
      <p className="default-paragraph mt-20">Submit isn't allowed if the form contains any invalid field.</p>
      <InputDemo />
    </div>
  );
};

export default FormDemo;
