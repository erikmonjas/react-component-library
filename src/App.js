import React from 'react';
import './styles.scss';
import Tabs from './components/Tabs';
import Tab from './components/Tabs/Tab';
import Input from './components/Form/Input';
import Select from './components/Form/Select';
import Checkbox from './components/Form/Checkbox';
import Form from './components/Form';

const App = () => {
  const submitAction = formValues => console.log('Valid', formValues);

  const invalidAction = invalids => console.log('Invalid', invalids);

  const otherTextValidationFunction = value => value.includes('hi');

  const numberValidationFunction = value => parseFloat(value) > 10.5;

  const selectOptions = [
    { text: 'Option 0', value: '0' },
    { text: 'Option 1', value: '1' },
    { text: 'Option 2', value: '2' },
  ];

  return (
    <>
      <div className='tabs-demo'>
        <h2>Tabs</h2>
        <Tabs tabList={[{ title: 'Tab 0' }, { title: 'Tab 1' }, { title: 'Tab 2' }]}>
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

      <div className='form-demo'>
        <h2>Form</h2>
        <Form submitAction={submitAction} invalidAction={invalidAction}>
          <Input
            name='text'
            label='text'
            errorMessage='Error'
            defaultValue={'Default value'}
            minLength='5'
            disabled
          />
          <Input
            name='otherText'
            label='Other text'
            minLength='4'
            errorMessage='Error'
            validationFunction={otherTextValidationFunction}
          />
          <Input
            required
            name='number'
            label='Number'
            errorMessage='Error'
            type='number'
            validationFunction={numberValidationFunction}
          />
          <Select
            label='Initial text'
            options={selectOptions}
            name='select'
            errorMessage='Error select'
          />
          <Select
            label='Initial text'
            options={selectOptions}
            name='disabledSelect'
            errorMessage='Error select'
            defaultValue='1'
            disabled
          />
          <Checkbox name='checkbox' label='Checkbox text' />
          <button type='submit' formNoValidate>
            Submit
          </button>
        </Form>

        <Form submitAction={submitAction} invalidAction={invalidAction}>
          <Input name='someText' label='Some text' minLength='4' errorMessage='Error' />
          <button type='submit' formNoValidate>
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default App;
