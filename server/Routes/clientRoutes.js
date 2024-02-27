const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const  verifyToken  = require('../middelwares/auth');

router.get('/clients', verifyToken, clientController.getClients);
router.post('/clients', verifyToken, clientController.addClient);
router.put('/clients/:id', verifyToken, clientController.editClient);
router.delete('/clients/:id', verifyToken, clientController.deleteClient);

module.exports = router;
