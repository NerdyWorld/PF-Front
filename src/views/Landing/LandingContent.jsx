import React, { useEffect, useRef, useState } from "react";
import styles from "./LandingContent.module.css";

const LandingContent = ({ imageUrl, buttonText, brandName, onButtonClick }) => {
  const [isButtonFixed, setIsButtonFixed] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const wrapperRef = useRef(null);
  

  const handleScroll = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
  
      if (rect.bottom > 0 && rect.bottom <= window.innerHeight / 2) {
        setIsButtonFixed(true);
      } else {
        setIsButtonFixed(false);
      }
    }
};

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <>
    <div className={styles.brandContainer}>
        <h2 className={styles.brandName}>{brandName}</h2>
      </div>
    <div className={styles.imageContainer}>   
   
      <div className={styles.imgWrapper} ref={wrapperRef}>
        <img className={styles.imgGucci} src={imageUrl} alt={buttonText} />
        <button
          className={`${styles.exploreButton} ${
            isButtonFixed ? styles.fixedButton : ""
          }`}
          style={{ display: isButtonVisible ? "block" : "none" }}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
      
    </div>
    </>
  );
};

export default LandingContent;
