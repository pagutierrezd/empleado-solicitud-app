const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');
const auth = require('../middleware/auth');

router.get('/', auth, solicitudController.getSolicitudes);
router.post('/', auth, solicitudController.createSolicitud);
router.get('/:id', auth, solicitudController.getSolicitudById);
router.put('/:id', auth, solicitudController.updateSolicitud);
router.delete('/:id', auth, solicitudController.deleteSolicitud);

module.exports = router;
