import React, { useContext, useEffect } from 'react';
import styles from "./CheckoutBreadcrumb.module.css";
import { GlobalContext } from '../../../context/globalContext';


const CheckoutBreadcrumb = () => {

  const globalContext = useContext(GlobalContext);
  const { showInfo, showShipping, showPayment, refTop } = globalContext;


  return ( 
    <div className={styles.breadcrumb}>
        <span ref={refTop} style={{color: showInfo || showShipping || showPayment ? "#ba3763" : "#1f1f1f"}}>Where to?</span>
        <i className="fa-xs fa-solid fa-caret-right" style={{color: showShipping || showPayment ? "#ba3763" : "#1f1f1f"}}></i>
        <span style={{color: showShipping || showPayment ? "#ba3763" : "#1f1f1f"}}>Shipping</span>
        <i className="fa-xs fa-solid fa-caret-right" style={{color: showPayment ? "#ba3763" : "#1f1f1f"}}></i>
        <span style={{color: showPayment ? "#ba3763" : "#1f1f1f"}}>Payment</span>
    </div>
   );
}
 
export default CheckoutBreadcrumb;