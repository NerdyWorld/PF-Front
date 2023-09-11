import React, { useContext } from 'react';
import styles from "./SearchBoxModalRight.module.css";
import { GlobalContext } from '../../context/globalContext';

const SearchBoxModalRight = () => {

  const globalContext = useContext(GlobalContext);
  const { showSearchModal } = globalContext;

  return ( 
    <article className={styles.article} style={{right: showSearchModal ? "0px" : "-1200px"}}>
      <div className={styles.div}>
        <h6>Products</h6>
        <div className={styles.products}>
          <div className={`${styles.product} ${styles.paddingProduct}`}>
            <div className={styles.productImg}>
              <img src="/images/lvTest3.avif" alt="abc" />
            </div>
            <span>LV Summer Bag 33'</span>
          </div>
          <div className={styles.product}>
            <div className={styles.productImg}>
              <img src="/images/lvTest.avif" alt="abc" />
            </div>
            <span>LV Summer Bag 33'</span>
          </div>
          <div className={`${styles.product} ${styles.paddingProduct}`}>
            <div className={styles.productImg}>
              <img src="/images/lvTest2.png" alt="abc" />
            </div>
            <span>LV Summer Bag 33'</span>
          </div>
          <div className={styles.product}>
            <div className={styles.productImg}>
              <img src="/images/lvTest3.avif" alt="abc" />
            </div>
            <span>LV Summer Bag 33'</span>
          </div>
          <button>See More Products</button>
        </div>
      </div>
    </article>
   );
}
 
export default SearchBoxModalRight;