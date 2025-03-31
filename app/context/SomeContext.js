// LoadingContext.jsx
import React, { createContext, useState } from "react";

export const SomeContext = createContext();

export const SomeProvider = ({ children }) => {
  const [ok, setOk] = useState("ok"); 

  return (
    <SomeContext.Provider value={{ ok }}>
      {children}
    </SomeContext.Provider>
  );
};
