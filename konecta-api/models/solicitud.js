const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./empleado');  // Asegúrate de que la ruta es correcta

const Solicitud = sequelize.define('Solicitud', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resumen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleado,
      key: 'id'
    }
  }
}, {
  timestamps: false
});

// Establecer la relación
Solicitud.belongsTo(Empleado, { foreignKey: 'id_empleado' });

module.exports = Solicitud;
