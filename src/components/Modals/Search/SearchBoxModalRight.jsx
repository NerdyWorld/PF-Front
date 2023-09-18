import React, { useContext } from 'react';
import styles from "./SearchBoxModalRight.module.css";
import { GlobalContext } from '../../../context/globalContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SearchBoxModalRight = () => {

  const globalContext = useContext(GlobalContext);
  const { showSearchModal, setShowSearchModal } = globalContext;

  const state = useSelector(state => state.products);
  const { searched, products } = state;
  const navigate = useNavigate();

  const seeMoreProducts = () =>{
    setShowSearchModal(false);
    navigate('/ourStore');
  };



  return ( 
    <article className={styles.article} style={{right: showSearchModal ? "0px" : "-1200px"}}>
      <div className={styles.div}>
        <h6>Products</h6>
        <div className={styles.products}>
          {
            searched.length ? (
                searched.map((product, index) => {
                  if(index < 4){
                    if(index === 0 || index === 2){
                      return(
                        <div className={`${styles.product} ${styles.paddingProduct}`} onClick={()=> navigate(`/product/${product.id}`)}>
                          <div className={styles.productImg}>
                            <img src={product.images[0].images[0]} alt="abc" />
                          </div>
                          <span>{product.name}</span>
                        </div>
                      )
                    }else{
                      return(
                        <div className={`${styles.product}`} onClick={()=> navigate(`/product/${product.id}`)}>
                          <div className={styles.productImg}>
                            <img src={product.images[0].images[0]} alt="abc" />
                          </div>
                          <span>{product.name}</span>
                        </div>
                      )
                    }
                  }
                })            
            ):(
             products.length && products.map((product, index) => {
                if(index < 4){
                let randomNumber = Math.floor(Math.random() * 35 + (index === 0 ? 6 + 1 : index + 1));
                
                  return(
                    <div className={`${styles.product} ${styles.paddingProduct}`}>
                      <div className={styles.productImg}>
                        <img src={products[randomNumber].images[0].images[0]} alt="abc" />
                      </div>
                      <span>{products[randomNumber].name}</span>
                    </div>
                  )
                }  
             })
            )
          }
          
          <button onClick={seeMoreProducts}>See More Products</button>
        </div>
      </div>
    </article>
   );
}
 
export default SearchBoxModalRight;