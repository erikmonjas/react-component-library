import React, { useState, useContext } from "react";

export const FormContext = React.createContext("");

const Form = ({ children }) => {
  const [state, setState] = useState("");

  const handleChange = e => {
    setState(e.target.value);
  };

  return (
    <FormContext.Provider value={state}>
      <input type="text" onChange={handleChange} />
      {children}
    </FormContext.Provider>
  );
};

export default Form;
