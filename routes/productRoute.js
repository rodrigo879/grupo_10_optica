const express= require ('express');
const router = express.Router();

const upload = require('../middleware/multerMiddelware');
const authMiddleware = require('../middleware/authMiddleware')
const guestMiddleware = require('../middleware/guestMiddleware');
const productController= require('../controllers/productController');

//RUTAS
//FORMULARIO DE CREACION
router.get('/create', authMiddleware, productController.showFormCreate);
router.post('/create', upload.single('imageProduct'), productController.create);

//LISTADO DE PRODUCTOS POR CATEGORIA
router.get('/anteojosRecetados', productController.lentesRecetado);
router.get('/anteojosSol', productController.lentesSol);
router.get('/anteojosLentesContacto', productController.lentesContacto);
router.get('/accesorios', productController.accesorios);

//DETALLE DE UN PRODUCTO
router.get('/product/:id', guestMiddleware, productController.product);

//EDITAR UN PRODUCTO
router.get('/product/:id/edit',  authMiddleware, productController.edit);
router.put('/product/:id/update', upload.single ('imageProduct'), productController.update);

//BORRAR UN PRODUCTO
router.delete('/product/:id', productController.delete)

//CARRITO DE COMPRAS
router.get('/productCart', authMiddleware, productController.productCart);
router.post('/productCart', productController.calculoEnvio);

module.exports= router;