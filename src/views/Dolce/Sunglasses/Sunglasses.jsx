// En Sunglasses.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiDolce from "../../../utils/ApiDolce.json";

const SunglassesDolce = ApiDolce.filter((producto) => {
  return producto.categories.includes("Sunglasses");
});
function Sunglasses() {
  return (
    <div>
      <ProductList
        productsData={SunglassesDolce}
        category="Sunglasses"
        marca="Dolce"
      />
    </div>
  );
}

export default Sunglasses;
