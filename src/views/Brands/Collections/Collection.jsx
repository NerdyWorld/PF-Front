import React, { useState } from "react";
import CarouselCollection from "./carouselCollection";
import { useParams } from "react-router-dom";
import { brandsData } from "./brandsData";


const Collection = () => {
  const { name } = useParams();
  const brand = brandsData[name];
  if(!brand) {
    return <p>Not found any brand</p>
  }

return(
  <div className="collection-container">
    <h2 className="collection-brandName">{brand.brandName}</h2>
    <h3 className="collection-name">{brand.name}</h3>
    <CarouselCollection collections={brand.collections} />
  </div>
)
}

export default Collection;
