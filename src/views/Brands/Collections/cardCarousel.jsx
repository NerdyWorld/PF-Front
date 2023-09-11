import React from "react";

const CardCarousel = ({ categories = []}) => {
  console.log(categories);
  return (
    <div className="card-carousel-container">
      {categories.map((category) => (
        
        <div key={category.id} className="card card-view">
          <div
            id={`carousel${category.id}`}
            className="card-carousel carousel slide"
            data-bs-ride="carousel"
          >
            <div className="card-carousel-inner carousel-inner">
              {category.images.map((image, index) => (
                <div
                  key={index}
                  className={`card-carousel-item carousel-item ${
                    index === 0 && "active"
                  }`}
                >
                  <div className="background-card">
                    <img
                      src={image}
                      className="d-block w-100"
                      alt={`slide-${index}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carousel${category.id}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon custom-icon-card"
                aria-hidden="true"
                style={{ filter: "invert(70%)", backgroundSize: "220%" }}
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carousel${category.id}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon custom-icon-card "
                aria-hidden="true"
                style={{ filter: "invert(70%)", backgroundSize: "220%" }}
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCarousel;
