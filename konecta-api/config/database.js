const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno desde .env

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRESQL_ADDON_HOST,
  port: process.env.POSTGRESQL_ADDON_PORT,
  username: process.env.POSTGRESQL_ADDON_USER,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  database: process.env.POSTGRESQL_ADDON_DB
});

module.exports = sequelize;
