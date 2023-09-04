// En Sneakers.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiFendi from "../../../utils/ApiFendi.json";

const SneakersFendi = ApiFendi.filter((producto) => {
  return producto.categories.includes("Sneakers");
});
function Sneakers() {
  return (
    <div>
      <ProductList
        productsData={SneakersFendi}
        category="Sneakers"
        marca="Fendi"
      />
    </div>
  );
}

export default Sneakers;
