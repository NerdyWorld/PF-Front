import React, { useContext, useEffect, useState } from 'react';
import ColCardSlider from '../ColCardSlider/ColCardSlider';
import styles from "./CollectionCard.module.css";
import { GlobalContext } from '../../../context/globalContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CollectionCard = ({el, index}) => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { getPriceByCurrency } = globalContext;
  const state = useSelector(state => state);
  const { filterProducts } = state.products;
  const navigate = useNavigate();
  
  const [color, setColor] = useState(el.colors[0]);

  useEffect(() => {
    if(el){
      setColor(el.colors[0]);
    }
  }, [el, filterProducts]);

  return(
    <div key={index} className={styles.card}>
      <ColCardSlider el={el} index={index} color={color}/>
      <div className={styles.details}>
        <div className={styles.left}>
          <span onClick={()=> navigate(`/products/${el.id}`)}>{el.name}</span>
          <span>{getPriceByCurrency(el.price)}</span>
        </div>
        <div className={styles.colors}>
          {
            el.colors.map(itemColor => <span style={{backgroundColor: itemColor, boxShadow: itemColor.toLowerCase() === "white" ? '0 0 0.15rem #afaeae' : 'none'}} className={`${color === itemColor && styles.activeSpan} ${styles.colorSpan}`} onClick={()=> setColor(itemColor)}></span>)
          }
        </div>
      </div>
    </div>
  )
}
 
export default CollectionCard;