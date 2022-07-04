const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.index);
router.get('/contact', mainController.contact);
router.get('/create', mainController.showForm);
router.post('/create', mainController.create);
router.get('/anteojosRecetados', mainController.lentesRecetado);
router.get('/anteojosSol', mainController.lentesSol);
router.get('/anteojosLentesContacto', mainController.lentesContacto);
router.get('/accesorios', mainController.accesorios);


module.exports = router;