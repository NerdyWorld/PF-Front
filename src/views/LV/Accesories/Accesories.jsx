// En Accesories.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiLV from "../../../utils/ApiLV.json";

const AccesoriesLV = ApiLV.filter((producto) => {
  return producto.categories.includes("Accesories");
});
function Accesories() {
  return (
    <div>
      <ProductList
        productsData={AccesoriesLV}
        category="Accesories"
        marca="Louis Vuitton"
      />
    </div>
  );
}

export default Accesories;
