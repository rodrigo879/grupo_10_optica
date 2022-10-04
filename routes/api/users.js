const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController.js')

// Listado de todos los usuarios
router.get('/', usersApiController.list);
// Detalle del usuario
router.get('/:id', usersApiController.detail);






module.exports = router;