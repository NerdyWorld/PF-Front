import React from "react";
import Category from "./category";
import CardCarousel from "./cardCarousel";
import { categoryMapping } from "./brandsData";
import { BsArrowUpCircle } from "react-icons/bs";

const CarouselCollection = ({ collections, productsByCategory }) => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="collections-container-all">
      {collections.map((collection) => (
        <div key={collection.title}>
          <Category {...collection} />
          {productsByCategory[categoryMapping[collection.title]] && (
            <CardCarousel
              products={productsByCategory[categoryMapping[collection.title]]}
            />
          )}
          <div className="arrow-card">
            <BsArrowUpCircle
              onClick={scrollToTop}
              className="scroll-to-top-btn"
              size={35}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default CarouselCollection;
