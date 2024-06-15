const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const empleadoRoutes = require('./routes/empleado');
const solicitudRoutes = require('./routes/solicitud');
const authRoutes = require('./routes/auth');
const Empleado = require('./models/empleado');
const Solicitud = require('./models/solicitud');
const Usuario = require('./models/usuario');
const cors = require('cors');

const app = express();


app.use(cors()); 

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡Servidor corriendo correctamente!');
});

app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/solicitudes', solicitudRoutes);

sequelize.sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));
