import { createContext, useEffect, useRef, useState } from "react";


export const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{


  // FUNCTIONS
  const getPriceByCurrency = (price) =>{
    return currency === "EUR" ? `EUR ${Math.floor(price * 0.93)}` : currency === "CAD" ? `CAD ${Math.floor(price * 1.36)}` : currency === "ARS" ? `ARS ${Math.floor(price * 750)}` : currency === "AUD" ? `AUD ${Math.floor(price * 1.57)}` : `USD ${price}`
  };

  const sortByName = (a, b) =>{
    if(a.name.trimStart() < b.name.trimStart()){
      return -1
    };
    if(a.name.trimStart() > b.name.trimStart()){
      return 1;
    };
    return 0
  };

  const sortByPriceDecrease = (a, b) =>{
    if(Number(a.price) < Number(b.price)){
      return 1
    };
    if(Number(a.price) > Number(b.price)){
      return -1;
    };
    return 0
  };

  const sortByPriceIncrease = (a, b) =>{
    if(Number(a.price) < Number(b.price)){
      return -1
    };
    if(Number(a.price) > Number(b.price)){
      return 1;
    };
    return 0
  };

  // LANDING
  const [currency, setCurrency] = useState("USD");
  
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  useEffect(() => {
    if(currency.length){
      localStorage.setItem("nerdyCurrency", currency);
    };
  }, [currency]);


  // FILTERS
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFilteredProducts, setShowFilteredProducts] = useState(false);
  const [finalFilteredProducts, setFinalFilteredProducts] = useState([]);

  // HEADER
  const refHeader = useRef();
  
  // HOME VIDEOS REFS
  const refLV = useRef();
  const refLVVideo = useRef();
  const refGucci = useRef();
  const refGucciVideo = useRef();
  const refFendi = useRef();
  const refFendiVideo = useRef();
  const refDolce = useRef();
  const refDolceVideo = useRef();
  const refJimmy = useRef();
  const refJimmyVideo = useRef();

  // MODALS LOGIN, CART
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);


  // GOOGLE AUTOCOMPLETE
  const refAutocomplete = useRef();
  const refToastCheckoutAutocomplete = useRef();

  const [autocompleteShippingInfo, setAutocompleteShippingInfo] = useState(null);
  const [zipCodeRequired, setZipCodeRequired] = useState(false);

  const handleChangeAddress = (autocomplete) =>{
    const location = autocomplete.getPlace();
    console.log(location);

    const locObj = {
      street: "",
      streetNumber: "",
      zipCode: "",
      city: "",
      state:"",
      country: ""
    };
  

    if(!location.address_components){
      // Toast - Invalid Address
    };

    location.address_components.forEach(component => {
      const types = component.types;
      const value = component.long_name;
      const shortValue = component.short_name;
      

      if(types.includes("locality")){
        locObj.city = value;
      }

      if(types.includes("administrative_area_level_1")){
        locObj.state = value;
      }

      if(types.includes("postal_code")){
        locObj.zipCode = value;
      }

      if(types.includes("country")){
        locObj.country = shortValue; 
      }

      if(types.includes("route")){
        locObj.street = value; 
      }

      if(types.includes("street_number")){
        locObj.streetNumber = value; 
      }

    });

    setAutocompleteShippingInfo(locObj);

  };



  // LOGIN & LANGUAGE
  const [logged, setLogged] = useState(false);
  const [language, setLanguage] = useState("en");




