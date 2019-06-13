import React from 'react';
import Tabs from './components/Tabs';
import Tab from './components/Tabs/Tab';
import useFormHook from './hooks/formHook';
import Input from './components/Form/Input';

const App = () => {
  const submitAction = formValues => console.log('Valid', formValues);

  const invalidAction = invalids => console.log('Invalid', invalids);

  const { handleSubmit, handleChange, formValues, invalids } = useFormHook({ submitAction, invalidAction })

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
        <form onSubmit={handleSubmit}>
              <Input
                handleChange={handleChange}
                invalids={invalids}
                name='texto'
                label='Texto'
                errorMessage='Error'
                defaultValue={'Default value'}
                minLength='5'
              />
              <Input
                handleChange={handleChange}
                invalids={invalids}
                name='otroTexto'
                label='Otro texto'
                minLength='4'
                errorMessage='Error'
                valid={!!formValues.otroTexto &&
                  formValues.otroTexto.value.includes('hi')
                }
              />
              <button type='submit' formNoValidate>
                Submit
              </button>
        </form>
      </div>
    </>
  );
};

export default App;
