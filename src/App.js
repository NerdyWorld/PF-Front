import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/globalContext";
import "./App.css"
import { Toast } from 'primereact/toast';
import { Translator } from 'react-auto-translate';
import { initMercadoPago } from '@mercadopago/sdk-react'
import { MP_KEY } from "./utils/utilities";
import Router from "./router";
import jwt_decode from "jwt-decode";
import { getUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import { getAllProducts, getColors } from "./features/products/productSlice";




function App() {

  const dispatch = useDispatch();

  // CONTEXT API
  const context = useContext(GlobalContext);
  const { setLogged, language, setLanguage, setCurrency, refAutocomplete, handleChangeAddress, refToastCheckoutAutocomplete } = context;


  // GOOGLE PLACES AUTOCOMPLETE
  const mapApiJs = "https://maps.googleapis.com/maps/api/js";

  const loadAsyncScript = (src) =>{
    return new Promise((resolve)=>{
      const script = document.createElement("script");
      Object.assign(script, {
        type: "text/javascript",
        async: true,
        src
      });
      script.addEventListener("load", ()=> resolve(script));
      document.head.appendChild(script);
    })
  };

  const initMap = () =>{
    if(window.google){
      return Promise.resolve();
    };

    const src = `${mapApiJs}?key=AIzaSyDsFDcb0OMaD049cN99Pxr95sJmO863NFo&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  const initAutocomplete = () =>{
    if(!refAutocomplete.current){
      return;
    }
    const autocomplete = new window.google.maps.places.Autocomplete(refAutocomplete.current);
    autocomplete.setFields(["address_component", "geometry", "formatted_address"]);
    autocomplete.addListener("place_changed", ()=> handleChangeAddress(autocomplete))
  }


  

  // MAIN UEF

  useEffect(() => {

    // LOGIN PERSISTANCE
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem("nerdyUser"));
    if(getUserFromLocalStorage){
      setLogged(getUserFromLocalStorage);
      
      // Decode the userId and dispatch a petition to the back to get the user data
      const decodedId = jwt_decode(getUserFromLocalStorage.userId);
      dispatch(getUser(decodedId.id));
    }else{
      setLogged(false);
    };
    
    // LANGUAGE PERSISTANCE
    const getLanguageFromLocalStorage = localStorage.getItem("nerdyLanguage");
    if(getLanguageFromLocalStorage){
      setLanguage(getLanguageFromLocalStorage);
    };


    // CURRENCY PERSISTANCE
    const getCurrencyFromLocalStorage = localStorage.getItem("nerdyCurrency");
    if(getCurrencyFromLocalStorage){
      setCurrency(getCurrencyFromLocalStorage);
    };


    
    // # Mercado Pago Mounting
    initMercadoPago(MP_KEY);

    // # Google Places API Mounting
    // initMap().then(() => initAutocomplete())

    dispatch(getAllProducts());
    dispatch(getColors());
  
  }, []);

  return (
    <div>
      <Toast ref={refToastCheckoutAutocomplete} position='top-left'></Toast>

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
