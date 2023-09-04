// En Bags.jsx
import React from "react";
import ProductList from "../../ProductList/ProductList";
import ApiDolce from "../../../utils/ApiDolce.json";

const BagsDolce = ApiDolce.filter((producto) => {
  return producto.categories.includes("Bags");
});
function Bags() {
  return (
    <div>
      <ProductList productsData={BagsDolce} category="Bags" marca="Dolce" />
    </div>
  );
}

export default Bags;
