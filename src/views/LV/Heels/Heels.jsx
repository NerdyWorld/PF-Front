// En Heels.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiLV from "../../../utils/ApiLV.json";

const HeelsLV = ApiLV.filter((producto) => {
  return producto.categories.includes("Heels");
});
function Heels() {
  return (
    <div>
      <ProductList
        productsData={HeelsLV}
        category="Heels"
        marca="Louis Vuitton"
      />
    </div>
  );
}

export default Heels;
