import React from 'react';
import useFormHook, { FormContext } from '../../hooks/formHook';

const Form = ({ children, submitAction, invalidAction, ...rest }) => {
  const { handleSubmit, formValues, invalids, handleChange } = useFormHook({
    submitAction,
    invalidAction,
  });

  return (
    <FormContext.Provider value={{ formValues, invalids, handleChange }}>
      <form {...rest} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
