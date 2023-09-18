import React, { useContext } from 'react';
import styles from "./CartModal.module.css";
import { Translate } from 'react-auto-translate';
import { GlobalContext } from '../../../context/globalContext';


const dummy = [1]

const CartModal = () => {

  const globalContext = useContext(GlobalContext);
  const { setShowCartModal, showCartModal } = globalContext;

  return ( 
    <article className={styles.article} style={{right: showCartModal ? "0px" : "-1500px"}}>
      <div className={styles.div}>
        {/* CLOSE BUTTON */}
        <div className={styles.close} onClick={()=> setShowCartModal(false)}>
          <i className='bx bx-x'></i>
        </div>

        <div className={styles.container}>
          <div className={styles.title}>
            <h5>Your shopping cart <span>(6)</span></h5>
          </div>
          <div className={styles.content}>
            <div className={styles.items}>
                {
                  dummy.map((el, index) => {
                    return(
                      <div key={index} className={styles.eachItem}>
                        <div className={styles.eachItemImg}>
                          <img src="/images/lvTest3.avif" alt="abc" width={117}/>
                        </div>
                        <div className={styles.eachItemContent}>
                          <span>Louis Vuitton</span>
                          <span className={styles.eachItemSpan}>LV Bag Summer Girl 33'</span>
                          <span>USD 2,150</span>
                        </div>
                      </div>
                    )
                  })
                }
                <div className={styles.itemsPay}>
                  <div className={styles.itemsSeparator}></div>
                  <div className={styles.itemsTotal}>
                    <span><Translate>Total</Translate></span>
                    <span>USD 12,330</span>
                  </div>
                  <div className={styles.itemsButton}>
                    <button><Translate>Show my cart</Translate></button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default CartModal;