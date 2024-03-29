const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerMiddelware')
const { validacionLoginUsers, validacionCreateUsers, validacionChangePass } = require('../middlewares/validatorMiddelware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const usersController = require('../controllers/usersController');

// LOGUEARSE
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validacionLoginUsers, usersController.logged);

// LOGOUT
router.get('/logout', usersController.logout);

// REGISTRARSE
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('imageUser'), validacionCreateUsers, usersController.create);

// PROFILE
router.get('/profile/:id', authMiddleware, usersController.profile);
router.put('/profile/:id/edit', upload.single('imageUser'), usersController.editProfile);

// CAMBIAR LA PASSWORD
router.get('/profile/:id/password', authMiddleware, usersController.password);
router.put('/profile/:id/passwordEdit', validacionChangePass, usersController.passwordEdit);

// BORRAR EL USUARIO
router.delete('/profile/:id', authMiddleware, usersController.delete);

// CAMBIAR EL ROL DE USUARIO
router.get('/changeAuthority/:id', usersController.changeAuthority);
router.put('/changeAuthority/:id/edit', usersController.updateAuthority);

// LISTA DE USUARIOS
router.get('/userList', adminMiddleware, usersController.userList);

module.exports = router;