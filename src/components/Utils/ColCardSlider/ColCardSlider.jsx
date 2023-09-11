import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ColCardSlider = ({el, index, color}) => {

  const [images, setImages] = useState([]);
  const state = useSelector(state => state);
  const { filterProducts } = state.products;

  useEffect(() => {
    el?.images.map(obj => {
      if(obj.color.toLowerCase() === color.toLowerCase()){
        setImages(obj.images);
      }
    })
  }, [color, filterProducts]);


  return ( 
    <div id={`carouselExampleControls${index}`} class="carousel collection-card carousel-dark slide" data-bs-ride={false} data-bs-interval={false}>
      
      <div class={`carousel-inner ${el.brand === "Dolce & Gabbana" && "dolce"}`}>
        {
          images.length && images.map((image, index) => {
            if(image.includes("mp4")){
              return(
                <div class={`carousel-item ${index === 0 && "active"}`}>
                  <video muted autoPlay loop controls src={image} class="d-block w-100" alt="..." />
                </div>
              )
            }else{
              return(
                <div class={`carousel-item ${el.brand === "Gucci" && "gucci"} ${index === 0 && "active"}`}>
                  <img src={image} class="d-block w-100" alt="..." />
                </div>
              )
            }
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