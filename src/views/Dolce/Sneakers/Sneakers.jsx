// En Sneakers.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiDolce from "../../../utils/ApiDolce.json";

const SneakersDolce = ApiDolce.filter((producto) => {
  return producto.categories.includes("Sneakers");
});
function Sneakers() {
  return (
    <div>
      <ProductList
        productsData={SneakersDolce}
        category="Sneakers"
        marca="Dolce"
      />
    </div>
  );
}

export default Sneakers;
