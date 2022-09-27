const { body } = require('express-validator')
const usersJson = require('../jsondatabase/jsonTable');
const bcryptjs= require('bcryptjs');
const usersModel = usersJson('users');

let validatorMiddelware = {
    validacionCreateUsers: [
        body('fullName').notEmpty().withMessage('Debe ingresar su nombre').bail().isLength({min: 3}).withMessage('Debe contener minimo 3 caracteres'),
        body('user').notEmpty().withMessage('Debe ingresar un nombre de usuario').bail().isLength({min: 3}).withMessage('Debe contener minimo 3 caracteres'),
        body('email').notEmpty().withMessage('Debe ingresar un email valido').bail().isEmail().withMessage('Debe ser de formato em@il'),
        body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({min: 6}).isLowercase({min:1}).isUppercase({min:1}).isNumeric({min: 1}).withMessage('La contraseña debe ser mayor a 6 caracteres'),
        body('confirmPassword').notEmpty().withMessage('Debe confirmar la contraseña').bail()
        .isLength({min: 6}).isLowercase({min:1}).isUppercase({min:1}).isNumeric({min: 1}).withMessage('La contraseña debe ser mayor a 6 caracteres, incluir una letra mayúscula, una minúscula, y al menos un número'),
    ],
    validacionLoginUsers: [
        body('user').notEmpty().withMessage('Debe completar este campo').bail(),
        body('password').notEmpty().withMessage('Debe completar este campo').bail()
    ],
    validacionChangePass: [
        body('passwordActual').notEmpty().withMessage('Completa este campo'),
        body('password').notEmpty().withMessage('Completa este campo').bail()
        .isLength({min: 8}).withMessage('La contraseña debe ser mayor a 6 caracteres'),
        body('confirmPassword').notEmpty().withMessage('Completa este campo').bail()
        .isLength({min: 8}).withMessage('La contraseña debe ser mayor a 6 caracteres')
    ],
    validacionProduct:[
        body('nameProduct').notEmpty().withMessage('Debes completar el nombre del producto').bail()
        .isLength({min: 5}).withMessage ('El nombre del producto debe tener más de 5 caracteres'),
        body('descriptionProduct').notEmpty().withMessage ('Debes completar este campo'). bail()
        .isLength({min:20}).withMessage('La descripción debe tener más de 20 caracteres'),
        body("priceProduct").notEmpty().withMessage("Debe ingresar un precio").bail(),
        body("discount").notEmpty().withMessage("Debe ingresar un descuento")
    ],
    validacionModifyProduct: [
        
    ]

}

module.exports = validatorMiddelware;