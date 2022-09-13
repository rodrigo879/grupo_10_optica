const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerMiddelware')
const validatorMiddelware = require('../middlewares/validatorMiddelware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const usersController = require('../controllers/usersController');

// LOGUEARSE
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validatorMiddelware.validacionLoginUsers, usersController.logged);

// LOGOUT
router.get('/logout', usersController.logout);

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
router.delete('/profile/:id', authMiddleware, usersController.delete)

// LISTA DE USUARIOS
router.get('/userList', adminMiddleware, usersController.userList);

module.exports = router;