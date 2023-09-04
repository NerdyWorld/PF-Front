// En Accesories.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiFendi from "../../../utils/ApiFendi.json";

const AccesoriesFendi = ApiFendi.filter((producto) => {
  return producto.categories.includes("Accesories");
});
function Accesories() {
  return (
    <div>
      <ProductList
        productsData={AccesoriesFendi}
        category="Accesories"
        marca="Fendi"
      />
    </div>
  );
}

export default Accesories;
