import React from "react";
import Views from "../Brands/components/ModelCarrusel/Brands";
import RutaFendi from "../../utils/RutaFendi.json"; // Importa el JSON

function Fendi() {
  return (
    <div>
      <Views
        images={RutaFendi} // Muestra la primera imagen
        marca="fendi"
      />
    </div>
  );
}

export default Fendi;
