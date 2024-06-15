const Solicitud = require('../models/solicitud');
const Empleado = require('../models/empleado');

exports.getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll({
      include: {
        model: Empleado,
        attributes: ['nombre'], // Solo incluir el nombre del empleado
      },
      attributes: { exclude: ['id_empleado'] } // Excluir el campo 'id_empleado' de Solicitud
    });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

exports.getSolicitudById = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByPk(req.params.id, {
      include: {
        model: Empleado,
        attributes: { exclude: ['id'] } // Excluir el campo 'id' de Empleado
      },
      attributes: { exclude: ['id_empleado'] } // Excluir el campo 'id_empleado' de Solicitud
    });
    if (solicitud) {
      res.json(solicitud);
    } else {
      res.status(404).json({ error: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la solicitud' });
  }
};

exports.createSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.create(req.body);
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear solicitud' });
  }
};

exports.updateSolicitud = async (req, res) => {
  try {
    const [updated] = await Solicitud.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSolicitud = await Solicitud.findByPk(req.params.id, {
        include: {
          model: Empleado,
          attributes: { exclude: ['id'] } // Excluir el campo 'id' de Empleado
        },
        attributes: { exclude: ['id_empleado'] } // Excluir el campo 'id_empleado' de Solicitud
      });
      res.json(updatedSolicitud);
    } else {
      res.status(404).json({ error: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar solicitud' });
  }
};

exports.deleteSolicitud = async (req, res) => {
  try {
    const deleted = await Solicitud.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Solicitud eliminada' });
    } else {
      res.status(404).json({ error: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar solicitud' });
  }
};