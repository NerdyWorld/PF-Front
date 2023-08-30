import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react";

const Stripe = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState()
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async() => {

    if(!stripe || !elements) {
        return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: window.location.origin
        }
    })

    if(error){
        setMessage(error.message)
    }else{

    };
    setIsProcessing(false);
  }

  useEffect(() => {
    if(!stripe){
        return;
    };
    const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
    );

    if(clientSecret){
       stripe.retrievePaymentIntent(clientSecret)
    .then(({paymentIntent}) => {
        console.log(paymentIntent);
    })  
    }
   
  }, [stripe]);

    return (
        <div>
        <PaymentElement />
        <button disabled={isProcessing} onClick={handlePay}>
            <span>
                {
                    isProcessing ? "Processing..." : "Pay now" 
                }
            </span>
        </button>
        </div>
    )
}

export default Stripe;
