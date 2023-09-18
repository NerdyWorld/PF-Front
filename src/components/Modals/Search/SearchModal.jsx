import React, { useContext } from 'react';
import styles from "./SearchModal.module.css";
import { GlobalContext } from '../../../context/globalContext';
import { useDebouncedCallback } from 'use-debounce';
import { searchProducts } from '../../../features/products/productSlice';
import { useDispatch } from 'react-redux';


const SearchModal = () => {

  const globalContext = useContext(GlobalContext);
  const { showSearchModal } = globalContext; 
  const dispatch = useDispatch();

  const debounced = useDebouncedCallback((value) => {
    
    if(value.length > 3){
      dispatch(searchProducts(value));
    };

  }, 1000);

  return ( 
    <article className={styles.article} style={{top: showSearchModal ? "0px" : "-200px"}}>
      <div className={styles.div}>
        <div className={styles.input}>
          <div className={styles.icon}>
            <i className='bx bx-search'></i>
          </div>
          <input type="text" placeholder="Explore what's new" onChange={(e)=> debounced(e.target.value)} />
        </div>
      </div>
    </article>
   );
}
 
export default SearchModal;