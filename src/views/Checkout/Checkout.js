import React, { useEffect, useState } from 'react';
import{ loadStripe } from "@stripe/stripe-js";
import { STRIPE_P_KEY } from '../../utils/utilities';
import axios from "axios";
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import Stripe from '../../components/Stripe';
import Payment from '../../components/Payment';

const stripePromise = loadStripe(STRIPE_P_KEY);

const Checkout = () => {

  const [clientSecret, setClientSecret] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  

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




  const handleSubmit = async(e) =>{
    e.preventDefault();
  }

  return ( 
    <div className='checkOut'>
      {
        stripePromise && clientSecret &&
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Stripe />
            <Payment />          
        </Elements>
      }
    </div>
   );
}
 
export default Checkout;