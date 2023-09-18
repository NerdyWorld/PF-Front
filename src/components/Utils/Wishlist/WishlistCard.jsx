import React, { useContext, useState } from 'react';
import styles from "./WishlistCard.module.css";
import { GlobalContext } from '../../../context/globalContext';
import {
  PinterestShareButton,
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  PinterestIcon,
  TwitterIcon,
  FacebookIcon,
  EmailIcon
} from "react-share";
import { useDispatch } from 'react-redux';
import { favToggle } from '../../../features/user/userSlice';


const WishlistCard = ({el, index, userId}) => {

  const dispatch = useDispatch();

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { getPriceByCurrency } = globalContext;

  const [flipped, setFlipped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);


  return ( 
    <div className={styles.wishlistItem} key={index}>
      {/* FLIP */}
      <div className={styles.flip} onClick={()=> setFlipped(!flipped)}>
        <img src="/images/triangle.svg" alt="abc" />
      </div>

      {/* CLOSE */}
      <div className={styles.close} onClick={()=> dispatch(favToggle({userId, item: el}))}>
        <i className='bx bx-x'></i>
      </div>
      <div className={styles.wItemImg}>
        <img src={el.images[0].images[0]} alt="abc" />
      </div>
      <div className={styles.wItemDetails}>
        <span>{el.name}</span>
        <span>{getPriceByCurrency(el.price)}</span>
      </div>

      {/* FLIP DIV */}
      <div className={styles.flippedDiv} style={{display: flipped ? "flex" : "none"}}>    
        {/* FLIP */}
        <div className={styles.flip} onClick={()=> {setFlipped(!flipped) ; setShowTooltip(false)}}>
          <img src="/images/triangle.svg" alt="abc" />
        </div>

        <span className={styles.sku}>{el.SKU || "1AC3C78"}</span>
        <p className={styles.flipName}>{el.name}</p>
        <span className={styles.color}>Color: Black</span>
        <span className={styles.size}>Size 38.5</span>
        
        
        <div className={styles.buttons}>
          <div className={styles.placeCart}>
            <button>Place in Cart</button>
          </div>
          <div className={styles.wrapButtons}>
            <button className={`${styles.share} ${showTooltip && styles.showTooltip}`} onClick={()=> setShowTooltip(true)}>
              <i className='bx bxs-share-alt' ></i>
              Share
              <div className={styles.tooltip}>
                <PinterestShareButton url={`https://rivelle.netlify.app/detail/${el.id}`}>
                  <PinterestIcon size={25} borderRadius={50}/>
                </PinterestShareButton>
                <TwitterShareButton url={`https://rivelle.netlify.app/detail/${el.id}`}>
                  <TwitterIcon size={25} borderRadius={50}/>
                </TwitterShareButton>
                <FacebookShareButton url={`https://rivelle.netlify.app/detail/${el.id}`}>
                  <FacebookIcon size={25} borderRadius={50}/>
                </FacebookShareButton>
                <EmailShareButton url={`https://rivelle.netlify.app/detail/${el.id}`}>
                  <EmailIcon size={25} borderRadius={50}/>
                </EmailShareButton>
                <div className={styles.closeTooltip} onClick={(e)=> {e.stopPropagation() ; setShowTooltip(false)}}>
                  <i className='bx bx-x'></i>
                </div>
              </div>
            </button>
            <button className={styles.details}>
              <i className='bx bx-plus'></i>
              All details
            </button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default WishlistCard;