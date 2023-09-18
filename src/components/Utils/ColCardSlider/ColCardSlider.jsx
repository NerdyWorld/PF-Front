import React, { useEffect, useState } from 'react';
import { filterProducts } from '../../../features/products/productSlice';
import { useSelector } from 'react-redux';

const ColCardSlider = ({el, index, color, ourStore}) => {

  const [images, setImages] = useState([]);

  const state = useSelector(state => state);
  const { filterProducts } = state.products;

  useEffect(() => {
    el?.images.map(obj => {
      if(obj.color.toLowerCase() === color){
        setImages(obj.images);
      }
    })
  }, [color, filterProducts, el]);

  return ( 
    <div id={`carouselExampleControls${index}`} class="carousel collection-card carousel-dark slide" data-bs-ride={false} data-bs-interval={false}>
      
      <div class="carousel-inner">
        {
          images.length && images.map((image, index) => {
            return(
              <div class={`carousel-item ${index === 0 && "active"} ${el.brand === "Dolce & Gabbana" && "dolce"} ${el.brand === "Louis Vuitton" && "lv"} ${ourStore && "ourStore"}`}>
                {
                  image.includes("mp4") ? (
                    <video src={image.trim()} muted controls loop className='d-block w-100'></video>
                  ):(
                    <img src={image.trim()} class="d-block w-100" alt="..." />
                  )
                }
              </div>
            )
          })
        }
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls${index}`} data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls${index}`} data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
   );
}
 
export default ColCardSlider;