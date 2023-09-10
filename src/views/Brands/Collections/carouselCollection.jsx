import React from "react";
import Category from "./category";


const CarouselCollection = ({ collections }) => {
  return(
    <div>
      {collections.map((collection) => (
        <Category key={collection.title} {...collection} />
      ))}
    </div>
  )
}

export default CarouselCollection;

