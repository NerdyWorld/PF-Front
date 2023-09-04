// En Accesories.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiDolce from "../../../utils/ApiDolce.json";

const AccesoriesDolce = ApiDolce.filter((producto) => {
  return producto.categories.includes("Accesories");
});
function Accesories() {
  return (
    <div>
      <ProductList
        productsData={AccesoriesDolce}
        category="Accesories"
        marca="Dolce"
      />
    </div>
  );
}

export default Accesories;
