import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const enviarCorreo = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/enviar-correo?destinatario=${email}`);
      setMessage(response.data);
    } catch (error) {
      setMessage('Error al enviar el correo');
      console.error('Error:', error);
    }
  };

  const verificarCodigo = async () => {
    try {
      const response = await axios.post('http://localhost:5001/verificar-codigo', {
        destinatario: email,
        codigo: verificationCode,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error al verificar el código');
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Enviar y Verificar Correo</h1>

      <label htmlFor="email">Correo Electrónico:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={enviarCorreo}>Enviar Correo</button>

      <div>
        <label htmlFor="verificationCode">Código de Verificación:</label>
        <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button onClick={verificarCodigo}>Verificar Código</button>
      </div>

      <p>{message}</p>
    </div>
  );
}

export default App;
