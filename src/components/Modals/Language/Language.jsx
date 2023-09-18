import React, { useContext } from 'react';
import styles from "./Language.module.css";     
import { GlobalContext } from '../../../context/globalContext';

const LanguageModal = () => {

  const globalContext = useContext(GlobalContext);
  const { showLanguageModal, language, setLanguage } = globalContext;


  return ( 
    <article className={styles.article} style={{opacity: showLanguageModal ? 1 : 0, visibility: showLanguageModal ? "visible" : "hidden", top: showLanguageModal ? "0px" : "-200px"}}>
      <div className={styles.div}>
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
    </article>
   );
}
 
export default LanguageModal;