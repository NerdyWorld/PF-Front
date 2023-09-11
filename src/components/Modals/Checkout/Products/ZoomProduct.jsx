import React, { useContext } from 'react';
import styles from "./ZoomProduct.module.css"
import { GlobalContext } from '../../../../context/globalContext';

const ZoomProduct = () => {

  const globalContext = useContext(GlobalContext);
  const { showZoomProduct, setShowZoomProduct } = globalContext;  

  return ( 
    <article className={styles.article} style={{bottom: showZoomProduct ? "0px" : "-1400px", opacity: showZoomProduct ? 1 : 0}}>
      <div className={styles.div}>
        <div className={styles.close} onClick={()=> setShowZoomProduct(false)}>
          <i className="fa-solid fa-circle-xmark fa-sm"></i>
        </div>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/images/lvtest.avif" class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item">
              <img src="/images/lvtest2.png" class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item">
              <img src="/images/lvtest3.avif" class="d-block w-100" alt="..."/>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </article>
   );
}
 
export default ZoomProduct;