// ------ CHECKOUT STARTS ------>
  // Initial States
  const shippingInfoInitialState = {
    firstName: "",
    lastName: "",
    apartment: "",
    street: "",
    streetNumber: "",
    zipCode: "",
    city: "",
    state:"",
    country: "US"
  }
  const billingInfoInitialState = {
    firstName: "",
    lastName: "",
    apartment: "",
    email: "",
    street: "",
    streetNumber: "",
    zipCode: "",
    city: "",
    state:"",
    country: "US"
  }

  // ZipCode Input Modal Activator Ref
  const refZipCode = useRef();
  
  // BreadCrumb Ref, to scroll to the top in the first load 
  const refTop = useRef();


  // Shipping & Billing Info State ->
  const [shippingInfo, setShippingInfo] = useState(shippingInfoInitialState);
  const [billingInfo, setBillingInfo] = useState(billingInfoInitialState);
  const [shippingMethod, setShippingMethod] = useState("Free");
  const [sameAsShipping, setSameAsShipping] = useState(false);

  // Right Section Components Controller
  const [showInfo, setShowInfo] = useState(true);
  const [showShipping, setShowShipping] = useState(false);
  const [showPayment, setShowPayment] = useState(false);


  // PAY WITH STRIPE
  const [payWithStripe, setPayWithStripe] = useState();


  const [showProductModal, setShowProductModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [showZipCodeModal, setShowZipCodeModal] = useState(false);
  const [showZoomProduct, setShowZoomProduct] = useState(false);

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


  // GOOGLE AUTOCOMPLETE
  useEffect(() => {
    console.log(autocompleteShippingInfo);
    if(autocompleteShippingInfo){
      if(!autocompleteShippingInfo.street || !autocompleteShippingInfo.streetNumber || !autocompleteShippingInfo.city || !autocompleteShippingInfo.state || !autocompleteShippingInfo.country){
        // TOAST - INVALID ADDRESS
        return refToastCheckoutAutocomplete.current.show({life: 5000, severity: "warn", summary: "We're sorry!", detail: "Please provide us an address with more information"});
      }else if(!autocompleteShippingInfo.zipCode){
        // DIRECCION VALIDA, PERO FALTA ZIPCODE.
        setZipCodeRequired(true);
        setShippingInfo({
          ...shippingInfo,
          street: autocompleteShippingInfo.street,
          streetNumber: autocompleteShippingInfo.streetNumber,
          city: autocompleteShippingInfo.city,
          state: autocompleteShippingInfo.state,
          zipCode: autocompleteShippingInfo.zipCode,
          country: autocompleteShippingInfo.country
        })
      }else{
        // DIRECCION VALIDA
        setShippingInfo({
          ...shippingInfo,
          street: autocompleteShippingInfo.street,
          streetNumber: autocompleteShippingInfo.streetNumber,
          city: autocompleteShippingInfo.city,
          state: autocompleteShippingInfo.state,
          zipCode: autocompleteShippingInfo.zipCode,
          country: autocompleteShippingInfo.country
        })
      }
    }
  }, [autocompleteShippingInfo]);


  const data = {
    logged,
    setLogged,
    language,
    setLanguage,
    shippingInfoInitialState,
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
    setShowPayment,
    refAutocomplete,
    handleChangeAddress,
    zipCodeRequired,
    setZipCodeRequired,
    refToastCheckoutAutocomplete,
    showProductModal,
    setShowProductModal,
    showLearnMoreModal,
    setShowLearnMoreModal,
    showZipCodeModal,
    setShowZipCodeModal,
    refZipCode,
    sameAsShipping,
    setSameAsShipping,
    refTop,
    showZoomProduct,
    setShowZoomProduct,
    currency,
    setCurrency,
    refHeader,
    showLoginModal,
    setShowLoginModal,
    showCartModal,
    setShowCartModal,
    showCollectionModal,
    setShowCollectionModal,
    showSearchModal,
    setShowSearchModal,
    showCurrencyDropdown,
    setShowCurrencyDropdown,
    showLanguageModal,
    setShowLanguageModal,
    getPriceByCurrency,
    sortByName,
    sortByPriceDecrease,
    sortByPriceIncrease,
    showFilterModal,
    setShowFilterModal,
    showFilteredProducts,
    setShowFilteredProducts,
    finalFilteredProducts,
    setFinalFilteredProducts,
    refLV,
    refLVVideo,
    refGucci, 
    refGucciVideo,
    refFendi,
    refFendiVideo,
    refDolce,
    refDolceVideo,
    refJimmy,
    refJimmyVideo
  };

  return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
};