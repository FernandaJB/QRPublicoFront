import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import smallImage from './imagenes/manamer.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FloatingLabelContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #666;
`;

const ErrorLabel = styled.label`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SmallImage = styled.img`
  width: 150px;
  height: 90px;
  margin-bottom: 10px;
`;

const MyForm = () => {
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [cedulaError, setCedulaError] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [codigoError, setCodigoError] = useState('');
  const [cedulaCorreoError, setCedulaCorreoError] = useState('');
  const [consulting, setConsulting] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [showFormularioButton, setShowFormularioButton] = useState(false);

  const validateCedula = () => {
    const cedulaPattern = /^[0-9]{10}$/;
    if (!cedulaPattern.test(cedula)) {
      setCedulaError('Ingrese una cédula válida (10 dígitos numéricos)');
    } else {
      setCedulaError('');
    }
  };

  const validateCorreo = () => {
    const correoPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoPattern.test(correo)) {
      setCorreoError('Ingrese una dirección de correo electrónico válida');
    } else {
      setCorreoError('');
    }
  };

  const es_numerico = (cadena) => {
    try {
      parseInt(cadena);
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateCodigo = () => {
    const codigoPattern = /^[0-9]{9}$/;
    if (!codigoPattern.test(codigo)) {
      setCodigoError('Ingrese un número de código válido');
    } else if (!es_numerico(codigo)) {
      setCodigoError('El código debe ser un número');
    } else {
      setCodigoError('');
    }
  };

  const handleCedulaChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    setCedula(inputValue);
  };

  const handleButtonClick = async () => {
    validateCedula();
    validateCorreo();

    if (cedulaError === '' && correoError === '') {
      console.log('Datos enviados al backend:', { cedula});
      setConsulting(true);

      if (cedula.startsWith("MZPR")) {
        console.log('Cardcode no válido (comienza con "MZPR")');
        setConsulting(false);
        return;
      }

      let codigoIngresado;

      if (!codigoEnviado) {
        try {
          const destinatario = correo;
          const url = `http://localhost:5001/enviar-correo?destinatario=${encodeURIComponent(destinatario)}`;
          await axios.get(url);

          console.log('Correo enviado exitosamente');
          toast.success('Correo enviado exitosamente');
          setCodigoEnviado(true);
        } catch (error) {
          console.error('Error al enviar el correo:', error);
          toast.error('Error al enviar el correo');
          setConsulting(false);
          return;
        }
      }

      if (!codigoEnviado) {
        codigoIngresado = prompt('Ingrese el código recibido por correo:');
        if (!codigoIngresado) {
          console.error('Código no ingresado');
          toast.error('Código no ingresado');
          setConsulting(false);
          return;
        }

        setCodigo(codigoIngresado);

        if (codigoIngresado === codigo) {
          console.log('Código válido');
        } else {
          console.error('Código incorrecto');
          toast.error('Código incorrecto');
          setConsulting(false);
          return;
        }
      } else {
        console.log('Código ya ha sido enviado, no se solicitará nuevamente');
      }

      try {
        // Agregar aquí la validación de cédula y correo
        const response = await axios.post(`http://localhost:5001/validar-codigo`, { codigo: codigoIngresado, cedula, correo });
        console.log('Respuesta del backend:', response);

        if (response.status === 200) {
          console.log('Código validado correctamente');
          toast.success('Código validado correctamente');
          setShowFormularioButton(true);  // Mostrar el botón para ingresar al formulario
        } else {
          console.error('Código incorrecto o vencido');
          toast.error('Código incorrecto o vencido');
        }
      } catch (error) {
        console.error('Error en la solicitud al backend:', error);
        toast.error('Error en la solicitud al backend');
      } finally {
        setConsulting(false);
      }
    } else {
      console.error('Los datos ingresados no coinciden con los registrados en el backend');
      toast.error('Los datos ingresados no coinciden con los registrados');
      setConsulting(false);

      // Agregar mensaje de error para cédula y correo no coincidentes
      setCedulaCorreoError('La cédula y el correo electrónico no coinciden en nuestros registros');
    }
  };

  const handleFormularioButtonClick = () => {
    console.log('Dale clic para ingresar al Formulario');
    // Agrega aquí la lógica para redirigir o realizar acciones adicionales
  };

  return (
    <FormContainer>
      <SmallImage src={smallImage} alt="Imagen pequeña" />

      <FloatingLabelContainer>
        <span className="p-float-label">
          <InputText id="label1" value={cedula} onChange={handleCedulaChange} />
          <label htmlFor="label1">Cedula</label>
        </span>
        {cedulaError && <ErrorLabel>{cedulaError}</ErrorLabel>}
      </FloatingLabelContainer>

      <FloatingLabelContainer>
        <span className="p-float-label">
          <InputText
            id="label2"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            onBlur={validateCorreo}
          />
          <label htmlFor="label2">Correo Electronico</label>
        </span>
        {correoError && <ErrorLabel>{correoError}</ErrorLabel>}
      </FloatingLabelContainer>

      <Button label="Consultar" onClick={handleButtonClick} disabled={consulting} />
    <br></br>
      {showFormularioButton && (
        <Button 
        label="Clic para ingresar al Formulario" 
        onClick={handleFormularioButtonClick}  
        />
      )}
    </FormContainer>
  );
};


export default MyForm;