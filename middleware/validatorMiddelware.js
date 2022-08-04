const { body } = require('express-validator')

let validatorMiddelware = {
    validacionCreateUsers: [
        body('name').notEmpty().withMessage('Debe completar el campo Name'),
        body('userName').notEmpty().withMessage('Debe completar el campo User Name'),
        body('password').isLength({min: 8}).withMessage('La contraseña debe ser mayor a 8 caracteres'),
        body('passwordConfirm').isLength({min: 8}).withMessage('La confirmacion de contraseña debe ser mayor a 8 caracteres'),
        body('image')
    ],
    validacionLoginUsers: [
        body('userName').notEmpty().withMessage('Debe completar este campo'),
        body('password').isLength({min: 8}).withMessage('La contraseña debe ser mayor a 8 caracteres')
    ]
}

module.exports = validatorMiddelware;