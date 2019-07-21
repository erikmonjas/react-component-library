import React from 'react'
import MarkDown from 'markdown-to-jsx';
import Form from '../../components/Form';
import Input from '../../components/Form/Input/Input';

const InputDemo = () => {
  const md = `
    <Input
      name="userName"
      label="Enter your username"
      errorMessage="Invalid username"
      defaultValue="erik.monjas"
      minLength="5"
      maxLength="15"
      required
      validationFunction={value => value.includes("erik")}
    />
  `

  return (
    <section id="input-demo">
      <h2 className="mt-30 font-weight-bold fz-20 mb-20">Input</h2>
      <Form>
        <div className="row">
          <div className="col-12 col-md-4">
            <Input
              name="userName"
              label="Enter your username"
              errorMessage="Invalid username"
              defaultValue="erik.monjas"
              minLength="5"
              maxLength="15"
              required
              validationFunction={value => value.includes("erik")}
            />
          </div>
          <div className="col-12 col-md-4">
            <Input
              name="numberExample"
              label="Number"
              errorMessage="Wrong number"
              type="number"
            />
          </div>
        </div>
      </Form>
      <MarkDown
        className='code-block'
        children={md}
        options={{
          overrides: {
              Input: {
                  component: Input,
              },
          },
        }}
      / >
      <ul className="prop-list mt-20">
        <li><strong>name</strong> <span className="code">string, required</span>: identifier for the input. It can't be the same for two different elements in a form. It should be written in camelcase, without spaces, dots, etc.</li>
        <li><strong>label</strong> <span className="code">string, not required</span>: text which will appear on the input giving information about it.</li>
        <li><strong>required</strong> <span className="code">boolean, not required</span>: determines whether an input value must be compulsary provided or if it can be empty. If the value is empty, validation won't be enforced, as soon as some value is received, validations must be passed.</li>
        <li><strong>defaultValue</strong> <span className="code">string, not required.</span>: initial value for the input.</li>
        <li><strong>maxLength</strong> <span className="code">string, not required</span>: maximum amount of characters an input can contain. It prevents the user from typing more than the allowed amount.</li>
        <li><strong>minLength</strong> <span className="code">string, not required</span>: minimum amount of characters an input can contain.</li>
        <li><strong>errorMessage</strong> <span className="code">string, not required</span>: message which will appear under the input when validation isn't passed.</li>
        <li><strong>validationFunction</strong> <span className="code">function, not required</span>: custom validation for the input. It must always return <span className="code">true</span> or <span className="code">false</span>.</li>
        <li><strong>type</strong> <span className="code">string, not required</span>: its only valid types are <span className="code">text</span> or <span className="code">number</span>. By default it'll always be <span className="code">text</span>. If <span className="code">number</span> is provided, only numeric input will be allowed. A maximum of two decimal numbers is permitted, separated from the intergers by a dot.</li>
        <li><strong>disabled</strong> <span className="code">boolean, not required</span>: determines if input is disabled. By default it's <span className="code">false</span>.</li>
        <li><strong>wrapperClassName</strong> <span className="code">string, not required</span>: class for the covering div.</li>
        <li><strong>inputClassName</strong> <span className="code">string, not required</span>: class for the proper input.</li>
      </ul>
    </section>
  )
}

export default InputDemo
