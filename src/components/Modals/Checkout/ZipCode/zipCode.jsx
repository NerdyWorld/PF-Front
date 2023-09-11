import React, { useContext, useRef } from 'react';
import styles from "./zipCode.module.css";
import { GlobalContext } from '../../../../context/globalContext';


const ZipCode = () => {

  const refSlide1 = useRef();
  const refSlide2 = useRef();

  const globalContext = useContext(GlobalContext);
  const { showZipCodeModal, setShowZipCodeModal } = globalContext;

  return ( 
    <article className={styles.article} style={{top: showZipCodeModal ? "0px" : "1000px"}}>
      <div className={styles.div}>
        {/* CLOSE BUTTON */}
        <div className={styles.close} onClick={()=> {setShowZipCodeModal(false) ; refSlide1.current?.scrollIntoView()}}>
          <i className="fa-solid fa-xmark fa-xs"></i>
        </div>

        <div className={styles.slider}>
          <div className={styles.firstSlide} ref={refSlide1}>
            <h3>What is my ZIP Code?</h3>
            <div className='d-flex mt-4 justify-content-center align-items-center w-100'>
              <img src="/images/zipCode.svg" alt="abc" width={100}/>
            </div>
            <div style={{padding: "1.5rem"}}>
              <p>A postal code, also known locally in various English-speaking countries throughout the world as a postcode, post code, PIN or ZIP Code, is a series of letters or digits or both, sometimes including spaces or punctuation, included in a postal address for the purpose of sorting mail.</p>
              <p>If you don't know what is your ZIP Code you can check any Website you prefer, or visit our suggestions in the next slide!</p>
            </div>
          </div>
          <div className={styles.secSlide} ref={refSlide2}>
            <h3>Try these Websites!</h3>
            <div className={styles.argentina}>
              <p>• If you live in Argentina, we recommend you:</p>
              <div className='d-flex align-items-center justify-content-center gap-4'>
                
                <div onClick={()=> window.open("https://www.correoargentino.com.ar/formularios/cpa")}>
                  <img src="/images/correoArg.png" alt="abc" width={100}/>
                </div>
              </div>
            </div>
            <div className={styles.usa}>
              <p>• If you live in USA, we recommend you:</p>
              <div className='d-flex align-items-center justify-content-center gap-4'>
                
                <div onClick={()=> window.open("https://tools.usps.com/zip-code-lookup.htm")}>
                  <img src="/images/usps.svg" alt="abc" width={100}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollers}>
          <div onClick={()=> refSlide1.current?.scrollIntoView()}></div>
          <div onClick={()=> refSlide2.current?.scrollIntoView()}></div>
        </div>
      </div>
    </article>
   );
}
 
export default ZipCode;

// https://www.correoargentino.com.ar/formularios/cpa


// https://tools.usps.com/zip-code-lookup.htm

// https://worldpostalcode.com/what-is-my-zip-code