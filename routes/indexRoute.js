const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController')

router.get('/', indexController.index);
router.get('/contact', indexController.contact);

module.exports = router;