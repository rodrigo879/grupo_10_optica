const { body } = require('express-validator')
const usersJson = require('../jsondatabase/jsonTable');
const bcryptjs= require('bcryptjs');
const usersModel = usersJson('users');

let validatorMiddelware = {
    validacionCreateUsers: [
        body('fullName').notEmpty().withMessage('Debe ingresar su nombre'),
        body('user').notEmpty().withMessage('Debe ingresar un nombre de usuario'),
        body('email').notEmpty().withMessage('Debe ingresar un email valido'),
        body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser mayor a 6 caracteres'),
        body('confirmPassword').notEmpty().withMessage('Debe confirmar la contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser mayor a 6 caracteres')
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
        .isLength({min: 6}).withMessage('La contraseña debe ser mayor a 6 caracteres'),
        body('confirmPassword').notEmpty().withMessage('Completa este campo').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser mayor a 6 caracteres')
    ]
}

module.exports = validatorMiddelware;