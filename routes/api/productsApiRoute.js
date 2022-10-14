const express = require ('express');
const router = express.Router ();
const productsApiController = require ('../../controllers/api/productsApiController')

router.get('/', productsApiController.list);
router.get('/lastProduct', productsApiController.lastProduct);
router.get('/moreDiscount', productsApiController.productDiscount);
router.get('/productsByCategory', productsApiController.paginatedProduct);
router.get('/:id', productsApiController.detail);

module.exports= router;