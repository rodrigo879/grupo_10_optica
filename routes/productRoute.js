const express= require ('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();

const productController= require('../controllers/productController');

// Para cargar las imagenes de productos, donde se van a cargar y con que nombre
const storage = multer.diskStorage({ 
    destination: (req,file,cb) => {
        if (file.originalname.includes('lentesRecetados')) {
            cb(null, path.join(__dirname, '../public/images/productos/lentesRecetados'));
        } else if (file.originalname.includes('lentesSol')) {
            cb(null, path.join(__dirname, '../public/images/productos/lentesSol'))
        } else if (file.originalname.includes('lentesContacto')) {
            cb(null, path.join(__dirname, '../public/images/productos/lentesContacto'));
        } else {
            cb(null, path.join(__dirname, '../public/images/productos/accesorios'));
        }
    },
    filename: (req,file,cb) => {
        let newFileName = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

// Cargar la imagen
const upload = multer({ storage })

router.get('/product/:id',  productController.product);
router.get('/create', productController.showForm);
router.post('/create', upload.single('imageProduct'), productController.create);
router.get('/anteojosRecetados', productController.lentesRecetado);
router.get('/anteojosSol', productController.lentesSol);
router.get('/anteojosLentesContacto', productController.lentesContacto);
router.get('/accesorios', productController.accesorios);

module.exports= router;