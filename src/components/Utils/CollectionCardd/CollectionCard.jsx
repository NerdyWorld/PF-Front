import React, { useContext, useEffect, useState } from 'react';
import ColCardSlider from '../ColCardSlider/ColCardSlider';
import styles from "./CollectionCard.module.css";
import { GlobalContext } from '../../../context/globalContext';
import { filterProducts } from '../../../features/products/productSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CollectionCard = ({el, index, ourStore}) => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { getPriceByCurrency } = globalContext;
  const state = useSelector(state => state);
  const { filterProducts } = state.products;
  const navigate = useNavigate();
  
  const [color, setColor] = useState(el.colors[0].toLowerCase());

  useEffect(() => {
    if(el){
      setColor(el.colors[0].toLowerCase());
    }
  }, [el, filterProducts]);

  return(
    <div key={index} className={`${styles.card}`}>
      <ColCardSlider el={el} index={index} color={color} ourStore={ourStore}/>
      <div className={`${styles.details} ${ourStore && el.brand === "Dolce & Gabbana" && styles.ourStoreCards}`}>
        <div className={styles.left}>
          <span>{el.name.trimStart()}</span>
          <span>{getPriceByCurrency(el.price)}</span>
        </div>
        <div className={styles.colors}>
          {
            el.colors.map(itemColor => <span style={{backgroundColor: itemColor, boxShadow: (itemColor.toLowerCase() === "white" || itemColor.toLowerCase() === "ivory") ? '0 0 0.15rem #afaeae' : 'none'}} className={`${color === itemColor.toLowerCase() && styles.activeSpan} ${styles.colorSpan}`} onClick={()=> setColor(itemColor.toLowerCase())}></span>)
          }
        </div>
      </div>
    </div>
  )
}
 
export default CollectionCard;