import React from "react";
import Views from "../Brands/components/ModelCarrusel/Brands";
import RutaDolce from "../../utils/RutaDolce.json"; // Importa el JSON

function Dolce() {
  return (
    <div>
      <Views
        images={RutaDolce} // Muestra la primera imagen
        marca="dolce"
      />
    </div>
  );
}

export default Dolce;
