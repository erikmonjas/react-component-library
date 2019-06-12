import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { formReducer } from '../../hooks/formReducer';

const Form = ({ children, submitAction, invalidAction, initialValues = {} }) => {
  const [formValues, dispatch] = useReducer(formReducer, initialValues);

  const handleChange = mutation => {
    dispatch({ type: 'FORM_CHANGE', payload: mutation });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const invalidKeys = Object.keys(formValues).filter(element => {
      if (formValues[element].valid === false) {
        return element;
      }
    });

    const invalids = invalidKeys.map(invalid => {
      return { [invalid]: formValues[invalid] };
    });

    if (invalids.length > 0) {
      invalidAction(invalids);
    } else {
      submitAction(formValues);
    }
  };

  return <form onSubmit={handleSubmit}>{children(handleChange, formValues)}</form>;
};

Form.propTypes = {
  submitAction: PropTypes.func.isRequired,
  invalidAction: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default Form;
