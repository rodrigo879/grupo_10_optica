const { body } = require('express-validator')
const usersJson = require('../jsondatabase/jsonTable');
const bcryptjs= require('bcryptjs');
const usersModel = usersJson('users');

let validatorMiddelware = {
    validacionCreateUsers: [
        body('fullName').notEmpty().withMessage('Debe completar el campo nombre'),
        body('user').notEmpty().withMessage('Debe completar el campo User'),
        body('password').isLength({min: 6}).withMessage('La contraseña debe ser mayor a 6 caracteres'),
        body('confirmPassword').isLength({min: 6}).withMessage('La confirmacion de contraseña debe ser mayor a 6 caracteres'),
        body('image')
    ],
    validacionLoginUsers: [
        body('user')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .custom((value, {req}) => {
            let user= value;
            let users = usersModel.readFile();
            let userFilter = users.filter(person => person.user == user)
            if(userFilter.length == 0){ 
                throw new Error ('El nombre de usuario que has introducido no pertenece a ninguna cuenta')
                }
                return true;
        }).bail(),

        body('password')
        //.isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres').bail()
            .custom((value, {req}) => {
            let password= value;
            let users = usersModel.readFile();
            let userFilter = users.filter(person => bcryptjs.compareSync (password, person.password) == true)
            if(userFilter.length == 0){  
                throw new Error ('La contraseña es incorrecta')
                }
                return true;
        })


    ]
}

module.exports = validatorMiddelware;