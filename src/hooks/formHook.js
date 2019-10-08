import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { formValuesReducer, formInvalidsReducer } from './formReducer'

export const FormContext = React.createContext({})

const useFormHook = ({ initialValues = {}, invalidAction, submitAction }) => {
  const [formValues, dispatch] = useReducer(formValuesReducer, initialValues)
  const [invalids, dispatchInvalids] = useReducer(formInvalidsReducer, [])

  const handleChange = mutation => {
    dispatch({ type: 'FORM_CHANGE', payload: mutation })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const invalidKeys = Object.keys(formValues).filter(element => {
      if (formValues[element].valid === false) {
        return element
      } else {
        return false
      }
    })

    const newInvalids = invalidKeys.map(invalid => {
      return { [invalid]: formValues[invalid] }
    })

    dispatchInvalids({ type: 'FORM_CHECK', payload: newInvalids })

    if (newInvalids.length > 0) {
      invalidAction(newInvalids)
    } else {
      submitAction(formValues)
    }
  }

  return { handleSubmit, handleChange, formValues, invalids }
}

useFormHook.PropTypes = {
  initialValues: PropTypes.object,
  invalidAction: PropTypes.func.isRequired,
  submitAction: PropTypes.func.isRequired,
}

useFormHook.defaultProps = {
  initialValues: {},
}

export default useFormHook
