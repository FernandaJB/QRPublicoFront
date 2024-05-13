import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const GenderSelect = ({ onGenderChange }) => {
  const [generoOptions] = useState([
    { label: "Masculino", value: 0 },
    { label: "Femenino", value: 1 },
    { label: "Prefiero no responder", value: 2 },
  ]);

  // Establecer "Masculino" como valor inicial
  let [selectedGenero, setSelectedGenero] = useState(0); // El valor 0 representa "Masculino"

  // Función para manejar el cambio de selección
  const handleGenderChange = (event) => {
    const selectedValue = event.value;
    setSelectedGenero(selectedValue);

    // Llamar a la función de devolución de llamada con el valor seleccionado
    if (onGenderChange) {
      onGenderChange(selectedValue);
    }
  };

  return (
    <>
    Genero:
      <Dropdown
        id="genero"
        value={selectedGenero}
        options={generoOptions}
        placeholder="Seleccione un género"
        onChange={handleGenderChange} // Llamar a la función cuando cambie la selección
      />
    </>
  );
};

export default GenderSelect;
