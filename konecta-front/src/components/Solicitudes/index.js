import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Solicitudes.css'; // Importa el archivo de estilos CSS

const autorization_token = localStorage.getItem('token');

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [nuevaSolicitud, setNuevaSolicitud] = useState({
    codigo: '',
    descripcion: '',
    resumen: '',
    id_empleado: ''
  });

  useEffect(() => {
    fetchSolicitudes();
    fetchEmpleados();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get('/api/solicitudes', {
        headers: {
          'x-auth-token': autorization_token
        }
      });
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('/api/empleados', {
        headers: {
          'x-auth-token': autorization_token
        }
      });
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const agregarSolicitud = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/solicitudes', nuevaSolicitud, {
        headers: {
          'x-auth-token': autorization_token
        }
      });
      fetchSolicitudes();
      setNuevaSolicitud({ codigo: '', descripcion: '', resumen: '', id_empleado: '' });
    } catch (error) {
      console.error('Error al agregar solicitud:', error);
    }
  };

  const eliminarSolicitud = async (id) => {
    try {
      await axios.delete(`/api/solicitudes/${id}`, {
        headers: {
          'x-auth-token': autorization_token
        }
      });
      fetchSolicitudes();
    } catch (error) {
      console.error(`Error al eliminar solicitud con ID ${id}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaSolicitud(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-column">
        <h2>Registrar Solicitud</h2>
        <form onSubmit={agregarSolicitud}>
          <input
            type="text"
            name="codigo"
            value={nuevaSolicitud.codigo}
            onChange={handleChange}
            placeholder="Código"
            required
          />
          <input
            type="text"
            name="descripcion"
            value={nuevaSolicitud.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <input
            type="text"
            name="resumen"
            value={nuevaSolicitud.resumen}
            onChange={handleChange}
            placeholder="Resumen"
            required
          />
          <select
            className="styled-select"
            name="id_empleado"
            value={nuevaSolicitud.id_empleado}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un empleado</option>
            {empleados.map(empleado => (
              <option key={empleado.id} value={empleado.id}>{empleado.nombre}</option>
            ))}
          </select>
          <button type="submit">Agregar Solicitud</button>
        </form>
      </div>
      <div className="solicitudes-column">
        <h2>Solicitudes Existentes</h2>
        <ul>
          {solicitudes.map(solicitud => (
            <li key={solicitud.id} className="solicitud-item">
              <div className="solicitud-info">
                <strong>Código Solicitud:</strong> {solicitud.codigo}, 
                <strong> Empleado:</strong> {solicitud.Empleado.nombre}, 
                <strong> Descripción:</strong> {solicitud.descripcion}
              </div>
              <button onClick={() => eliminarSolicitud(solicitud.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Solicitudes;
