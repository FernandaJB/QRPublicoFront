import React from "react";

export function SepararNombresApellidos(fullname) {
  console.log("fullname en func", fullname);
  const nombresApellidos = fullname.trim().split(" ");

  if (nombresApellidos.length === 2) {
    const apellidos = nombresApellidos[0];
    const nombre = nombresApellidos[1];
    console.log("namess", nombre, apellidos);

    return { nombres: nombre, apellidos };
  } else if (nombresApellidos.length === 3) {
    const apellidos = nombresApellidos.slice(0, 2).join(" "); // Las dos primeras palabras como apellidos
    const nombre = nombresApellidos[2]; // La tercera palabra como nombre
    console.log("namess", nombre, apellidos);

    return { nombres: nombre, apellidos };
  } else if (nombresApellidos.length >= 4) {
    const nombre = nombresApellidos.slice(-2).join(" "); // Las dos últimas palabras como nombres
    const apellidos = nombresApellidos.slice(0, -2).join(" "); // Todo lo anterior como apellidos

    console.log("namess", nombre, apellidos);
    return { nombres: nombre, apellidos };
  } else {
    // Manejar el caso en que el nombre completo no tiene suficientes elementos
    return { nombres: "", apellidos: "" };
  }
}
