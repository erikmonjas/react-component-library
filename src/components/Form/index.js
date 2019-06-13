import { useReducer } from 'react';
import { formValuesReducer, formInvalidsReducer } from '../../hooks/formReducer';

const useFormState = ({initialValues = {}, invalidAction, submitAction}) => {
  const [formValues, dispatch] = useReducer(formValuesReducer, initialValues);
  const [invalids, dispatchInvalids] = useReducer(formInvalidsReducer, [])

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

    const newInvalids = invalidKeys.map(invalid => {
      return { [invalid]: formValues[invalid] };
    });

    dispatchInvalids({ type: 'FORM_CHECK', payload: newInvalids });

    if (newInvalids.length > 0) {
      invalidAction(newInvalids);
    } else {
      submitAction(formValues);
    }
  };

  return { handleChange, formValues, invalids }
}

export default useFormState;