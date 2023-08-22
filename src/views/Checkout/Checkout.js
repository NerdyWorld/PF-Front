import React, { useContext, useEffect, useState } from 'react';
import styles from "./Checkout.module.css";
import{ loadStripe } from "@stripe/stripe-js";
import { STRIPE_P_KEY } from '../../utils/utilities';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import Stripe from '../../components/Checkout/PayWithStripe/PayWithStripe';
import Payment from '../../components/Checkout/Payment/PaymentSection';
import { GlobalContext } from '../../context/globalContext';
import Information from '../../components/Checkout/Information/InfoSection';
import Shipping from '../../components/Checkout/Shipping/ShippingSection';

const stripePromise = loadStripe(STRIPE_P_KEY);

const Checkout = () => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { 
    payWithStripe, 
    setPayWithStripe ,
    showInfo,
    showShipping,
    showPayment
  } = globalContext;

  // STRIPE IMPLEMENTATION
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // STRIPE PAYMENT IMPLEMENTATION
    (async()=>{
      const getClientSecret = await axios.post("http://localhost:3001/api/stripe/create-payment-intent", {
        data: {
          currency: "usd",
          amount: 1900
        }
      });
  
      setClientSecret(getClientSecret.data.clientSecret);
    })()
  }, []);
  // ------- STRIPE ENDS ----------->




  return ( 
    <div className={styles.wrapper}>
        <div className={styles.left}>

        </div>
        <div className={styles.right}>
          {
            showInfo &&
            <Information/>
          }
          {
            showShipping &&
            <Shipping/>
          }
          {
            showPayment && 
            <Payment setPayWithStripe={setPayWithStripe}/>
          }



          {
            payWithStripe && stripePromise && clientSecret &&
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Stripe/>
            </Elements>
          }
        </div>
    </div>
   );
}
 
export default Checkout;