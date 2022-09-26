const express = require ('express');
const router = express.Router();

const upload = require('../middlewares/multerMiddelware');
const authMiddleware = require('../middlewares/authMiddleware');
const {validacionProduct} = require('../middlewares/validatorMiddelware');
const productController = require('../controllers/productController');

//RUTAS
//FORMULARIO DE CREACION
router.get('/create', authMiddleware, productController.showFormCreate);
router.post('/create', upload.single('imageProduct'), validacionProduct, productController.create);

//LISTADO DE TODOS LOS PRODUCTOS AGREGADOS
router.get('/all', productController.allProducts);

//LISTADO DE PRODUCTOS POR CATEGORIA
router.get('/anteojosRecetados', productController.lentesRecetado);
router.get('/anteojosSol', productController.lentesSol);
router.get('/anteojosLentesContacto', productController.lentesContacto);
router.get('/accesorios', productController.accesorios);

//EDITAR UN PRODUCTO
router.get('/:id/edit', authMiddleware, productController.edit);
router.put('/:id/update', upload.single ('imageProduct'), validacionProduct, productController.update);

//BORRAR UN PRODUCTO
router.delete('/:id', authMiddleware, productController.delete)

//CARRITO DE COMPRAS
router.get('/productCart', /*authMiddleware,*/ productController.productCart);
router.post('/productCart', productController.calculoEnvio);

//DETALLE DE UN PRODUCTO
router.get('/:id', productController.product);

module.exports = router;