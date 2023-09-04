// En Heels.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiDolce from "../../../utils/ApiDolce.json";

const HeelsDolce = ApiDolce.filter((producto) => {
  return producto.categories.includes("Heels");
});
function Heels() {
  return (
    <div>
      <ProductList productsData={HeelsDolce} category="Heels" marca="Dolce" />
    </div>
  );
}

export default Heels;
