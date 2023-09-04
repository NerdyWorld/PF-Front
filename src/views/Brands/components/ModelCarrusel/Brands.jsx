import React, { useRef } from "react";
import "./index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logoGucci from "./img/gucci.png";
import logoLV from "./img/logoLV.png";
import logoDolce from "./img/logodolce.png";
import logoFendi from "./img/fendilogo.png";
import BestProducts from "../subcomponents/BestProducts";
import { useNavigate } from "react-router-dom";

function View({ images, marca }) {
  const bagsContainerRef = useRef(null);
  const navigate = useNavigate();
  const navegarA = (ruta) => {
    navigate(`/${marca}${ruta}`);
  };
  console.log(images);
  const scrollContainerToCenter = (containerNumber) => {
    const containerRef = document.querySelector(`.items${containerNumber}`);
    if (containerRef) {
      containerRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500, // Cambiar la velocidad de transición en milisegundos
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 2500, // Cambiar el intervalo entre imágenes en milisegundos
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="model-container">
      <div className="navbar">
        <div className="nav-logo">
          <span>Rivélle</span>
        </div>
        <div className="nav-items">
          <span>Home</span>
          <span>About</span>
          <span>Checkout</span>
        </div>
      </div>

      <div
        className={
          marca === "louisvuitton"
            ? "logoLV logo"
            : marca === "gucci" || marca === "dolce"
            ? "logoGucci logo"
            : marca === "fendi"
            ? "logo logoFendi"
            : "logo"
        }
      >
        <img
          src={
            marca === "gucci"
              ? logoGucci
              : marca === "louisvuitton"
              ? logoLV
              : marca === "dolce"
              ? logoDolce
              : marca === "fendi"
              ? logoFendi
              : null
          }
          alt="logo"
        />
      </div>
      <div className="carousel-container">
        <Slider {...settings} className="slider-container">
          {images[0].bagsPortada.map((image, index) => (
            <div key={index} className="carousel-image-wrapper">
              <img
                className="carousel-image"
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ opacity: 0.5 }}
              />
            </div>
          ))}
        </Slider>
        <label className="center-label">BAGS</label>
        <button
          className="center-button"
          onClick={() => scrollContainerToCenter(1)}
        >
          View Best{" "}
        </button>
      </div>

      <div className="bags-favourites-container items1" ref={bagsContainerRef}>
        <BestProducts images={images[0].bags} className="add" />
        <BestProducts images={images[0].bags2} className="add" />
        <BestProducts images={images[0].bags3} className="add" />
        <BestProducts images={images[0].bags4} className="add" />
        <BestProducts images={images[0].bags5} className="add" />
        <button onClick={() => navegarA("/bags")}>View All</button>
      </div>

      <div className="carousel-container container2">
        <Slider {...settings} className="slider-container">
          {images[0].sneakersPortada.map((image, index) => (
            <div key={index} className="carousel-image-wrapper">
              <img
                className="carousel-image"
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ opacity: 0.5 }}
              />
            </div>
          ))}
        </Slider>
        <label className="center-label2">Sneakers</label>
        <button
          className="center-button2"
          onClick={() => scrollContainerToCenter(2)}
        >
          View Best{" "}
        </button>
      </div>

      <div className="bags-favourites-container items2">
        <BestProducts images={images[0].sneakers} className="add" />
        <BestProducts images={images[0].sneakers2} className="add" />
        <BestProducts images={images[0].sneakers3} className="add" />
        <BestProducts images={images[0].sneakers4} className="add" />
        <BestProducts images={images[0].sneakers5} className="add" />
        <button onClick={() => navegarA("/Sneakers")}>View All</button>
      </div>

      <div className="carousel-container container3">
        <Slider {...settings} className="slider-container">
          {images[0].accesoriesPortada.map((image, index) => (
            <div key={index} className="carousel-image-wrapper">
              <img
                className="carousel-image"
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ opacity: 0.5 }}
              />
            </div>
          ))}
        </Slider>
        <label className="center-label3">Accesories</label>
        <button
          className="center-button3"
          onClick={() => scrollContainerToCenter(3)}
        >
          View Best{" "}
        </button>
      </div>

      <div className="bags-favourites-container items3">
        <BestProducts images={images[0].accesorie1} className="add" />
        <BestProducts images={images[0].accesorie2} className="add" />
        <BestProducts images={images[0].accesorie3} className="add" />
        <BestProducts images={images[0].accesorie4} className="add" />
        <BestProducts images={images[0].accesorie5} className="add" />
        <button onClick={() => navegarA("/accesories")}>View All</button>
      </div>

      <div className="carousel-container container4">
        <Slider {...settings} className="slider-container">
          {images[0].heelsPortada.map((image, index) => (
            <div key={index} className="carousel-image-wrapper">
              <img
                className="carousel-image"
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ opacity: 0.5 }}
              />
            </div>
          ))}
        </Slider>
        <label className="center-label4 ">Heels</label>
        <button
          className="center-button4"
          onClick={() => scrollContainerToCenter(4)}
        >
          View Best{" "}
        </button>
      </div>

      <div className="bags-favourites-container items4">
        <BestProducts images={images[0].heels1} className="add" />
        <BestProducts images={images[0].heels2} className="add" />
        <BestProducts images={images[0].heels3} className="add" />
        <BestProducts images={images[0].heels4} className="add" />
        <BestProducts images={images[0].heels5} className="add" />
        <button onClick={() => navegarA("/Heels")}>View All</button>
      </div>

      <div className="carousel-container container5">
        <Slider {...settings} className="slider-container">
          {images[0].sunglassesPortada.map((image, index) => (
            <div key={index} className="carousel-image-wrapper">
              <img
                className="carousel-image"
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ opacity: 0.5 }}
              />
            </div>
          ))}
        </Slider>
        <label className="center-label5">Sunglasses</label>
        <button
          className="center-button5"
          onClick={() => scrollContainerToCenter(5)}
        >
          View Best{" "}
        </button>
      </div>

      <div className="bags-favourites-container items5">
        <BestProducts images={images[0].sunglasses1} className="add" />
        <BestProducts images={images[0].sunglasses2} className="add" />
        <BestProducts images={images[0].sunglasses3} className="add" />
        <BestProducts images={images[0].sunglasses4} className="add" />
        <BestProducts images={images[0].sunglasses5} className="add" />
        <button onClick={() => navegarA("/Sunglasses")}>View All</button>
      </div>
    </div>
  );
}

export default View;
