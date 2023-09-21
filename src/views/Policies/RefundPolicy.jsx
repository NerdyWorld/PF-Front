import React from 'react'
import styles from "./Policy.module.css"
import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {

  const navigate = useNavigate();


  return ( 
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={()=> navigate("/home")}>
        <i className="fa-solid fa-caret-left fa-2xl"></i>
      </div>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="abc" />
      </div>
      <h1>Refund Policy</h1>
      <section>
        <h2>Refund Eligibility</h2>
        <p>We are committed to providing the best user experience. If you are not satisfied with your purchase from Soul Music, you may be eligible for a refund. To be eligible for a refund, please review the following conditions:</p>
        <ul>
            <li>The refund request must be made within 30 days from the date of purchase.</li>
            <li>The purchase must have been made directly through our website.</li>
            <li>The product or service for which you are requesting a refund must be in its original condition and not have been used excessively.</li>
        </ul>
      </section>

      <section>
          <h2>How to Request a Refund</h2>
          <p>To request a refund, please follow these steps:</p>
          <ol>
              <li>Contact our customer support team at <b>henrifyb@gmail.com</b> and provide your order details.</li>
              <li>Explain the reason for your refund request.</li>
              <li>Our team will review your request and respond within 24hs.</li>
              <li>If your refund request is approved, we will process the refund to the original payment method used for the purchase.</li>
          </ol>
      </section>

      <section>
          <h2>Contact Us</h2>
          <p>If you have any questions or concerns about our refund policy, please contact our customer support team at [customer support email or phone number].</p>
      </section>

      <section>
          <p>This refund policy was last updated on Aug 10, 2023.</p>
      </section>
    </div>
   );
}
 
export default RefundPolicy;