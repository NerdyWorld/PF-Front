// En Bags.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiFendi from "../../../utils/ApiFendi.json";

const BagsFendi = ApiFendi.filter((producto) => {
  return producto.categories.includes("Bags");
});
function Bags() {
  return (
    <div>
      <ProductList productsData={BagsFendi} category="Bags" marca="Fendi" />
    </div>
  );
}

export default Bags;
