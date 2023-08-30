import { useContext, useEffect, useState } from "react";
import { GlobalContext, useThemeContext } from "./context/globalContext";
import Login from "./views/Login/Login";
import "./App.css";
import Router from "./router";
import { Translator } from "react-auto-translate";
import Checkout from "./views/Checkout/Checkout";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { MP_KEY } from "./utils/utilities";
import ReactSwitch from "react-switch";
import Header from "./components/Header";
import Layout from "./components/Layout";


function App() {
  const context = useContext(GlobalContext);
  const { setLogged, language, setLanguage } = context;


  // LOGIN PERSISTANCE
  useEffect(() => {
    const getUserFromLocalStorage = JSON.parse(
      localStorage.getItem("nerdyUser")
    );
    if (getUserFromLocalStorage) {
      setLogged(getUserFromLocalStorage);
    } else {
      setLogged(false);
    }

    const getLanguageFromLocalStorage = localStorage.getItem("nerdyLanguage");
    if (getLanguageFromLocalStorage) {
      setLanguage(getLanguageFromLocalStorage);
    }

    initMercadoPago(MP_KEY);
  }, []);

  return (
    <div>     
        {/* TRANSLATOR PROVIDER, TIENE QUE ESTAR EN APP.JS PORQUE NECESITA ACCESO AL CONTEXT API */}
        <Translator
          from="en"
          to={language}
          googleApiKey="AIzaSyDsFDcb0OMaD049cN99Pxr95sJmO863NFo"
        >
        </Translator>
           
      <Router />
    </div>
  );
}

export default App;
