import React, { useContext } from 'react';
import styles from "./Product.module.css";
import { GlobalContext } from '../../../../context/globalContext';

const CheckoutModal = () => {
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setShowProductModal, showProductModal } = globalContext;

  const overview = "This OnTheGo PM tote bag is crafted from cream Canvas and decorated with a pastel Monogram Giant design. The model features an intricate Monogram flower motif on the trim and top handles inspired by traditional Portuguese ceramic tiles. The elegant piece is completed with a practical, adjustable and removable shoulder strap.";

  return ( 
    <article className={`${styles.article} checkoutProductModal`} style={{top: showProductModal ? "0px" : "-1000px", opacity: showProductModal ? 1 : 0}}>
      <div className={styles.div}>
        {/* CLOSE BUTTON */}
        <div className={styles.close} onClick={()=> setShowProductModal(false)}>
          <i className="fa-solid fa-sm fa-circle-xmark"></i>
        </div>
        <div className={styles.left}>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/lvtest3.avif" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
              <img src="/images/lvtest.avif" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
              <img src="/images/lvtest2.png" className="d-block w-100" alt="..."/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
        <div className={styles.right}>
          <h4>LV Pink Summer Bag'33</h4>
          <div className={styles.brand}>
            <span>Louis Vuitton</span>
          </div>
          <p className={styles.price}>$7.300</p>
          <div className={styles.overview}>
            <span>Overview</span>
            <p>{overview.length > 433 ? overview.slice(0, 433) + "…" : overview}</p>
          </div>
          <div className={styles.total}>
            <div className={styles.quantity}>
              <span>Quantity: 3</span>
            </div>
            <div className={styles.totalPrice}>
              <span>$21.900</span>
            </div>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default CheckoutModal;