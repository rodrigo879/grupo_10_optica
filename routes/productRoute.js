const express= require ('express');
const router = express.Router();

const productController= require('../controllers/productController');

router.get('/:id',  productController.product);

module.exports= router;