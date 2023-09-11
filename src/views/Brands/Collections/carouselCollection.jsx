import React from "react";
import Category from "./category";


const CarouselCollection = ({ collections, brandCards }) => {
  return(
    <div>
      {collections.map((collection) => (
        <Category key={collection.title} {...collection} brandCards={brandCards} />
      ))}
    </div>
  )
}

export default CarouselCollection;

