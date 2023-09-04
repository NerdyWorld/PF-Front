// En Sneakers.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiLV from "../../../utils/ApiLV.json";

const SneakersLV = ApiLV.filter((producto) => {
  return producto.categories.includes("Sneakers");
});
function Sneakers() {
  return (
    <div>
      <ProductList
        productsData={SneakersLV}
        category="Sneakers"
        marca="Louis Vuitton"
      />
    </div>
  );
}

export default Sneakers;
