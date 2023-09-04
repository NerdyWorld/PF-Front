// En Bags.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiLV from "../../../utils/ApiLV.json";

const BagsLV = ApiLV.filter((producto) => {
  return producto.categories.includes("Bags");
});
function Bags() {
  return (
    <div>
      <ProductList
        productsData={BagsLV}
        category="Bags"
        marca="Louis Vuitton"
      />
    </div>
  );
}

export default Bags;
