const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.index);
router.get('/contact', mainController.contact);
router.get('/create', mainController.showForm);
router.post('/create', mainController.create);


module.exports = router;