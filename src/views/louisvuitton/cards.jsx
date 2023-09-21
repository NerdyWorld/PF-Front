import React, { useState } from "react";
import styles from "./louisvuitonvideo.module.css";

const Cards = ({ img }) => {
  const [showAll, setShowAll] = useState(false);

  // Obtén las primeras 10 imágenes o todas las imágenes según el estado de showAll
  const visibleImages = showAll ? img : img.slice(0, 10);

  // Manejador para mostrar todas las imágenes cuando se hace clic en "See More"
  const handleSeeMoreClick = () => {
    setShowAll(true);
  };

  return (
    <div>
      <div className={styles.imagegallery}>
        {visibleImages.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>
      <div>
        {!showAll ? (
          <button className={styles.btnSeeMore} onClick={handleSeeMoreClick}>
            See More
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Cards;
