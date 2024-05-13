import React from "react";
import provinciaMapper from "./StateMaper"; // Asegúrate de ajustar la ruta de importación según tu estructura de archivos

function ProvinciaCode(nameProv) {
  console.log("nombre provincia", nameProv);
  if (provinciaMapper.hasOwnProperty(nameProv)) {
    const provinciaCode = provinciaMapper[nameProv];
    return provinciaCode;
  } else {
    return 17;
  }
}

export default ProvinciaCode;
