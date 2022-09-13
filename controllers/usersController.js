const bcryptjs= require('bcryptjs');
const { validationResult } = require('express-validator');
const usersJson = require('../jsondatabase/jsonTable');
const usersModel = usersJson('users');
const db = require('../database/models');
const { Op } = require('Sequelize');

const userController = {
    login: (req, res) => {
        let userLogged;
        res.render('./users/login', {userLogged});
    },
    logged: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            // let users = usersModel.readFile();
            let userName = req.body.user;
            db.User.findOne( { include: ['image_users','authorities'], where: { user: userName } } )
            .then((user) => {
                // Comparamos la contraseña ingresada por el usuario y la guardada en la base de datos.
                if(bcryptjs.compareSync(req.body.password, user.password)) {
                    // Quitamos las contraseñas para mayor seguridad.
                    delete user.password;
                    req.session.user = user;
                    userLogged = req.session.user;
                    console.log("Rol de Autoridad de usuario: ", userLogged.authorities[0].role)

                    //Cookie "Recordar Usuario"
                    if (req.body.recordarUsuario != undefined) {
                        res.cookie ('recordarUsuario', user.user, {maxAge: 1000*604800 })
                    }
                    return res.redirect('/')
                } else {
                    // Si la contraseña es incorrecta generamos el error.
                    let userLogged = req.session.user
                    let error = { 
                        msg: 'Usuario o contraseña incorrecto',
                        param: 'credInv'
                    }
                    errors.errors.push(error);
                    res.render('./users/login', {errors: errors.mapped (), oldData: req.body, userLogged})
                }
            })
            .catch(() => {     
                // Si el usuario no se encuentra en la base de datos se genera el error         
                let userLogged = req.session.user
                let error = { 
                    msg: 'Usuario o contraseña incorrecto',
                    param: 'credInv'
                }
                errors.errors.push(error);
                res.render('./users/login', {errors: errors.mapped (), oldData: req.body, userLogged})
            });       
        } else {
            let userLogged;
            res.render('./users/login', {errors: errors.mapped (), oldData: req.body, userLogged})
        }
    },
    register: (req, res) => {
        let userLogged = req.session.user
        res.render('./users/register', {userLogged} );
    },
    create: async (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            // Buscamos si existe un registro en la BD con el email ingresado.
            let promFindEmail = await db.User.findOne( { where: { email: req.body.email } } )
            // Buscamos si existe un registro en la BD con el nombre de usuario ingresado.
            let promFindUser = await db.User.findOne( { where: { user: req.body.user } } )

            if(promFindEmail){ // El email ya se encuentra en la BD, generamos el error.
                let userLogged = req.session.user
                let error = { 
                    msg: 'Existe un usuario con este email',
                    param: 'credInvEmail'
                }
                errors.errors.push(error);
                return res.render('./users/register', {errors: errors.mapped (), oldData: req.body, userLogged})
            } else if (promFindUser) { // El Nombre de usuario ya se encuentra en la BD, generamos el error.
                let userLogged = req.session.user
                let error = { 
                    msg: 'Nombre de usuario no disponible',
                    param: 'credInvUser'
                }
                errors.errors.push(error);
                return res.render('./users/register', {errors: errors.mapped (), oldData: req.body, userLogged})
            } else { // Tanto el email como el nombre de usuario estan disponibles.
                // Comprobamos si las contraseñas ingresadas son iguales
                if(req.body.password === req.body.confirmPassword) {
                    // Si el usuario carga la imagen creamos ambos registros
                    if(req.file) {
                        db.ImageUsers.create({
                            name: req.file.filename
                        })
                        .then((image) => {
                            db.User.create({
                                fullName: req.body.fullName,
                                user: req.body.user,
                                email: req.body.email,
                                password: bcryptjs.hashSync(req.body.password, 10),
                                id_imageUser: image.id
                            })
                            return res.redirect('/users/login');
                        })
                        .catch((error) => res.json(error))
                    } else { // Si el usuario no carga la imagen, se asigna la imagen por default.
                        db.User.create({
                            fullName: req.body.fullName,
                            user: req.body.user,
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10)
                        })
                        return res.redirect('/users/login');
                    }
                }
                // En caso que las contraseñas no coincidan generamos el error que se muestra en el formulario.
                let userLogged = req.session.user
                let error = { 
                    msg: 'Las contraseñas no coinciden',
                    param: 'credInvPass'
                }
                errors.errors.push(error);
                return res.render('./users/register', {errors: errors.mapped (), oldData: req.body, userLogged})
            }    
        } else {
            let userLogged = req.session.user
            res.render('./users/register', {errors: errors.mapped(), oldData: req.body, userLogged});
        }
    },
    profile: (req, res) => {
        let userLogged = req.session.user
        let userId = req.params.id
        db.User.findByPk(userId, { include: 'image_users' })
        .then((user) => {
            return res.render('./users/profile', {user, userLogged});
        })
        .catch((error) => {
            return res.json(error)
        })
    },
    editProfile: async (req, res) => {
        let userId = req.params.id;
        // let users = usersModel.readFile();
        // let userFind = users.find(element => element.id == userId);
        // let userBody = req.body
        // userFind.fullName = userBody.fullName;
        // userFind.email = userBody.email;
        // userFind.user = userBody.user;
        if(req.file) {
            db.ImageUsers.create(
                { name: req.file.filename }
            )
            .then((image) => {
                db.User.update(
                    {
                        fullName: req.body.fullName,
                        user: req.body.user,
                        email: req.body.email,
                        id_imageUser: image.id
                    },
                    { where: { id: userId } }
                )
                return res.redirect(`/users/profile/${userId}`)
            })
            .catch((error) => {
                return res.json(error)
            })
        } else {
            db.User.update(
                {
                    fullName: req.body.fullName,
                    user: req.body.user,
                    email: req.body.email,
                },
                { where: { id: userId } }
            )
            .then(() => {
                return res.redirect(`/users/profile/${userId}`)
            })
            .catch((error) => {
                return res.json(error)
            })
        }
    },
    delete: (req, res) => {
        let userId = req.params.id;
        // let users = usersModel.readFile();      
        // let userFind = users.find(element => element.id == userId);
        // usersModel.delete(userFind.id);
        db.User.destroy({ where: { id: userId}})
        if(userId == userLogged.id) {
            res.clearCookie('recordarUsuario');
            req.session.destroy();
        }
        res.redirect('/');   
    },
    password: (req, res) => {
        let userId = req.params.id;
        let userLogged = req.session.user
        res.render('./users/passwordEdit', {userId, userLogged});
    },
    passwordEdit: (req, res) => {
        let userId = req.params.id;
        let passwordsInfo = req.body;
        let users = usersModel.readFile();
        let userFind = users.find(element => element.id == userId);
        if(passwordsInfo.passwordActual == userFind.password) {
            userFind.password = passwordsInfo.password;
            userFind.confirmPassword = passwordsInfo.confirmPassword;
        } else {
            res.send("La contraseña actual es incorrecta")
        }
        usersModel.update(userFind);
        res.redirect(`/users/profile/${userId}`)
    },
    userList: (req, res) => {
        // let users = usersModel.readFile();
        let userLogged = req.session.user;
        db.User.findAll({ include: ['image_users','authorities'] })
            .then(users => {
                res.render('./users/userList', {users, userLogged})
            });
    },
    logout: (req, res) => {
        res.clearCookie('recordarUsuario');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = userController;