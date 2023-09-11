import React, { useContext } from 'react';
import styles from "./SearchModal.module.css";
import { GlobalContext } from '../../context/globalContext';


const SearchModal = () => {

  const globalContext = useContext(GlobalContext);
  const { showSearchModal } = globalContext; 

  return ( 
    <article className={styles.article} style={{top: showSearchModal ? "0px" : "-200px"}}>
      <div className={styles.div}>
        <div className={styles.input}>
          <div className={styles.icon}>
            <i className='bx bx-search'></i>
          </div>
          <input type="text" placeholder="Explore what's new" />
        </div>
      </div>
    </article>
   );
}
 
export default SearchModal;