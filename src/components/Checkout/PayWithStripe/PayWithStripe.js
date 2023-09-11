import React, { useContext, useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { GlobalContext } from '../../../context/globalContext';

const Stripe = () => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setPayWithStripe } = globalContext;

  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async() =>{

    if(!stripe || !elements){
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout"
      }
    });

    if(error){
      // Action
      console.log(error.message);
    };

    setIsProcessing(false);
  };

  useEffect(() => {
    if(!stripe){
      return;
    };

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if(clientSecret){
      stripe.retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) =>{
        console.log(paymentIntent.status);
      })
    }

  }, [stripe]);


  const handleBack = () =>{
    setPayWithStripe(false);
  };

  return ( 
    <div className='w-100 px-5'>
      <PaymentElement/>
      <div className='d-flex w-100 justify-content-between align-items-center mt-5'>
          <div onClick={handleBack} style={{width: "20px", height: "20px"}} className='d-flex align-items-center'>
            <i className="fa-solid fa-caret-left fa-lg ps-2" style={{color: "#777777", cursor: "pointer"}}></i>
          </div>
          <button disabled={isProcessing} onClick={handlePay} className='stripeButton'>
            <span>
              {
                isProcessing ? "Processing..." : "Pay now"
              }
            </span>
          </button>
      </div>
    </div>
   );
}
 
export default Stripe;