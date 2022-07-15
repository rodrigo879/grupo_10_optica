const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/usersController')
const path = require('path')

// Para cargar las imagenes de productos, donde se van a cargar y con que nombre
const storage = multer.diskStorage({ 
    destination: (req,file,cb) => {
       cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req,file,cb) => {
        let newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

// Cargar la imagen
const upload = multer({ storage })



router.get('/login', usersController.login);
router.post('/login', usersController.logged);



router.get('/register', usersController.register);
router.post('/register', upload.single('imageUser'), usersController.create);




module.exports = router;