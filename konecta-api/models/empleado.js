const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empleado = sequelize.define('Empleado', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: false
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Empleado;
