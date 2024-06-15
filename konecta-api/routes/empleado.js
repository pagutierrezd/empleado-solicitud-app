const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const auth = require('../middleware/auth');

router.get('/',auth, empleadoController.getEmpleados);
router.post('/',auth, empleadoController.createEmpleado);
router.get('/:id',auth, empleadoController.getEmpleadoById);
router.put('/:id',auth, empleadoController.updateEmpleado);
router.delete('/:id',auth, empleadoController.deleteEmpleado);

module.exports = router;