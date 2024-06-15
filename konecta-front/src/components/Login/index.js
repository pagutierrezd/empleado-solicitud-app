import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importa el archivo de estilos CSS


function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const token = response.data.token;
      setToken(token); // Almacena el token en el estado de la aplicación
      localStorage.setItem('token', token); // Almacena el token en localStorage
      alert('Inicio de sesión exitoso');
      navigate('/dashboard'); // Redirige al dashboard después del inicio de sesión exitoso
    } catch (error) {
      alert('Error en el inicio de sesión');
    }
  };
  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
