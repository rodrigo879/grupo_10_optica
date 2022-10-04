const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController');

// Rutas

// Datos de un usuario
router.get('/:id', usersApiController.detail); 

module.exports = router;

