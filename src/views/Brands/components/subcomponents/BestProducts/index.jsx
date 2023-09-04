import React from 'react';
import './BestProducts.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const BestProducts = ({images}) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 1500, // Cambiar la velocidad de transición en milisegundos
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: 2500, // Cambiar el intervalo entre imágenes en milisegundos
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };

    return (
        <>
            <div className="carousel-favourites-container">
                <Slider {...settings} className="slider-favourites-container">
                    {images.map((image, index) => (
                    <div key={index} className='carousel-favourites-image-wrapper'>
                        <img className='image-best-products' src={image} alt={`Imagen ${index + 1}`} />
                    </div>
                    ))}
                </Slider>
            </div>
        </>
  );
}

export default BestProducts;