import { createContext, useState } from "react";


export const globalContext = createContext();

export const GlobalProvider = ({children}) =>{

  const [logged, setLogged] = useState(false);

  const data = {
    logged,
    setLogged
  };

  return <globalContext.Provider value={data}>{children}</globalContext.Provider>
};