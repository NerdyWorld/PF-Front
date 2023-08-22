import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/globalContext";
import Login from "./views/Login/Login";
import "./App.css"
import { Translator } from 'react-auto-translate';
import { initMercadoPago } from '@mercadopago/sdk-react'
import { MP_KEY } from "./utils/utilities";
import Router from "./router";



function App() {

  const context = useContext(GlobalContext);
  const { setLogged, language, setLanguage } = context;




  // LOGIN PERSISTANCE
  useEffect(() => {
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem("nerdyUser"));
    if(getUserFromLocalStorage){
      setLogged(getUserFromLocalStorage);
    }else{
      setLogged(false);
    };
    
    const getLanguageFromLocalStorage = localStorage.getItem("nerdyLanguage");
    if(getLanguageFromLocalStorage){
      setLanguage(getLanguageFromLocalStorage);
    };

    initMercadoPago(MP_KEY);
  
  }, []);

  return (
    <div>
      {/* TRANSLATOR PROVIDER, TIENE QUE ESTAR EN APP.JS PORQUE NECESITA ACCESO AL CONTEXT API */}
      <Translator
        from="en"
        to={language}
        googleApiKey='AIzaSyDsFDcb0OMaD049cN99Pxr95sJmO863NFo'
      >
        <Router/>
      </Translator>
    </div>
  );
}

export default App;
