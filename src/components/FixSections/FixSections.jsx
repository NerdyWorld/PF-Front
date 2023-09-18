import React, { useEffect, useState } from 'react';
import styles from "./FixSections.module.css";
import { useInView } from 'react-intersection-observer';



const FixSections = ({fixSections}) => {


  return ( 
    <div className={`${styles.sections} ${fixSections && styles.fixed}`}>
        <div className={styles.logo}>
          <span>My</span>
          <h5>MIH</h5>
        </div>
        <div className={styles.section} style={{borderLeft:"1px solid #eae8e4", borderBottom:"2.5px solid #1f1f1f"}}>
          <span>Overview</span>
        </div>
        <div className={styles.section}>
          <span>My Profile</span>
        </div>
        <div className={styles.section}>
          <span>My Orders</span>
        </div>
        <div className={styles.section}>
          <span>My Wishlist</span>
        </div>
        <div className={styles.section}>
          <span>My Reviews</span>
        </div>
      </div>
   );
}
 
export default FixSections;