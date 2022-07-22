const express= require ('express');
const router = express.Router();

const upload = require('../middleware/multerMiddelware');
const productController= require('../controllers/productController');

//RUTAS
//DETALLE DE UN PRODUCTO
router.get('/product/:id',  productController.product);

//FORMULARIO DE CREACION
router.get('/create', productController.showForm);
router.post('/create', upload.single('imageProduct'), productController.create);

//LISTADO DE PRODUCTOS POR CATEGORIA
router.get('/anteojosRecetados', productController.lentesRecetado);
router.get('/anteojosSol', productController.lentesSol);
router.get('/anteojosLentesContacto', productController.lentesContacto);
router.get('/accesorios', productController.accesorios);

//EDITAR UN PRODUCTO
router.get('/product/:id/edit',  productController.edit);
router.put('/product/:id/update', upload.single ('imageProduct'), productController.update);

//BORRAR UN PRODUCTO
router.delete('/product/:id', productController.delete)

//CARRITO DE COMPRAS
router.get('/productCart', productController.productCart);
router.post('/productCart', productController.calculoEnvio);


module.exports= router;