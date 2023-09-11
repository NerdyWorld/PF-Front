import React, { useContext, useEffect, useState } from 'react';
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import{ loadStripe } from "@stripe/stripe-js";
import { STRIPE_P_KEY } from '../../utils/utilities';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import Stripe from '../../components/Checkout/PayWithStripe/PayWithStripe';
import Payment from '../../components/Checkout/Payment/PaymentSection';
import { GlobalContext } from '../../context/globalContext';
import Information from '../../components/Checkout/Information/InfoSection';
import Shipping from '../../components/Checkout/Shipping/ShippingSection';
import ZipCode from '../../components/Modals/Checkout/ZipCode/zipCode';
import CheckoutModal from '../../components/Modals/Checkout/Products/Product';
import { Helmet } from 'react-helmet';
import CheckoutBreadcrumb from '../../components/Utils/CheckoutBreadcrumb/CheckoutBreadcrumb';
import ZoomProduct from '../../components/Modals/Checkout/Products/ZoomProduct';

const stripePromise = loadStripe(STRIPE_P_KEY);

const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Checkout = () => {

  const navigate = useNavigate();

  // Checkout Grid
  const [showInList, setShowInList] = useState(false);


  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { 
    payWithStripe, 
    showInfo,
    showShipping,
    showPayment,
    setShowProductModal,
    setShowZoomProduct
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
    <div className={`checkout ${styles.wrapper}`}>
    <Helmet title='Checkout'/>

      {/* ------ MODALS ----> */}
        <ZipCode/>
        <CheckoutModal/>
        <ZoomProduct/>
      {/* ------------- */}
        <div className={styles.goBack} onClick={()=> navigate("/home")}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        <div className={styles.left}>
            <div className={styles.leftWelcome}>
                <i className="fa-solid fa-lock fa-xs"></i>
                <span>
                  Your information is secured
                </span>
            </div>
            {/* <div className={styles.leftWe}>
              <i className="fa-solid fa-bag-shopping fa-xl" style={{color: "whitesmoke"}}></i>
              <h3>Rivelle</h3>
            </div> */}
            <div className={styles.totalContainer}>
              <div className={styles.leftTotal}>
                <span>$50.300</span>
                <div className={styles.leftSubTotal}>
                  <span>In</span>
                  <span>Total</span>
                </div>
              </div>
              <div className={styles.grid}>
                <div className={`grid-div ${!showInList && "active"}`}>
                  <i className={`fa-solid fa-grip`} onClick={()=> setShowInList(!showInList)}></i>
                </div>
                <div className={`grid-div ${showInList && "active"}`}>
                  <i className={`fa-solid fa-grip-vertical`} onClick={()=> setShowInList(!showInList)}></i>
                </div>
              </div>
            </div>
          <div className={styles.leftItems}>
            {/* ITEMS */}

            {
              showInList ? (
                dummy.map((el, index) => {
                  return(
                    <div className={styles.leftEachImgList}>
                      <div className={styles.leftEachImgListSub}>
                        <div className={styles.leftEachImg} onClick={()=> setShowZoomProduct(true)}>
                          <img src="/images/lvtest.avif" alt="abc"/>
                        </div>
                        <div className={styles.leftEachImgListSub2}>
                          <span>Pinky Bag Horner'33</span>
                          <span>Louis Vuitton</span>
                        </div>
                      </div>
                      <div className={styles.leftEachImgListSub3}>
                        <span>$7330</span>
                      </div>
                    </div>
                  )
                })
              ):(
                dummy.map(el => {
                  return(
                    <div className={styles.leftEachImg}>
                      <img src="/images/lvtest.avif" alt="abc"/>
                      <div onClick={()=> setShowProductModal(true)}>
                        <i className="fa-solid fa-eye fa-xl"></i>
                      </div>
                    </div>
                  )
                })
              )
            }
            
            
          </div>
          <div className={styles.leftFooter}>
            <span>Powered by Rivélle</span>
            <span>Shopping Policy</span>
          </div>
        </div>

        <div className={styles.right}>
          {
            // THESE ARE THE STEPS
            ((showInfo || showShipping || showPayment) && !payWithStripe) &&
            <CheckoutBreadcrumb/>
          }
          {
            showInfo && !payWithStripe &&
            <Information/>
          }
          {
            showShipping && !payWithStripe &&
            <Shipping/>
          }
          {
            showPayment && !payWithStripe && 
            <Payment/>
          }



          {
            payWithStripe && stripePromise && clientSecret &&
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <div className={styles.stripeDiv}>
                <div>
                  <img src="/images/stripeLogo.svg" alt="abc" width={100}/>
                </div>
                <Stripe/>
              </div>
            </Elements>
          }
        </div>
    </div>
   );
}
 
export default Checkout;