import React from "react";
import MarkDown from "markdown-to-jsx";
import Form from "../../components/Form";
import Checkbox from "../../components/Form/Checkbox/Checkbox";

const CheckboxDemo = () => {
  const md = `
    <Checkbox
      name="otherCheckbox"
      label="Checkbox text"
      errorMessage="This checkbox is required"
      required
      defaultChecked
    />
  `;

  return (
    <section id="checkbox-demo">
      <h2 className="mt-30 font-weight-bold fz-20">Checkbox</h2>
      <Form>
        <Checkbox
          name="checkboxExample"
          label="Checkbox text"
          errorMessage="This checkbox is required"
          required
          defaultChecked
        />
      </Form>
      <MarkDown
        className="code-block"
        children={md}
        options={{
          overrides: {
            Checkbox: {
              component: Checkbox
            }
          }
        }}
      />
      <ul className="prop-list mt-20">
        <li>
          <strong>name</strong> <span className="code">string, required</span>:
          identifier for the checkbox. It can't be the same for two different
          elements in a form. It should be written in camelcase, without spaces,
          dots, etc.
        </li>
        <li>
          <strong>label</strong>{" "}
          <span className="code">string, not required</span>: text which will
          appear on the checkbox giving information about it.
        </li>
        <li>
          <strong>required</strong>{" "}
          <span className="code">boolean, not required</span>: determines
          whether a checkbox value must be compulasily provided or if it can be
          empty. If the value is empty and it's not required, validation won't
          be enforced, as soon as some value is received, validations must be
          passed.
        </li>
        <li>
          <strong>defaultChecked</strong>{" "}
          <span className="code">boolean, not required</span>: determines if
          checkbox is initially checked
        </li>
        <li>
          <strong>errorMessage</strong>{" "}
          <span className="code">string, not required</span>: message which will
          appear under the checkbox when validation isn't passed.
        </li>
        <li>
          <strong>disabled</strong>{" "}
          <span className="code">boolean, not required</span>: determines if
          checkbox is disabled. By default it's{" "}
          <span className="code">false</span>.
        </li>
        <li>
          <strong>className</strong>{" "}
          <span className="code">string, not required</span>: class that the
          checkbox will receive.
        </li>
      </ul>
    </section>
  );
};

export default CheckboxDemo;
