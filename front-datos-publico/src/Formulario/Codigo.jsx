import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

function CodigoVerification() {
  const [codigoRecibido, setCodigoRecibido] = useState('');
  const [showCodigoDialog, setShowCodigoDialog] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Abrir automáticamente el diálogo al cargar la vista
    setShowCodigoDialog(true);
  }, []);

  const handleCodigoChange = (e) => {
    const codigoIngresado = e.target.value;
    setCodigoRecibido(codigoIngresado);
  };

  const verificarCodigo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5001/validar-codigo', { codigo: codigoRecibido });
      if (response.status === 200) {
        toast.success('Código válido');
        setCodigoValido(true);
        setShowCodigoDialog(false);
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      toast.error('Código incorrecto');
      setCodigoValido(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setShowCodigoDialog(true);
    setCodigoRecibido('');
    setCodigoValido(false);
  };

  return (
    <>
      <Dialog
        header="El código se ha enviado a tu correo electrónico. Por favor ingrésalo aquí."
        visible={showCodigoDialog}
        style={{ width: "80vw", maxWidth: "400px" }}
        onHide={() => setShowCodigoDialog(false)}
        modal
        footer={
          <>
            <Button onClick={verificarCodigo} label="Aceptar" disabled={!codigoRecibido || isLoading} />
            <Button onClick={handleRetry} label="Reintentar" />
          </>
        }
      >
        <div>
          <span className="p-float-label">
            <InputText value={codigoRecibido} onChange={handleCodigoChange} />
            <label htmlFor="label1">Código</label>
          </span>
        </div>
        {isLoading && (
          <div className="loader-container">
            <ClipLoader color="#781437" loading={isLoading} size={50} />
          </div>
        )}
      </Dialog>
    </>
  );
}

export default CodigoVerification;
