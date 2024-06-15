import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Empleados.css'; // Importa el archivo de estilos CSS

const autorization_token = localStorage.getItem('token');

const Empleados = () => {
  const obtenerFechaActual = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fechaActual = obtenerFechaActual();
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    salario: '',
    fecha_ingreso: fechaActual,
  });

  useEffect(() => {
    fetchEmpleados();
  }, []);

  useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = autorization_token;
  }, [autorization_token]);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('/api/empleados', {
        headers: {
          'x-auth-token': autorization_token,
        },
      }); // Endpoint para obtener empleados desde el backend
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const agregarEmpleado = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/empleados', nuevoEmpleado, {
        headers: {
          'x-auth-token': autorization_token,
        },
      }); // Endpoint para crear un nuevo empleado
      fetchEmpleados(); // Actualizar la lista después de la creación
      setNuevoEmpleado({ nombre: '', salario: '', fecha_ingreso: fechaActual }); // Limpiar el formulario después de agregar
    } catch (error) {
      console.error('Error al agregar empleado:', error);
    }
  };

  const eliminarEmpleado = async (id) => {
    try {
      await axios.delete(`/api/empleados/${id}`, {
        headers: {
          'x-auth-token': autorization_token,
        },
      }); // Endpoint para eliminar un empleado
      fetchEmpleados(); // Actualizar la lista después de la eliminación
    } catch (error) {
      console.error(`Error al eliminar empleado con ID ${id}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="empleados-container">
      <div className="empleados-column">
        <h2>Registrar Empleado</h2>
        <form onSubmit={agregarEmpleado}>
          <input
            type="text"
            name="nombre"
            value={nuevoEmpleado.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="number"
            name="salario"
            value={nuevoEmpleado.salario}
            onChange={handleChange}
            placeholder="Salario"
            required
          />
          <button type="submit">Agregar Empleado</button>
        </form>
      </div>
      <div className="empleados-column">
        <h2>Empleados Actuales</h2>
        <ul>
          {empleados.map((empleado) => (
            <li key={empleado.id} className="empleado-item">
              <span><strong>{empleado.nombre}</strong> - Salario: {empleado.salario}</span>
              <button onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Empleados;
