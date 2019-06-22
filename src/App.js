import React from 'react';
import './styles.scss';
import Tabs from './components/Tabs';
import Tab from './components/Tabs/Tab';
import Input from './components/Form/Input/Input';
import Select from './components/Form/Select/Select';
import Checkbox from './components/Form/Checkbox/Checkbox';
import Form from './components/Form';
import RadioGroup from './components/Form/Radio/RadioGroup';
import { FormContext } from './hooks/formHook';

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

  const radioList = [
    { text: 'Radio 0', value: '0' },
    { text: 'Radio 1', value: '1' },
    { text: 'Radio 2', value: '2' },
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
            name='requiredText'
            label='Required text'
            required
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
          <Checkbox
            name='otherCheckbox'
            label='Checkbox text'
            errorMessage='This checkbox is required'
            required
          />
          <RadioGroup radioList={radioList} name='radioGroup' defaultRadio='2' />
          <FormContext.Consumer>
            {({ formValues }) => (
              <>
                <Select
                  label='Initial text'
                  options={selectOptions}
                  name='disabledSelect'
                  errorMessage='Error select'
                  defaultValue='1'
                  disabled={!!formValues.radioGroup && formValues.radioGroup.value !== '1'}
                />
                <Checkbox
                  name='checkbox'
                  label='Checkbox text'
                  defaultChecked
                  disabled={!!formValues.radioGroup && formValues.radioGroup.value === '1'}
                />
              </>
            )}
          </FormContext.Consumer>
          <button type='submit' formNoValidate>
            Submit
          </button>
          <FormContext.Consumer>
            {value => (
              <>
                <button onClick={() => console.log(value.formValues)}>Log values</button>
                <button onClick={() => console.log(value.invalids)}>Log invalids</button>
              </>
            )}
          </FormContext.Consumer>
        </Form>
      </div>
    </>
  );
};

export default App;
