import React, { useEffect, useState } from 'react';
import{ loadStripe } from "@stripe/stripe-js";
import { STRIPE_P_KEY, STRIPE_S_KEY } from '../../utils/utilities';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(STRIPE_P_KEY);

const Checkout = () => {

  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // STRIPE PAYMENT IMPLEMENTATION
    (async()=>{
      const getClientSecret = await axios.post("http://localhost:3001/api/stripe/create-payment-intent", {
        data: {
          currency: "ars",
          amount: 1900
        }
      });
  
      setClientSecret(getClientSecret.data.clientSecret);
    })()
  }, []);

  return ( 
    <div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>

      </Elements>
    </div>
   );
}
 
export default Checkout;