import React from "react";
import "./styles.scss";
import Tabs from "./components/Tabs";
import Tab from "./components/Tabs/Tab";
import Input from "./components/Form/Input";
import Select from "./components/Form/Select";
import Checkbox from "./components/Form/Checkbox";
import Demo, { DemoContext } from "./components/Form/DemoContext";
import Form from "./components/Form";

const App = () => {
  const submitAction = formValues => console.log("Valid", formValues);

  const invalidAction = invalids => console.log("Invalid", invalids);

  const otherTextValidationFunction = value => value.includes("hi");

  const selectOptions = [
    { text: "Option 0", value: "0" },
    { text: "Option 1", value: "1" },
    { text: "Option 2", value: "2" }
  ];

  return (
    <>
      <div className="tabs-demo">
        <h2>Tabs</h2>
        <Tabs
          tabList={[{ title: "Tab 0" }, { title: "Tab 1" }, { title: "Tab 2" }]}
        >
          {currentTab => (
            <>
              <Tab currentTab={currentTab} order={0}>
                <p>I'm tab 0</p>
              </Tab>
              <Tab currentTab={currentTab} order={1}>
                <p>I'm tab 1</p>
              </Tab>
              <Tab currentTab={currentTab} order={2}>
                <p>I'm tab 2</p>
              </Tab>
            </>
          )}
        </Tabs>
      </div>

      <div className="form-demo">
        <h2>Form</h2>
        {/* <form onSubmit={handleSubmit}>
          <Input
            handleChange={handleChange}
            invalids={invalids}
            name="text"
            label="text"
            errorMessage="Error"
            defaultValue={"Default value"}
            minLength="5"
            disabled
          />
          <Input
            handleChange={handleChange}
            invalids={invalids}
            name="otherText"
            label="Other text"
            minLength="4"
            errorMessage="Error"
            valid={
              !!formValues.otherText &&
              formValues.otherText.value.includes("hi")
            }
          />
          <Input
            handleChange={handleChange}
            invalids={invalids}
            name="number"
            label="Number"
            errorMessage="Error"
            type="number"
            valid={
              !!formValues.number && parseFloat(formValues.number.value) > 10.5
            }
          />
          <Select
            handleChange={handleChange}
            invalids={invalids}
            label="Initial text"
            options={selectOptions}
            name="select"
            errorMessage="Error select"
          />
          <Select
            handleChange={handleChange}
            invalids={invalids}
            label="Initial text"
            options={selectOptions}
            name="disabledSelect"
            errorMessage="Error select"
            defaultValue="1"
            disabled
          />
          <Checkbox
            handleChange={handleChange}
            invalids={invalids}
            name="checkbox"
            label="Checkbox text"
          />
          <button type="submit" formNoValidate>
            Submit
          </button>
        </form> */}
        <Demo>
          <DemoContext.Consumer>{value => <p>{value}</p>}</DemoContext.Consumer>
        </Demo>
        <Form submitAction={submitAction} invalidAction={invalidAction}>
          <Input
            name="otherText"
            label="Other text"
            minLength="4"
            errorMessage="Error"
            validationFunction={otherTextValidationFunction}
          />
          <button type="submit" formNoValidate>
            Submit
          </button>
        </Form>

        <Form submitAction={submitAction} invalidAction={invalidAction}>
          <Input
            name="otherText"
            label="Other text"
            minLength="4"
            errorMessage="Error"
            validationFunction={otherTextValidationFunction}
          />
          <button type="submit" formNoValidate>
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default App;
