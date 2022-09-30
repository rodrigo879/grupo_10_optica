const { body } = require('express-validator')
const usersJson = require('../jsondatabase/jsonTable');
const bcryptjs= require('bcryptjs');
const usersModel = usersJson('users');

let validatorMiddelware = {
    validacionCreateUsers: [
        body('fullName').notEmpty().withMessage('Debe ingresar su nombre').bail().isLength({min: 3}).withMessage('Debe contener minimo 3 caracteres'),
        body('user').notEmpty().withMessage('Debe ingresar un nombre de usuario').bail().isLength({min: 3}).withMessage('Debe contener minimo 3 caracteres'),
        body('email').notEmpty().withMessage('Debe ingresar un email valido').bail().isEmail({ignore_max_length: true}).withMessage('Debe ser de formato em@il'),
        body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isStrongPassword({minLength:6, minLowercase:1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
        .withMessage('La contraseña debe ser mayor a 6 caracteres, incluir una letra mayúscula, una minúscula, un caracter especial y al menos un número'),
        body('confirmPassword').notEmpty().withMessage('Debe confirmar la contraseña').bail()
        .isStrongPassword({minLength:6, minLowercase:1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
        .withMessage('La contraseña debe ser mayor a 6 caracteres, incluir una letra mayúscula, una minúscula, un caracter especial y al menos un número'),
    ],
    validacionLoginUsers: [
        body('user').notEmpty().withMessage('Debe completar este campo').bail(),
        body('password').notEmpty().withMessage('Debe completar este campo').bail()
    ],
    validacionChangePass: [
        body('passwordActual').notEmpty().withMessage('Completa este campo'),
        body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isStrongPassword({minLength:6, minLowercase:1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
        .withMessage('La contraseña debe ser mayor a 6 caracteres, incluir una letra mayúscula, una minúscula, un caracter especial y al menos un número'),
        body('confirmPassword').notEmpty().withMessage('Debe confirmar la contraseña').bail()
        .isStrongPassword({minLength:6, minLowercase:1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
        .withMessage('La contraseña debe ser mayor a 6 caracteres, incluir una letra mayúscula, una minúscula, un caracter especial y al menos un número'),
    ],
    validacionProduct:[
        body('nameProduct').notEmpty().withMessage('Debes completar el nombre del producto').bail()
        .isLength({min: 5, max:40}).withMessage ('El nombre del producto debe tener de 5 a 40 caracteres'),
        body('descriptionProduct').notEmpty().withMessage ('Debes completar la descripcion del producto'). bail()
        .isLength({min:10, max:200}).withMessage('La descripción debe tener de 20 a 200 caracteres'),
        body('priceProduct').notEmpty().withMessage('Debe ingresar un precio').bail().isDecimal().withMessage('El precio debe contener 2 decimales'),
        body('discount').notEmpty().withMessage('Debe completar el campo descuento').isLength({min:1, max:2}).withMessage('El descuento puede ser 1 o 2 digitos'),
        body('image').custom((value, { req }) => {
            let file = req.file;
            let extension = ['.jpeg', '.jpg','.png'];
            if (!file){
                throw new Error('Falta cargar una imagen');
            } else {
                let fileExtension = path.extname(file.originalname);
                if(!extension.includes(fileExtension)) {
                    throw new Error('Debe ingresar una imagen de formato valida (JPEG, JPG, PNG)');
                }
            }
            return true;
        })
    ]
}

module.exports = validatorMiddelware;