import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{

  // LOGIN & LANGUAGE
  const [logged, setLogged] = useState(false);
  const [language, setLanguage] = useState("en");

  // ------ CHECKOUT STARTS ------>
  // Initial States
  const shipppingInfoInitialState = {
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state:"",
    email: ""
  }
  const billingInfoInitialState = {
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state:"",
    email: ""
  }

  // Shipping & Billing Info State ->
  const [shippingInfo, setShippingInfo] = useState(shipppingInfoInitialState);
  const [billingInfo, setBillingInfo] = useState(billingInfoInitialState);
  const [shippingMethod, setShippingMethod] = useState("");

  // Right Section Components Controller
  const [showInfo, setShowInfo] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showPayment, setShowPayment] = useState(true);


  // PAY WITH STRIPE
  const [payWithStripe, setPayWithStripe] = useState();

    // ------ CHECKOUT ENDS ------>




  // LANGUAGE PERSISTANCE
  useEffect(() => {
    localStorage.setItem("nerdyLanguage", language);
  }, [language]);


  // LOGIN PERSISTANCE
  useEffect(() => {
    if(logged){
      const getUserFromLocalStorage = localStorage.getItem("nerdyUser");
      if(!getUserFromLocalStorage){
        localStorage.setItem("nerdyUser", JSON.stringify(logged));
      };
    }else{
      const getUserFromLocalStorage = localStorage.getItem("nerdyUser");
      if(getUserFromLocalStorage){
        localStorage.removeItem("nerdyUser");
      };
    }
  }, [logged]);


  const data = {
    logged,
    setLogged,
    language,
    setLanguage,
    shipppingInfoInitialState,
    billingInfoInitialState,
    shippingInfo,
    setShippingInfo,
    billingInfo,
    setBillingInfo,
    payWithStripe,
    setPayWithStripe,
    shippingMethod,
    setShippingMethod,
    showInfo,
    setShowInfo,
    showShipping,
    setShowShipping,
    showPayment,
    setShowPayment
  };

  return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
};