// En Sneakers.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiFendi from "../../../utils/ApiFendi.json";

const SunglassesFendi = ApiFendi.filter((producto) => {
  return producto.categories.includes("Sunglasses");
});
function Sunglasses() {
  return (
    <div>
      <ProductList
        productsData={SunglassesFendi}
        category="Sunglasses"
        marca="Fendi"
      />
    </div>
  );
}

export default Sunglasses;
