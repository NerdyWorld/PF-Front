// En Sneakers.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiFendi from "../../../utils/ApiFendi.json";

const HeelsFendi = ApiFendi.filter((producto) => {
  return producto.categories.includes("Heels");
});
function Heels() {
  return (
    <div>
      <ProductList productsData={HeelsFendi} category="Heels" marca="Fendi" />
    </div>
  );
}

export default Heels;
