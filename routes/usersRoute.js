const express = require('express');
const router = express.Router();

const upload = require('../middleware/multerMiddelware')
const usersController = require('../controllers/usersController')

// LOGUEARSE
router.get('/login', usersController.login);
router.post('/login',usersController.logged);


// REGISTRARSE
router.get('/register', usersController.register);
router.post('/register', upload.single('imageUser'), usersController.create);

// PROFILE
router.get('/profile/:id', usersController.profile);
router.put('/profile/:id/edit', upload.single('imageUser'), usersController.editProfile);

// CAMBIAR LA PASSWORD
router.get('/profile/:id/password', usersController.password);
router.put('/profile/:id/passwordEdit', usersController.passwordEdit);

// BORRAR EL USUARIO
router.delete('/profile/:id', usersController.delete)

// LISTA DE USUARIOS
router.get('/userList', usersController.userList);

module.exports = router;