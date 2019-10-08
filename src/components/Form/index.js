import React from 'react'
import PropTypes from 'prop-types'
import useFormHook, { FormContext } from '../../hooks/formHook'

const Form = ({ children, submitAction, invalidAction, ...rest }) => {
  const { handleSubmit, formValues, invalids, handleChange } = useFormHook({
    submitAction,
    invalidAction,
  })

  return (
    <FormContext.Provider value={{ formValues, invalids, handleChange }}>
      <form {...rest} onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default Form

Form.propTypes = {
  children: PropTypes.any,
  submitAction: PropTypes.func.isRequired,
  invalidAction: PropTypes.func.isRequired,
}
