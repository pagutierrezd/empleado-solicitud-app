import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DashBoard.css';

const autorization_token = localStorage.getItem('token');

function Dashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetchEmpleados();
    fetchSolicitudes();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('/api/empleados',{
        headers: {
          'x-auth-token': autorization_token
        }
      });
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get('/api/solicitudes',{
        headers: {
          'x-auth-token': autorization_token
        }
      });
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <section>
        <h3>Usuarios (Empleados)</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Salario</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(empleado => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.salario}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/empleados" className="btn">Añadir empleados</Link>
      </section>

      <section>
        <h3>Solicitudes</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Nombre de Usuarios</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map(solicitud => (
              <tr key={solicitud.id}>
                <td>{solicitud.id}</td>
                <td>{solicitud.codigo}</td>
                <td>{solicitud.descripcion}</td>
                <td>{solicitud.Empleado.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/solicitudes" className="btn">Añadir solicitudes</Link>
      </section>
    </div>
  );
}

export default Dashboard;
