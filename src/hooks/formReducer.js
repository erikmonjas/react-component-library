export function formReducer(formValues, { type, payload }) {
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
