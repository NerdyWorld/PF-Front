import React, { useContext, useEffect, useRef } from 'react';
import styles from "./ShippingSection.module.css";
import { GlobalContext } from '../../../context/globalContext';
import ShippingCard from '../../Utils/CheckoutShipping/CheckoutShip';

const Shipping = () => {

  const globalContext = useContext(GlobalContext);
  const { refTop, shippingInfo, setShippingInfo, setShowPayment, setShowShipping, refToastCheckoutAutocomplete, setShowInfo } = globalContext;

  const handleManualAddress = (e) =>{
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    })
  };

  const handleNext = () =>{
    if(shippingInfo.firstName && shippingInfo.lastName){
      setShowShipping(false);
      setShowPayment(true);
    }else{
      refToastCheckoutAutocomplete.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    }
  };


  // MAIN UEF
  useEffect(() => {
    refTop.current?.scrollIntoView();
  }, []);

  return ( 
    <div className={styles.wrapper}>
      <h3>Choose a Shipping Method</h3>
      {/* STEP 1 ICON */}
      <div className={styles.stepDiv}> 
        <div className={styles.step}>
          <span>1</span>
        </div>
        <span>Please tell us who's going to receive your package!</span>
      </div>
      {/* STEP 1 INFO */}
      <div className={styles.form}>
      <div className='form-floating mb-1 w-100 p-1'>
        <input type="text" id='city' className='form-control' name='firstName' onChange={handleManualAddress} value={shippingInfo.firstName} />
        <label htmlFor="city">First Name</label>
      </div>
      <div className='form-floating mb-1 w-100 p-1'>
        <input type="text" id='city' className='form-control' name='lastName' onChange={handleManualAddress} value={shippingInfo.lastName} />
        <label htmlFor="city">Last Name</label>
      </div>
      {/* <div className='form-floating mb-1 w-100 p-1'>
        <input type="text" id='city' className='form-control' name='email' onChange={handleManualAddress} value={shippingInfo.email} />
        <label htmlFor="city">Email</label>
      </div> */}
      </div>

      {/* STEP 2 ICON */}
      <div className={styles.stepDiv}> 
        <div className={styles.step}>
          <span>2</span>
        </div>
        <span>Please choose a shipping method!</span>
      </div>

      {/* STEP 2 INFO */}
      <ShippingCard 
        title="Free"
        description={"Your purchase will be delivered in 5 - 7 business days."}
        price={"0"}
      />
      <ShippingCard 
        title="Express"
        description={"Your purchase will be delivered in 3 - 5 business days."}
        price={"5.50"}
      />
      <ShippingCard 
        title="Fasty"
        description={"Your purchase will be delivered in 1 - 3 business days."}
        price={"8.99"}
      />

      {/* BUTTONS */}
      <div className='d-flex justify-content-between align-items-center'>
        <div className={styles.prev} onClick={()=> { setShowShipping(false) ; setShowInfo(true)}}>
          <i className="fa-solid fa-caret-left fa-xl"></i>
        </div>
        <div className={styles.next}>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
      
      {/* PADDING DIV */}
      <div style={{backgroundColor:"#eaeaea", height:"1.5rem", width:"100%"}}></div>

    </div>
   );
}
 
export default Shipping;