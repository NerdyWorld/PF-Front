import React, { useContext } from 'react';
import styles from "./Footer.module.css";
import { GlobalContext } from '../../context/globalContext';

const Footer = ({refFooter}) => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setLanguage, language } = globalContext;

  return ( 
    <div className={styles.footer} ref={refFooter}>
          <h5>RIVELLE</h5>
          <div className={styles.languageContainer}>
            <div className={styles.world}>
              <i className='bx bx-world'></i>
            </div>
            <div className={styles.languages}>
              <div onClick={()=> setLanguage("en")} className={styles.language} style={{borderLeft: "1px solid white", paddingLeft: "0.8rem"}}>
                <span className={language === "en" && styles.chosenLanguage}>EN</span>
              </div>
              <div onClick={()=> setLanguage("es")} className={styles.language}>
                <span className={language === "es" && styles.chosenLanguage}>ES</span>
              </div>
              <div onClick={()=> setLanguage("fr")} className={styles.language}>
                <span className={language === "fr" && styles.chosenLanguage}>FR</span>
              </div>
              <div onClick={()=> setLanguage("it")} className={styles.language}>
                <span className={language === "it" && styles.chosenLanguage}>IT</span>
              </div>
              <div onClick={()=> setLanguage("de")} className={styles.language}>
                <span className={language === "de" && styles.chosenLanguage}>DE</span>
              </div>
              <div onClick={()=> setLanguage("pt")} className={styles.language}>
                <span className={language === "pt" && styles.chosenLanguage}>PT</span>
              </div>
            </div>
          </div>
      </div>
   );
}
 
export default Footer;