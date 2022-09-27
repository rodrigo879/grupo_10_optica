const { body } = require('express-validator')
const usersJson = require('../jsondatabase/jsonTable');
const bcryptjs= require('bcryptjs');
const usersModel = usersJson('users');

let validatorMiddelware = {
    validacionCreateUsers: [
        body('fullName').notEmpty().isLength({min: 2}).withMessage('Debe ingresar su nombre'),
        body('user').notEmpty().withMessage('Debe ingresar un nombre de usuario'),
        body('email').isEmail().notEmpty().withMessage('Debe ingresar un email valido'),
        body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({min: 8}).isLowercase({min:1}).isUppercase({min:1}).isNumeric({min: 1}).withMessage('La contraseña debe ser mayor a 6 caracteres'),
        body('confirmPassword').notEmpty().withMessage('Debe confirmar la contraseña').bail()
        .isLength({min: 8}).isLowercase({min:1}).isUppercase({min:1}).isNumeric({min: 1}).withMessage('La contraseña debe ser mayor a 6 caracteres'),
        // body('imageUser') falta validar
    ],
    validacionLoginUsers: [
        body('user').notEmpty().withMessage('Debe completar este campo').bail(),
        // .custom((value, {req}) => {
        //     let user= value;
        //     let users = usersModel.readFile();
        //     let userFilter = users.filter(person => person.user == user)
        //     if(userFilter.length == 0){ 
        //         throw new Error ('El nombre de usuario que has introducido no pertenece a ninguna cuenta')
        //         }
        //         return true;
        //}).bail(),

        body('password').notEmpty().withMessage('Debe completar este campo').bail()       
        //.isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres').bail()
        //     .custom((value, {req}) => {
        //     let password= value;
        //     let users = usersModel.readFile();
        //     let userFilter = users.filter(person => bcryptjs.compareSync (password, person.password) == true)
        //     if(userFilter.length == 0){  
        //         throw new Error ('La contraseña es incorrecta')
        //         }
        //         return true;
        // })
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