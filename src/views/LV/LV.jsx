import React from "react";
import Views from "../Brands/components/ModelCarrusel/Brands";
import RutaLV from "../../utils/RutaLV.json"; // Importa el JSON

function LV() {
  return (
    <div>
      <Views
        images={RutaLV} // Muestra la primera imagen
        marca="louisvuitton"
      />
    </div>
  );
}

export default LV;
