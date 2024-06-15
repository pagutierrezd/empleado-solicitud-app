const Empleado = require('../models/empleado');

exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

exports.createEmpleado = async (req, res) => {
  try {
    console.log('req.body',req.body)
    const empleado = await Empleado.create(req.body);
    res.json(empleado);
  } catch (error) {
    console.log('error',error)
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

exports.updateEmpleado = async (req, res) => {
  try {
    const [updated] = await Empleado.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEmpleado = await Empleado.findByPk(req.params.id);
      res.json(updatedEmpleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const deleted = await Empleado.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Empleado eliminado' });
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};
