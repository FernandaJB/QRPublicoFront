import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { ClipLoader } from "react-spinners";

import axios from 'axios'; // Importar axios
import { toast } from 'react-toastify'; // Importar toast

import "../Formulario/Form.css";
import "../Formulario/ClipLoader.css";

import { DataCliente } from "./DataClient";
import { SepararNombresApellidos } from "./PartName";
import CitiesProv from "./Cities";
import GenderSelect from "./Gener";
import ProvinciaCode from "./StateCode";
import { PatchCliente } from "./PatchClient";

function Formulario() {
  const HTTP_STATUS_NO_CONTENT = 204;
  const HTTP_STATUS_BAD_GATEWAY = 502;

  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });
  //const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  
  //Dialogos
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
  //Cargando
  const [isLoading, setIsLoading] = useState(false);

  //validar boton consultar
  const [validationIdent, setValidationIdent] = useState(false);
  const [validationDone, setValidationDone] = useState(true);

  // Definir el estado para almacenar el valor del primer input
  const [value, setValue] = useState("");

  // Definir el estado para almacenar el valor del segundo input
  const [value2, setValue2] = useState("");

  // Definir el estado para almacenar el valor del name
  const [cardcode, setCardcode] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  // Definir el estado para almacenar el valor del lastname
  const [lastname, setLastName] = useState("");
  const [lastnameError, setLastNameError] = useState(false);

  // Definir el estado para almacenar el valor del email
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState(false);

  // Definir el estado para almacenar el valor del phone
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  // Definir el estado para almacenar el valor del street
  const [street, setStreet] = useState("");
  const [streetError, setStreetError] = useState(false);

  const [selectedGender, setSelectedGender] = useState(0);

  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [ciudadError, setCiudadError] = useState(false);

  const [acceptedTerm1, setAcceptedTerm1] = useState(false);
  const [acceptedTerm2, setAcceptedTerm2] = useState(false);

  const [acepetError, setAceptError] = useState(false);
  const [acepetError1, setAceptError1] = useState(false);

  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [fecNacimientoError, setFecNacimientoError] = useState(false);

  const [consultedEmail, setConsultedEmail] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
    if (email === consultedEmail) {
      setMailError(false);
    }
  };
  
  // Agrega esta función para el segundo InputText
  const handleInputChange2 = (e) => {
    setValue2(e.target.value);
    if (email === consultedEmail) {
      setMailError(false);
    }
  };

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;

    if (onlyLettersAndSpaces.test(inputValue)) {
      setName(inputValue);
      setNameError(false);
    }
  };

  const handleLastNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;

    if (onlyLettersAndSpaces.test(inputValue)) {
      setLastName(inputValue);
      setLastNameError(false);
    }
  };
  // Agrega un estado para controlar si tanto el campo de cédula como el campo de correo están llenos
    const [bothFieldsFilled, setBothFieldsFilled] = useState(false);

  // Agrega un nuevo estado para almacenar el código recibido del correo
    const [codigoRecibido, setCodigoRecibido] = useState('');

    // Agrega un nuevo estado para controlar la visibilidad del cuadro de diálogo de código
    const [showCodigoDialog, setShowCodigoDialog] = useState(false);

    const [codigoValido, setCodigoValido] = useState(false);

    const handleCodigoChange = (e) => {
      const codigoIngresado = e.target.value;
      // Tomar solo los primeros 4 caracteres del código ingresado
      const primerosCuatroCaracteres = codigoIngresado.slice(0, 4);
      // Actualizar el estado del código recibido
      setCodigoRecibido(codigoIngresado);
    
      // Verificar si los primeros 4 caracteres son iguales al código ingresado
      if (codigoIngresado.substring(0, 4) === primerosCuatroCaracteres) {
        // Establecer el estado de código válido
        setCodigoValido(true);
      } else {
        // Mostrar mensaje de código inválido
        toast.error('Se ingreso mal el còdigo.');
        // Establecer el estado de código válido en falso
        setCodigoValido(false);
      }
    };
    
    // Define una función de manejo de cambio para el campo de cédula
    const handleCedulaChange = (e) => {
      // Actualiza el estado del campo de cédula
      setValue(e.target.value);
      // Verifica si ambos campos están llenos y actualiza el estado correspondiente
      setBothFieldsFilled(e.target.value && correo);
    };

  // Agrega un nuevo estado para controlar la visibilidad del campo de correo
    const [showEmailInput, setShowEmailInput] = useState(true);
    // Agrega un nuevo estado para almacenar el código enviado por correo electrónico
    const [codigoEnviado, setCodigoEnviado] = useState('');

    const verificarCodigo = () => {
      if (codigoRecibido === codigoEnviado) {
        console.log('Código válido');
        toast.success('Código válido');
        setCodigoValido(true);
        setShowCodigoDialog(false);
        handleSubmit(); // Llama a handleSubmit sin pasar el evento
        setSendButtonVisible(false);
        setShowEmailInput(false);
      } else {
        console.log('Código inválido');
        toast.error('Código incorrecto');
      }
    };
    

  // Función para volver a solicitar el código
  const handleRetry = () => {
    setShowCodigoDialog(true); // Mostrar el diálogo para solicitar el código nuevamente
    setCodigoRecibido(''); // Limpiar el estado del código recibido
    setCodigoValido(false); // Establecer el estado del código válido a false
  };

  const [sendButtonVisible, setSendButtonVisible] = useState(true);
  // Define un estado para controlar si el campo de cédulas está habilitado o no
  const [cedulaEnabled, setCedulaEnabled] = useState(true);

  const enviarCorreo = async () => {
    try {
      // Generar un código aleatorio de 4 dígitos
      const codigoAleatorio = Math.floor(1000 + Math.random() * 9000);
      const codigoFormateado = codigoAleatorio.toString(); // Convertir el código en una cadena
  
      const url = `/email/enviar-correo`;
      const data = {
        destinatarios: [correo],
        asunto: '¡Bienvenido a Manamer!',
        // Usar el código aleatorio generado como cuerpo del mensaje junto con el mensaje de bienvenida
        cuerpo: `¡Bienvenido a Manamer!\n\n
        Te damos una cordial bienvenida a nuestra plataforma. 
        Estamos encantados de tenerte con nosotros.\n\n
        Tu código de acceso es: ${codigoFormateado}\n\n
        Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. 
        Estamos aquí para ayudarte en todo lo que necesites.\n\n
        ¡Gracias por unirte a Manamer!\n\nAtentamente,\nEl Equipo de Manamer`
      };
  
      // Realizar la solicitud POST usando fetch
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      // Verificar el estado de la respuesta
      if (response.ok) {
        console.log('Correo enviado exitosamente');
        // Mostrar el cuadro de diálogo emergente para solicitar el código
        setShowCodigoDialog(true);
        //setCodigoRecibido(codigoFormateado); // Establecer el código recibido en el estado
        setCodigoValido(true); // Establecer el estado del código válido en verdadero
        setSendButtonVisible(false); // Ocultar el botón de enviar correo después de hacer clic en él
        setShowEmailInput(false); // Ocultar el campo de correo después de aceptar el código
        // Guarda el código enviado en el estado
        setCodigoEnviado(codigoFormateado);
        // Agrega este console.log para verificar el valor de codigoEnviado
        //console.log('Código enviado:', codigoFormateado);
      } else 
      {
        throw new Error('Error al enviar el correo');
      }
    } catch (error) 
      {
        console.error('Error al enviar el correo:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
      }
  };
  

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
    const inputValue = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(inputValue)) {
      // Si el correo cumple con el patrón de expresión regular, no hay error
      setMailError(false);
      // Actualiza el estado del campo de correo
      setCorreo(e.target.value);
      // Verifica si ambos campos están llenos y actualiza el estado correspondiente
      setBothFieldsFilled(e.target.value && value);
    } else {
      // Si el correo no cumple con el patrón, hay un error
      setMailError(true);
      // Además, puedes mostrar un mensaje de error al usuario
      toast.error('Por favor, ingrese un correo electrónico válido.');
    }
  };
  

  const handleMailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value === consultedEmail) {
      setMailError(false);
    } else {
      setMailError(true);
    }
  };

  const handlePhoneChange = (event) => {
    const inputValue = event.target.value;
    const numberPattern = /^[0-9]*$/;

    if (!numberPattern.test(inputValue)) {
      setPhoneError(true);
    } else {
      setPhone(inputValue);
      setPhoneError(false);
    }
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    setStreetError(false);
  };

  const handleSelectionChange = (selectedProvincia, selectedCiudad) => {
    setProvincia(selectedProvincia);
    setCiudad(selectedCiudad);
  };

  const handleCheckChange1 = (e) => {
    setAcceptedTerm1(e.checked);
    setAceptError(false);
  };

  const handleCheckChange2 = (e) => {
    setAcceptedTerm2(e.checked);
    setAceptError1(false);
  };

  const handleGenderChange = (selectedValue) => {
    setSelectedGender(selectedValue);
  };

  const handleBirthdayChange = (event) => {
    const selectedDate = new Date(event.value);

    if (!isNaN(selectedDate.getTime())) {
      setFechaNacimiento(selectedDate);
      setFecNacimientoError(false);
    } else {
      setFecNacimientoError(true);
    }
  };

  const obtenerFecha = () => {
    const fec = new Date();
    const dia = fec.getDate();
    const mes = fec.getMonth() + 1;
    const anio = fec.getFullYear();

    return anio + "-" + mes + "-" + dia;
  };

  const obtenerHora = () => {
    const fec = new Date();
    const hora = fec.getHours();
    const minutos = fec.getMinutes();
    const segundos = fec.getSeconds();

    const horaFormateada = `${hora < 10 ? "0" + hora : hora}:${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundos < 10 ? "0" + segundos : segundos}`;

    return horaFormateada;
  };

  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const handleUpdateData = async () => {
    if (!lastname) {
      setLastNameError(true);
      return;
    }
    if (!name) {
      setNameError(true);
      return;
    }
    if (!email) {
      setMailError(true);
      return;
    }
    if (!ciudad) {
      setCiudadError(true);
      return;
    }

    if (!fechaNacimiento) {
      setFecNacimientoError(true);
      return;
    }
    if (acceptedTerm1 === false) {
      setAceptError(true);
      return;
    }
    if (acceptedTerm2 === false) {
      setAceptError1(true);
      return;
    }

    const formattedDate = `${fechaNacimiento.getFullYear()}-${String(
      fechaNacimiento.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaNacimiento.getDate()).padStart(2, "0")}`;

    const codeProv = ProvinciaCode(provincia.toUpperCase());

    const nuevaFechaRegistro = obtenerFecha();
    const horaRes = obtenerHora();
    const platform = navigator.userAgent;

    const body = {
      CardCode: cardcode,
      CardName: lastname.toUpperCase() + " " + name.toUpperCase(),
      Phone1: phone,
      EmailAddress: email.toLowerCase(),

      BillToState: codeProv,
      BillToCity: ciudad.toUpperCase(),
      BillToStreet: street,

      U_INTRX_FM_Sexo: selectedGender,
      U_DV_PRIV: "True",
      U_CG3_FNAC: formattedDate,
      U_DV_TERM_COND: "True",
      U_DV_FECHA_ACEP: nuevaFechaRegistro,
      U_DV_HORA_ACEP: horaRes,
      U_DV_DISPOSITIVO: platform,
      U_DV_MEDIO: 2,
    };

    setIsLoading(true);
    const respPatch = await PatchCliente(body);
    console.log(respPatch);

    if (respPatch !== HTTP_STATUS_NO_CONTENT) {
      let errorMessage =
        "Error al actualizar el cliente, comunicarse con Sistemas";

      if (respPatch === HTTP_STATUS_BAD_GATEWAY) {
        errorMessage = "Error al actualizar, señal de Internet baja!!!";
      }

      alert(errorMessage);
      setValidationDone(true);
      setValidationIdent(false);
      setIsLoading(false);
    }

    setIsLoading(false);
    setShowDialog2(true);

    setValidationDone(true);
    setValidationIdent(false);
    setValue("");
  };
  const [hiddenConsultButton, setHiddenConsultButton] = useState(false);
 React.useEffect(() => {
    setHiddenConsultButton(true);
  }, []);
  const handleSubmit = async (e) => {
    
      // Desactiva el campo de cédulas
      setCedulaEnabled(false);
    setHiddenConsultButton(true); // Oculta el botón de consultar después de la validación inicial
   
    e && e.preventDefault();
    setIsLoading(true);
    
    setName("");
    setLastName("");
    setFechaNacimiento(null);
    setEmail("");
    setPhone("");
    setStreet("");
    setCiudad("");
    setProvincia("");
    setSelectedGender(0);
    setAcceptedTerm1(false);
    setAcceptedTerm2(false);

    try {
      const resCliente = await DataCliente(value);
      setValidationIdent(true);
      setValidationDone(false);

      const { nombres, apellidos } = SepararNombresApellidos(
        resCliente.data.Name
      );

      setCardcode(resCliente.data.CardCode);
      setName(nombres);
      setLastName(apellidos);
      setEmail(resCliente.data.Email);
      setPhone(resCliente.data.Phone);
      setStreet(resCliente.data.Street);

      if (resCliente.data.Birthday) {
        const fechaNacimientoParsed = new Date(resCliente.data.Birthday);
        setFechaNacimiento(fechaNacimientoParsed);
      } else {
        console.error("No se pudo obtener la fecha de nacimiento");
      }
      setConsultedEmail(resCliente.data.Email); // Guardar el correo consultado
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        console.error("Usuario no encontrado");
        setShowDialog(true);
        setIsLoading(false);
      } else {
        console.error("Error desconocido:", error.message);
        alert(error.message);
        setIsLoading(false);
      }
    }
    
  };

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <ClipLoader color="#781437" loading={isLoading} size={50} />
        </div>
      )}
      <div className="container">
      <br></br><br></br><br></br>
        <img src="/manamer.jpg" alt="Manamer" width={170} height={50} />
        <br></br>
        <span className="p-float-label">
       <InputText value={value} onChange={handleCedulaChange} disabled={!cedulaEnabled} />
        <label htmlFor="label1">Cedula</label>
        </span>
        <br></br>
        {showEmailInput && (
          <div className="container"> 
            <span className="p-float-label">
            <InputText value={correo} onChange={handleCorreoChange} />
              <label htmlFor="label1">Correo</label>
            </span>
            <br />
            {sendButtonVisible && (
              <Button type="submit" label="Enviar Correo" onClick={enviarCorreo} disabled={sendButtonDisabled} />
            )}
          </div>
        )}
      <br></br>
      {showCodigoDialog && (
  <Dialog
    header="El código se ha enviado a tu correo electrónico. Por favor ingrésalo aquí."
    visible={showCodigoDialog}
    style={{ width: "80vw", maxWidth: "400px" }} // Ancho del diálogo adaptable
    onHide={() => setShowCodigoDialog(false)}
    modal
    footer={
      <>
        <Button onClick={verificarCodigo} label="Aceptar" disabled={!codigoRecibido} />
      </>
    }
  >
    <div>
      <span className="p-float-label">
        <InputText value={codigoRecibido} onChange={handleCodigoChange} />
        <label htmlFor="label1">Código</label>
      </span>
    </div>
  </Dialog>
)}

      <>
        {!hiddenConsultButton && !validationIdent && (
          <div>
            <Button type="submit" label="Consultar" onClick={handleSubmit} />
          </div>    
        )}
      </>
        {validationDone ? (
          false
        ) : (
          <>
            <div className="p-field">
              Nombre:
              <InputText
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                className={nameError ? "input-error" : ""}
              />
              {nameError && (
                <small className="error-message">* Campo obligatorio.</small>
              )}
            </div>

            <div className="p-field">
              Apellido:
              <InputText
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={handleLastNameChange}
                className={lastnameError ? "input-error" : ""}
              />
              {lastnameError && (
                <small className="error-message">* Campo obligatorio.</small>
              )}
            </div>

            <div className="p-field">
              <GenderSelect onGenderChange={handleGenderChange} />
            </div>

            <div>
              Fecha de Nacimiento:
              <div className="calendar-container">
                <Calendar
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={handleBirthdayChange}
                  showIcon
                  monthNavigator
                  yearNavigator
                  yearRange="1950:2030"
                  className={fecNacimientoError ? "input-error" : ""}
                  locale="es"
                  dateFormat="dd/mm/yy"
                />
              </div>
              {fecNacimientoError && (
                <small className="error-message">* Campo obligatorio</small>
              )}
            </div>

            <div className="p-field">
              Correo Electrónico:
              <InputText
                id="email"
                name="email"
                value={email}
                onChange={handleMailChange}
                className={mailError ? "input-error" : ""}
              />
              {mailError && (
                <small className="error-message">* Campo obligatorio.</small>
              )}
            </div>

            <div className="p-field">
              <CitiesProv
                onSelectionChange={handleSelectionChange}
                className={ciudadError ? "input-error" : ""}
              />

              {ciudadError && (
                <small className="error-message">
                  * Campo obligatorio. Elegir Provincia.
                </small>
              )}
            </div>

            <div className="p-field">
              Teléfono:
              <InputText
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={phoneError ? "input-error" : ""}
              />
              {phoneError && (
                <small className="error-message">
                  * Campo obligatorio. Solo números.
                </small>
              )}
            </div>

            <div className="p-field">
              Calle:
              <InputText
                id="street"
                name="street"
                value={street}
                onChange={handleStreetChange}
                className={streetError ? "input-error" : ""}
              />
              {streetError && (
                <small className="error-message">* Campo obligatorio.</small>
              )}
            </div>

            <div>
              <div className="checkbox-row">
                <Checkbox
                  checked={acceptedTerm1}
                  onChange={handleCheckChange1}
                  className={acepetError ? "input-error" : ""}
                />
                <a href="/terminosCondiciones.pdf" download target="_blank">
                  &nbsp; Acepto los términos y condiciones de uso
                </a>
                {acepetError && (
                  <small className="error-message">
                    * Por favor acepta los términos y condiciones de uso.
                  </small>
                )}
              </div>
              <div className="checkbox-row">
                <Checkbox
                  checked={acceptedTerm2}
                  onChange={handleCheckChange2}
                  className={acepetError1 ? "input-error" : ""}
                />
                <a href="/politica.pdf" download target="_blank">
                  &nbsp; Acepto las políticas de privacidad
                </a>
                {acepetError1 && (
                  <small className="error-message">
                    * Por favor acepta las políticas de privacidad.
                  </small>
                )}
              </div>
            </div>

            <br></br>
            <div>
              <Button label="Actualizar" onClick={handleUpdateData} />
            </div>
          </>
        )}
      </div>
      <Dialog
        header="Usuario no encontrado"
        visible={showDialog}
        style={{ width: "30vw" }}
        onHide={() => setShowDialog(false)}
        modal
        footer={<Button onClick={() => setShowDialog(false)} label="Aceptar" />}
      >
        <div>El usuario ingresado no se encuentra en la base de datos o el código ingresado es incorrecto</div>
      </Dialog>

      <Dialog
        header="Actualización Exitosa"
        visible={showDialog2}
        style={{ width: "30vw" }}
        onHide={() => setShowDialog2(false)}
        modal
        footer={
          <Button onClick={() => setShowDialog2(false)} label="Aceptar" />
        }
      >
        <div>Los datos del usuario se actualizaron exitosamente.</div>
      </Dialog>
    </>
  );
}

export default Formulario;