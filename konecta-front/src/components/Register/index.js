import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Asegúrate de importar el archivo CSS

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { nombre, email, password });
      alert('Registro exitoso');
    } catch (error) {
      alert('Error en el registro');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="input-field"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-field"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
          required
        />
        <button type="submit" className="submit-button">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
