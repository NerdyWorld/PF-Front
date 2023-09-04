// En Sunglasses.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiLV from "../../../utils/ApiLV.json";

const SunglassesLV = ApiLV.filter((producto) => {
  return producto.categories.includes("Sunglasses");
});
function Sunglasses() {
  return (
    <div>
      <ProductList
        productsData={SunglassesLV}
        category="Sunglasses"
        marca="Louis Vuitton"
      />
    </div>
  );
}

export default Sunglasses;
