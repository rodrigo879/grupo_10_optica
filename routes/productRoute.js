const express= require ('express');
const router = express.Router();

const upload = require('../middlewares/multerMiddelware');
const authMiddleware = require('../middlewares/authMiddleware')
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
router.get('/product/:id', productController.product);

//EDITAR UN PRODUCTO
router.get('/product/:id/edit', authMiddleware, productController.edit);
router.put('/product/:id/update', upload.single ('imageProduct'), productController.update);

//BORRAR UN PRODUCTO
router.delete('/product/:id', authMiddleware, productController.delete)

//CARRITO DE COMPRAS
router.get('/productCart', authMiddleware, productController.productCart);
router.post('/productCart', productController.calculoEnvio);

module.exports= router;