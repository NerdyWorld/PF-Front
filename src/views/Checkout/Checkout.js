import React, { useEffect, useState } from 'react';
import{ loadStripe } from "@stripe/stripe-js";
import { STRIPE_P_KEY } from '../../utils/utilities';
import axios from "axios";
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

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
    <div>
      {
        stripePromise && clientSecret &&
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <form onSubmit={handleSubmit}>
            <button>
              <span>
                {
                  isProcessing ? "Processing..." : "Pay now"
                }
              </span>
            </button>
          </form>
        </Elements>
      }
    </div>
   );
}
 
export default Checkout;