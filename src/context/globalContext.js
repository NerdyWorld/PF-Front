import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{

  const [logged, setLogged] = useState(false);


  // LOGIN PERSISTANCE
  useEffect(() => {
    if(logged){
      const getUserFromLocalStorage = localStorage.getItem("tekiUser");
      if(!getUserFromLocalStorage){
        localStorage.setItem("tekiUser", JSON.stringify(logged));
      };
    }else{
      const getUserFromLocalStorage = localStorage.getItem("tekiUser");
      if(getUserFromLocalStorage){
        localStorage.removeItem("tekiUser");
      };
    }
  }, [logged]);

  const data = {
    logged,
    setLogged
  };

  return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
};