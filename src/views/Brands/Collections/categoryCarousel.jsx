import React from "react";


    const CategoryCarouselCollection = ({ images }) => {
        const carouselId = `carouselCollection${Math.random().toString(36).substr(2, 9)}`;      
        return (
          <div className="custom-carousel-container-collection">
                <div id={carouselId} className="custom-carousel-collection carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner-collection carousel-inner">
                {images.map((image, index) => (
                    <div key={index} className={`carousel-item-collection carousel-item ${index === 0 ? "active" : ""}`}>
                       <div className="carousel-item-background">
                        <img src={image}  alt={`slide-${index}`} />
                    </div>
                    </div>
                ))}
            </div>
            
        </div>
    </div>
    );
}

    export default CategoryCarouselCollection;

 