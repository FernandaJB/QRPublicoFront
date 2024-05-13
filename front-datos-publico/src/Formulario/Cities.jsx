import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const data = {
  Azuay: ["Cuenca", "Giron", "Gualaceo", "Turi", "Chinquitad", "Quingeo", "Llacao", "Nulti", "Victoria de Portete",
    "San Felipe de Molleturo", "Valle", "Chaucha", "Santa Ana", "Sidcay", "Sinincay", "Luis Galarza Orellana",
    "Octavio Cordero Palacios", "Tomebamba", "Guarumales"],
  Bolivar: ["Caluma",	"Chillanes",	"Chimbo",	"Echeandía",	"Guaranda",	"Las Naves",	"San Miguel",
],
  Cañar: ["Cañar", "Chorocopte", "Chontamarca", "Ducur", "General Morales", "Gualleturo", "Honorato Vásquez", "Ingapirca", "Juncal", "San Antonio de Panguancay",
    "Ventura y Zhud"],
  Carchi: ["Tulcán", "San Gabriel", "El Ángel"],
  Chimborazo: ["Guano", "Alausí", "Riobamba", "Penípe", "Cumandá", "Colta", "Pallatanga", "Chunchi", "Chambo", "Guamote", "Hitos del Chimborazo",],
  Cotopaxi: ["Latacunga", "Salcedo", "Sigchos", "Saquisilí"],
  Oro: ["Machala", "Santa Rosa", "Pasaje", "Piñas", "Huaquillas", "Chilla", "Marcabelí", "EL Guabo", "Zaruma", "Balsas", "Pasaje de las nieves",
    "Arenillas", "Atahualpa", "Las Lajas", "Portovelo", "Santa Rosa"],
  Esmeraldas: ["Esmeraldas", "Atacames", "Muisne","Rio Verde", "Eloy Alfaro","San lorenzo","Quininde"],
  Galápagos: ["Puerto Baquerizo Moreno", "Puerto Ayora", "Puerto Villamil","Isla Santa Cruz","San Cristobal","Isla Isabela"],
  Guayas: ["Guayaquil", "Samborondón", "Daule","Santa Lucia","El Empalme","Pedro Carbo","Nobol","Milagro","Naranjito",
            "Colimes","General Villamil","Marcelino Mariudeña","Balzar","Lomas de Sargentillo","Palestina","Naranjal","Salitre",
            "Alfredo Baquerizo Moreno", "Balao","Yaguachi","Bucay"],
  Imbabura: ["Ibarra", "Otavalo", "Cotacachi","Urcuquí","Pimampiro","Antonio Ante"],
  Loja: ["Loja", "Macará","Paltas","Saraguro","Zapotillo","Pindal","Chaguarpamba","Catamayo","Puyango","Olmedo",
        "Celica","Espíndola","Gonzanamá","Quilanga","Sozoranga","Caibas",""],
  Ríos: ["Babahoyo", "Quevedo", "Valencia","Vinces","San Jacinto de Buena Fé","Quinsaloma","Baba","Montalvo","Palenque",
        "Mocache","Puebloviejo","Urdaneta","Ventanas"],
  Manabí: ["Portoviejo", "Manta", "Bahía de Caráquez","Pedernales","Puerto Lopez","El Carmen","San Vicente","Veinticuatro de Mayo",
            "Jama","Jipijapa","Junin","Montecristi","Flavio Alfaro","Roca Fuerte","Bolivar","Olmedo","Paján","Santa Ana",
            "Pichincha","Tosagua","Chone"],
  MoronaSantiago: ["Macas", "Sucúa", "Gualaceo","Tiwintza","Huamboya","Logroño","Taisha","Gualaquiza","San Juan Bosco",
  "Santiago de Mendez"],
  Napo: ["Archidona",	"Baeza",	"Carlos Julio Arosemena Tola",	"El Chaco",	"Tena"],
  Orellana: ["El Coca", "Aguarico","La Joya de las Sachas","Loreto","Tiputini"],
  Pastaza: ["Puyo", "Mera", "Arajuno","Santa Clara"],
  Pichincha: ["Cayambe",	"Machachi",	"PedroVicenteMaldonado",	"PuertoQuito",	"Quito",	"SanMigueldeLosBancos",	"Sangolquí",	"Tabacundo",],
  SantaElena: ["Salinas", "La Libertad", "Santa Elena"],
  SantoDomingodelosTsáchilas: ["Santo Domingo", "La Concordia"],
  Sucumbíos: ["El Dorado de Cascales",	"La Bonita",	"Lumbaqui",	"NuevaLoja",	"Puerto El Carmen de Putumayo",	"Shushufindi",	"Tarapoa"],
  Tungurahua: ["Ambato",	"Baños de Agua Santa",	"Cevallos",	"Mocha",	"Patate",	"Pelileo",	"Píllaro",	"Quero",	"Tisaleo",],
  ZamoraChinchipe: ["El Pangui",	"Guayzimi",	"Palanda",	"Paquisha",	"Yacuambi",	"Yantzaza",	"Zamora",	"Zumba",	"Zumbi",
],
};

const CitiesProv = ({ onSelectionChange }) => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");

  const handleProvinciaChange = (event) => {
    const provincia = event.value;
    setProvinciaSeleccionada(provincia);
    setCiudadSeleccionada("");
  };

  const handleCiudadChange = (event) => {
    const ciudad = event.value;
    setCiudadSeleccionada(ciudad);

    // Llama a la función de devolución de llamada para enviar los valores seleccionados
    onSelectionChange(provinciaSeleccionada, ciudad);
  };

  const provinciaOptions = Object.keys(data).map((provincia) => ({
    label: provincia,
    value: provincia,
  }));

  const ciudadOptions =
    provinciaSeleccionada && data[provinciaSeleccionada]
      ? data[provinciaSeleccionada].map((ciudad) => ({
          label: ciudad,
          value: ciudad,
        }))
      : [];

  return (
    <>
      <div className="p-field">
        Provincia:
        <Dropdown
          value={provinciaSeleccionada}
          options={provinciaOptions}
          placeholder="Selecciona una provincia"
          onChange={handleProvinciaChange}
        />
      </div>
      <div className="p-field">
        Ciudad:
        <Dropdown
          value={ciudadSeleccionada}
          options={ciudadOptions}
          placeholder="Selecciona una ciudad"
          onChange={handleCiudadChange}
        />
      </div>
    </>
  );
};

export default CitiesProv;
