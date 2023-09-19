import React from "react";
import CategoryCarousel from "./categoryCarousel";
import CardCarousel from "./cardCarousel";


const Category = ({ title, subTitle, carousel1, carousel2, cardCategories, productsByCategory }) => {
  return (
    <div className="category-section">
      <div className="container-carousel-view">       
        <CategoryCarousel images={carousel1} />       
        <CategoryCarousel images={carousel2} />
        <div className="carousel-overlay-title">
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </div>       
      </div>
      {/* <div className="card-category">
      <CardCarousel  productsByCategory={productsByCategory} />
      </div> */}
    </div>
  );
};

export default Category;

