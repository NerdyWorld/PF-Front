import React from 'react'
import styles from "./Policy.module.css"
import { useNavigate } from 'react-router-dom';


const ShipppingPolicy = () => {

  const navigate = useNavigate();


  return ( 
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={()=> navigate("/home")}>
        <i className="fa-solid fa-caret-left fa-2xl"></i>
      </div>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="abc" />
      </div>
      <h1>Shipping Policy</h1>
      <section>
        <h2>Shipping Information</h2>
        <p>We are excited to provide you with the best possible experience when it comes to shipping your orders. Below you'll find important information about our shipping process:</p>
    </section>

    <section>
        <h2>Processing Time</h2>
        <p>Your order will typically be processed and shipped within 10 business days from the date of purchase.</p>
    </section>

    <section>
        <h2>Shipping Methods</h2>
        <p>We offer a range of shipping options to ensure your order reaches you in a timely and convenient manner. Shipping methods available include:</p>
        <ul>
            <li>Standard Shipping: Estimated delivery time of 5 - 7 business days.</li>
            <li>Express Shipping: Estimated delivery time of 3 - 5 business days.</li>
            <li>Premium Shipping: Estimated delivery time of 1 business days.</li>
        </ul>
    </section>

    <section>
        <h2>Shipping Costs</h2>
        <p>Shipping costs will vary based on your selected shipping method, order value, and destination. The exact shipping cost will be calculated and displayed during the checkout process.</p>
    </section>

    <section>
        <h2>Order Tracking</h2>
        <p>Once your order is shipped, you will receive a confirmation email with tracking information. You can use this information to track the status and estimated delivery date of your order.</p>
    </section>

    <section>
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about our shipping policy, please contact our customer support team at [customer support email or phone number].</p>
    </section>

    <section>
        <p>This shipping policy was last updated on Aug 10, 2023.</p>
    </section>
    </div>
   );
}
 
export default ShipppingPolicy;