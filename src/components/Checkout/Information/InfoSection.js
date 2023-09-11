import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./InfoSection.module.css"
import { GlobalContext } from '../../../context/globalContext';
import Swal from 'sweetalert2';
import '@sweetalert2/themes/dark/dark.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 




const Information = () => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { refTop, refAutocomplete, refToastCheckoutAutocomplete, refZipCode, handleChangeAddress, shippingInfo, setShippingInfo, zipCodeRequired, setZipCodeRequired, shippingInfoInitialState, setShowInfo, setShowShipping, setShowZipCodeModal, showInfo } = globalContext;

  // Autocomplete selected?
  const [autocomplete, setAutocomplete] = useState(true);


  // Adddress inserted manually, not with Google Autocomplete
  const handleManualAddress = (e) =>{
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const submitManualAddress = () =>{
    if(shippingInfo.street && shippingInfo.streetNumber && shippingInfo.city && shippingInfo.state && shippingInfo.zipCode && shippingInfo.country){
      fetch("https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDsFDcb0OMaD049cN99Pxr95sJmO863NFo", {
          method: "POST",  
          body: JSON.stringify({
              address:{
                regionCode: shippingInfo.country,
                locality: shippingInfo.city,
                postalCode: shippingInfo.zipCode,
                addressLines: [`${shippingInfo.street} ${shippingInfo.streetNumber}`]
              }
            })
          })
          .then(res => res.ok ? res.json() : Promise.reject(res))
          .then(json => {
            console.log(json);
            const unconfirmedFields = json.result.address.unconfirmedComponentTypes;
            if(!unconfirmedFields){
                setShowInfo(false);
                setShowShipping(true);
            };
            if(unconfirmedFields && unconfirmedFields.includes("postal_code") && unconfirmedFields.length > 1){
              // Invalid Address
              return refToastCheckoutAutocomplete.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Google Services couldn't validate your address, please check if the information is correct!"})
            };
            if(unconfirmedFields && !unconfirmedFields.includes("postal_code") && unconfirmedFields.length > 0){
              // Invalid Address
              return refToastCheckoutAutocomplete.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Google Services couldn't validate your address, please check if the information is correct!"})
            };
            if(unconfirmedFields && unconfirmedFields.includes("postal_code") && unconfirmedFields.length === 1){
              // Codigo postal no confirmado, suele pasar aunque el codigo postal sea correcto
              Swal.fire({
                icon: "warning",
                iconColor:"#ba3763",
                background:"whitesmoke",
                buttonsStyling:false,
                title: `<p>Take into notice</p>`,
                html:`
                <p>
                Google Services can not tell if your zipCode is 100% correct, if you think your zipCode is properly set, please click <b>continue</b>.
                </p>
                `,
                showConfirmButton: true,
                confirmButtonText: "Continue",
                confirmButtonColor:"#1f1f1f",
                showDenyButton: true,
                denyButtonText:"Nope",
                denyButtonColor:"grey",
                denyButtonAriaLabel:"black",      
                toast: true,
                customClass: {
                  confirmButton: "confirmSwalCheckout",
                  denyButton: "denySwalCheckout",
                }
              }).then(result => {
                if(result.isConfirmed){
                  // Next section (Shipping Method)
                  setShowInfo(false);
                  setShowShipping(true);
                }else if(result.isDenied){
                  return;
                }
              })
            };
            if(unconfirmedFields && unconfirmedFields.length === 0){
              // Exito Total Bebe - A veces Unconfirmed Fields viene vacio cuando no hay error, otras veces no viene. Por eso tenemos doble validacion de exito, esta y al principio.
              setShowInfo(false);
              setShowShipping(true);
            }
          })
          .catch(error => {
            console.log(error);
            refToastCheckoutAutocomplete.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Google Services couldn't validate your address, please verify the information is correct!"});
          })
    }else{
      refToastCheckoutAutocomplete.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    }
  };

  // If Google can't find the zipCode of the address provided.
  useEffect(() => {
    if(zipCodeRequired){
      Swal.fire({
        icon: "warning",
        iconColor:"#ba3763",
        background:"whitesmoke",
        buttonsStyling:false,
        customClass: {
          confirmButton: "confirmSwalCheckout",
          denyButton: "denySwalCheckout",
        },
        title: `<p>We're sorry Nacho!</p>`,
        html: `<p>Google Services couldn't find any valid <b>zipCode</b> for your address. Please insert it manually or set it from scratch manually!</p>`,
        showConfirmButton: true,
        confirmButtonText: "Okay!",
        confirmButtonColor:"#1f1f1f",
        toast: true
      }).then(result => {
        if(result.isConfirmed){
          refZipCode.current.scrollIntoView();
          refZipCode.current.focus();
        }else if(result.isDenied){
          return;
        }
      })
    }
  }, [zipCodeRequired]);

  // Opens the info Modal for the zipCode field in Autocomplete mode
  const handleOpenZipModal = () =>{
    if(zipCodeRequired){
      setShowZipCodeModal(true)
    }else{
      return;
    }
  };


  const goToStep2 = () =>{
    if(shippingInfo.street && shippingInfo.streetNumber && shippingInfo.city && shippingInfo.state && shippingInfo.zipCode && shippingInfo.country){
      if(autocomplete){
          setShowInfo(false);
          setShowShipping(true);
          setZipCodeRequired(false);
      }else{
        submitManualAddress();
      }
    }else{
      refToastCheckoutAutocomplete.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    }
  }


  // --------- GOOGLE PLACES AUTOCOMPLETE INIT ---------->
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

  useEffect(() => {
    if(autocomplete && showInfo){
      // Google Places API Mounting
      initMap().then(() => initAutocomplete());
    };
  }, [autocomplete, showInfo]);



  // MAIN UEF
  useEffect(() => {
    refTop.current?.scrollIntoView();
  }, []);

  

  return ( 
    <div className={styles.wrapper}>

      <h3>Where do we ship your order?</h3>
      <div className={styles.stepDiv}> 
        <div className={styles.step}>
          <span>1</span>
        </div>
        <span>Please tell us where to deliver your collection!</span>
      </div>
      {/* GOOGLE AUTOCOMPLETE OPTION */}
      <div className={styles.gLogoContainer} style={{opacity: autocomplete ? 1 : 0.6}}>
        <div onClick={()=> { setAutocomplete(!autocomplete) ; setShippingInfo(shippingInfoInitialState)}} className={styles.googleLogo}>
          <div className={styles.googleLogoImg}>
            <img src="/images/googleLogo.svg" alt="abc" />
          </div>
          <span>Google Autocomplete</span>
        </div>
      </div>

      {/* SET ADDRESS MANUALLY OPTION */}
      <div className={styles.setAddressContainer} style={{opacity: !autocomplete ? 1 : 0.6}}>
        <div onClick={()=> { setAutocomplete(!autocomplete) ; setShippingInfo(shippingInfoInitialState)}} className={styles.setAddress}>
          <div className={styles.setAddressImg}>
            <img src="/images/signup1.svg" alt="abc" />
          </div>
          <span>Set my address manually</span>
        </div>
      </div>

      {
        autocomplete ? (
          // Autocomplete Option
          <div>
            <div className={styles.autocompleteForm}>
              <div className={styles.autocompleteIcon}>
                <img src="/images/googleLogo.svg" alt="abc" width={20}/>
              </div>
              <div className={styles.autocompleteInfo}>
                <span>You're currently using the Google Places services, click here to </span>
                <span 
                  className='checkout-tooltip'
                  onClick={()=> window.open("https://developers.google.com/maps/documentation/places/web-service/overview")}                
                >
                  learn more.
                </span>
              </div>
              <div className={styles.autocompleteInput}>
                <input type="text" ref={refAutocomplete} placeholder='Enter a location' />
              </div>
              <form className={styles.autocompleteFormForm}>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input readOnly type="text" id='city' className='form-control' value={shippingInfo.city} />
                  <label htmlFor="city">City</label>
                </div>
                <div className='form-floating mb-1 flex-grow-1 p-1'>
                  <input readOnly type="text" id='city' className='form-control' value={shippingInfo.state} />
                  <label htmlFor="city">State</label>
                </div>
                <div className='form-floating mb-1 flex-grow-1 p-1 position-relative'>
                  <input readOnly={zipCodeRequired ? false : true} ref={refZipCode} type="text" id='city' name="zipCode" onChange={handleManualAddress} className='form-control' value={shippingInfo.zipCode} />
                  <div className={styles.infoZipCode} onClick={handleOpenZipModal}>
                    <i className="fa-solid fa-circle-info" style={{color: zipCodeRequired ? "#1E3050" : "#777777"}}></i>
                  </div>
                  <label htmlFor="city">Zip Code</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input readOnly type="text" id='city' className='form-control' value={shippingInfo.country} />
                  <label htmlFor="city">Country</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input readOnly type="text" id='city' className='form-control' value={shippingInfo.street} />
                  <label htmlFor="city">Street</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input readOnly type="text" id='city' className='form-control' value={shippingInfo.streetNumber} />
                  <label htmlFor="city">Street Number</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input type="text" id='city' name='apartment' className='form-control' onChange={handleManualAddress} value={shippingInfo.apartment} />
                  <label htmlFor="city">{"Apartment (optional)"}</label>
                </div>
              </form>
              <div className={styles.goToStep2}>
                <button onClick={goToStep2}>Step 2</button>
              </div>
            </div>
            {/* PADDING DIV */}
            <div style={{backgroundColor:"#eaeaea", height:"1.5rem", width:"100%"}}></div>
          </div>
        ):(
          // Set Manually Option
          <div>
            <div className={styles.formContainer}>
              <div className={styles.formUser}>
                <img src="/images/signUp1.svg" alt="abc" width={30}/>
              </div>
              <div className={styles.formWelcome}>
                <span>Hi Vale! Please tell us where should we send your collection!</span>
              </div>
              <form className={styles.Form}>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input type="text" id='city' className='form-control' name='street' onChange={handleManualAddress} value={shippingInfo.street} />
                  <label htmlFor="city">Street</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input type="text" id='city' className='form-control' name='streetNumber' onChange={handleManualAddress} value={shippingInfo.streetNumber} />
                  <label htmlFor="city">Street Number</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input type="text" id='city' className='form-control' name='apartment' onChange={handleManualAddress} value={shippingInfo.apartment} />
                  <label htmlFor="city">Apartment (optional)</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <input type="text" id='city' className='form-control' name='city' onChange={handleManualAddress} value={shippingInfo.city} />
                  <label htmlFor="city">City</label>
                </div>
                <div className='form-floating mb-1 flex-grow-1 p-1'>
                  <input type="text" id='city' className='form-control' name='state' onChange={handleManualAddress} value={shippingInfo.state} />
                  <label htmlFor="city">State</label>
                </div>
                <div className='form-floating mb-1 flex-grow-1 p-1 position-relative'>
                  <input ref={refZipCode} type="text" id='city' className='form-control' name='zipCode' onChange={handleManualAddress} value={shippingInfo.zipCode} />
                  <div className={styles.infoZipCode} onClick={()=> setShowZipCodeModal(true)}>
                    <i className="fa-solid fa-circle-info" style={{color: "#1E3050", cursor:"pointer"}}></i>
                  </div>
                  <label htmlFor="city">Zip Code</label>
                </div>
                <div className='form-floating mb-1 w-100 p-1'>
                  <select defaultValue={"US"} id='city' className='form-control form-select' name='country' onChange={handleManualAddress}>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="AR">Argentina</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                  <label htmlFor="city">Country</label>
                </div>
              </form>
              <div className={styles.goToStep2}>
                <button onClick={goToStep2}>Step 2</button>
              </div>
            </div>

            {/* PADDING DIV */}
            <div style={{backgroundColor:"#eaeaea", height:"1.5rem", width:"100%"}}></div>
          </div>
        )
      }
    </div>
   );
}
 
export default Information;