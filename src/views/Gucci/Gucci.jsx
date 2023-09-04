import React from "react";
import Views from "../Brands/components/ModelCarrusel/Brands";
import RutaGucci from "../../utils/RutaGucci.json"; // Importa el JSON

function Gucci() {
  return (
    <div>
      <Views
        images={RutaGucci} // Muestra la primera imagen
        marca="gucci"
      />
    </div>
  );
}

export default Gucci;
