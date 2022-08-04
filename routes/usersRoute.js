const express = require('express');
const router = express.Router();


const upload = require('../middleware/multerMiddelware')
const validatorMiddelware = require('../middleware/validatorMiddelware');
const authMiddleware = require('../middleware/authMiddleware');
const guestMiddleware = require('../middleware/guestMiddleware');
const usersController = require('../controllers/usersController');

// LOGUEARSE
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validatorMiddelware.validacionLoginUsers, usersController.logged);

// REGISTRARSE
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('imageUser'), validatorMiddelware.validacionCreateUsers, usersController.create);

// PROFILE
router.get('/profile/:id', authMiddleware, usersController.profile);
router.put('/profile/:id/edit', upload.single('imageUser'), usersController.editProfile);

// CAMBIAR LA PASSWORD
router.get('/profile/:id/password', authMiddleware, usersController.password);
router.put('/profile/:id/passwordEdit', usersController.passwordEdit);

// BORRAR EL USUARIO
router.delete('/profile/:id', usersController.delete)

// LISTA DE USUARIOS
router.get('/userList', authMiddleware, usersController.userList);

module.exports = router;