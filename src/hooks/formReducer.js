export function formValuesReducer(formValues, { type, payload }) {
  switch (type) {
    case 'FORM_CHANGE':
      return {
        ...formValues,
        ...payload,
      };
    default:
      throw new Error();
  }
}

export function formInvalidsReducer(invalids, { type, payload }) {
  switch (type) {
    case 'FORM_CHECK':
      return payload;
    default:
      throw new Error();
  }
}

