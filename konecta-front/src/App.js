import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Empleados from './components/Empleados';
import Solicitudes from './components/Solicitudes';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = token;
  }, [token]);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        {token && (
          <header className="app-header">
            <nav className="nav-bar">
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/empleados">Empleados</Link></li>
                <li><Link to="/solicitudes">Solicitudes</Link></li>
                <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
              </ul>
            </nav>
          </header>
        )}

        <main className="app-content">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/empleados" element={<ProtectedRoute element={Empleados} />} />
            <Route path="/solicitudes" element={<ProtectedRoute element={Solicitudes} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
