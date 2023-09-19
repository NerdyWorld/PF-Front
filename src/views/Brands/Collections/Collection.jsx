import React, { useEffect, useState } from "react";
import CarouselCollection from "./carouselCollection";
import { useNavigate, useParams } from "react-router-dom";
import { brandsData, categoryMapping } from "./brandsData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../features/products/productSlice";

const Collection = () => {
  const navigate = useNavigate()
  const { name } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const brand = categoryMapping[name];
  console.log("Nombre de la marca:", name);

  useEffect(() => {
    dispatch(getAllProducts())
  },[dispatch]);


  const filteredProducts = products.filter(product => 
    product.brand.toLowerCase().replace(/\s+/g, '').replace(/&/g, '') === name.toLowerCase().replace(/\s+/g, '')
);
  
  const productsByCategory = filteredProducts.reduce((acc, product) => {
      if(product.categories) {
          const category = product.categories[0];
          if (!acc[category]) {
              acc[category] = [];
          }
          acc[category].push(product);
      }
      return acc;
  }, {});

  const limitedProductsByCategory = {};

  for (const [category, categoryProducts] of Object.entries(productsByCategory)) {
      limitedProductsByCategory[category] = categoryProducts.slice(0, 5);
  }

console.log('productos filtrados',filteredProducts)
console.log('productos filtrados',productsByCategory)

return (
    <div className="collection-container">
        <p className='seeAll-collection' onClick={() => navigate(`/seeAll/${name}`)}>See All</p>
        <h2 className="collection-brandName">{brand.brandName}</h2>
        <h3 className="collection-name">{brand.name}</h3>             
        <CarouselCollection productsByCategory={limitedProductsByCategory} collections={brand.collections} />
    </div>
    )
};

export default Collection;
