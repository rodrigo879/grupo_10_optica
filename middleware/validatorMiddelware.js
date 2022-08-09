const { body } = require('express-validator')
const usersJson = require('../database/jsonTable');
const usersModel = usersJson('users');


let validatorMiddelware = {
    validacionCreateUsers: [
        body('name').notEmpty().withMessage('Debe completar el campo Name'),
        body('userName').notEmpty().withMessage('Debe completar el campo User Name'),
        body('password').isLength({min: 8}).withMessage('La contraseña debe ser mayor a 8 caracteres'),
        body('passwordConfirm').isLength({min: 8}).withMessage('La confirmacion de contraseña debe ser mayor a 8 caracteres'),
        body('image')
    ],
    validacionLoginUsers: [
        body('userName')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .custom((value, {req}) => {
            let userName= value;
            let users = usersModel.readFile();
            let userFilter = users.filter(person => person.user == userName)
            if(userFilter.length == 0){  
                throw new Error ('El nombre de usuario que has introducido no pertenece a ninguna cuenta')
                }
                return true;
        }).bail(),

        body('password')
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres').bail()
        .custom((value, {req}) => {
            let password= value;
            let users = usersModel.readFile();
            let userFilter = users.filter(person => person.password == password)
            if(userFilter.length == 0){  
                throw new Error ('La contraseña es incorrecta')
                }
                return true;
        })


    ]
}

module.exports = validatorMiddelware;