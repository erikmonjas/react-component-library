import React, { useState } from "react";

export const DemoContext = React.createContext("");

const Demo = ({ children }) => {
  const [state, setState] = useState("");

  const handleChange = e => {
    setState(e.target.value);
  };

  return (
    <DemoContext.Provider value={state}>
      <input type="text" onChange={handleChange} />
      {children}
    </DemoContext.Provider>
  );
};

export default Demo;
