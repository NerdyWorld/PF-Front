import { createContext, useState } from "react";


export const LanguageContext = createContext();


export const LanguageProvider = ({children}) =>{

  const [language, setLanguage] = useState("en");


  const data = {
    language,
    setLanguage,
  }

  return <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
};