const bcryptjs= require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require('Sequelize');

let crearError = (msg, param) => { 
    let error = {
        msg: msg,
        param: param
    }
    return error;
}

const userController = {
    login: (req, res) => {
        let userLogged = req.session.user;
        res.render('./users/login', {userLogged});
    },
    logged: async (req, res) => {
        let userLogged = req.session.user;
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            // Consulta a la base de datos        
            let userLog = await db.Users.findOne( 
                { 
                    include: ['image_users','authorities'],
                    where: { user: req.body.user } 
                });
            if(userLog != null) {
                // Comparamos la contraseña ingresada por el usuario y la guardada en la base de datos.
                if(bcryptjs.compareSync(req.body.password, userLog.password)) {
                    // Quitamos las contraseñas para mayor seguridad.
                    userLog.password = "";
                    req.session.user = userLog;
                    userLogged = req.session.user;
                    //Cookie "Recordar Usuario"
                    if (req.body.recordarUsuario != undefined) {
                        res.cookie ('recordarUsuario', userLogged, {maxAge: 1000*604800 })
                    }
                    return res.redirect('/')
                } else {
                    // Si la contraseña es incorrecta generamos el error.
                    errors.errors.push(crearError('Usuario o contraseña incorrectos', 'credInv'));
                    res.render('./users/login', {errors: errors.mapped (), oldData: req.body, userLogged})
                }
            } else {
                // Si el usuario no se encuentra en la base de datos se genera el error         
                errors.errors.push(crearError('Usuario o contraseña incorrectos', 'credInv'));
                res.render('./users/login', {errors: errors.mapped (), oldData: req.body, userLogged})
            }    
        } else {
            res.render('./users/login', {errors: errors.mapped (), oldData: req.body, userLogged})
        }
    },
    register: (req, res) => {
        let userLogged = req.session.user;
        res.render('./users/register', {userLogged} );
    },
    create: async (req, res) => {
        let userLogged = req.session.user;
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            // Buscamos si existe un registro en la BD con el email ingresado.
            let promFindEmail = await db.Users.findOne( { where: { email: req.body.email } } )
            // Buscamos si existe un registro en la BD con el nombre de usuario ingresado.
            let promFindUser = await db.Users.findOne( { where: { user: req.body.user } } )

            if(promFindEmail){ // El email ya se encuentra en la BD, generamos el error.
                errors.errors.push(crearError('Existe un usuario con este email', 'credInvEmail'));
                return res.render('./users/register', {errors: errors.mapped (), oldData: req.body, userLogged})
            } else if (promFindUser) { // El Nombre de usuario ya se encuentra en la BD, generamos el error.
                errors.errors.push(crearError('Nombre de usuario no disponible', 'credInvUser'));
                return res.render('./users/register', {errors: errors.mapped (), oldData: req.body, userLogged})
            } else { // Tanto el email como el nombre de usuario estan disponibles.
                if(req.body.password === req.body.confirmPassword) { // Comprobamos si las contraseñas ingresadas son iguales.
                    if(req.file) { // Si el usuario carga la imagen creamos ambos registros en la BD.
                        let newImage = await db.ImageUsers.create({ name: req.file.filename });
                        let newUser = await db.Users.create({
                                fullName: req.body.fullName,
                                user: req.body.user,
                                email: req.body.email,
                                password: bcryptjs.hashSync(req.body.password, 10),
                                id_imageUser: newImage.id
                        });
                        let newAuthority = await db.UserAuthority.create({
                                    id_user: newUser.id,
                                    id_authority: 3
                        });
                        return res.redirect('/users/login');
                    } else { // Si el usuario no carga la imagen, se asigna la imagen por default.
                        let newUser = await db.Users.create({
                            fullName: req.body.fullName,
                            user: req.body.user,
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10)
                        });
                        let newAuthority = await db.UserAuthority.create({
                            id_user: newUser.id,
                            id_authority: 3
                        });
                        return res.redirect('/users/login');
                    }
                }
                // En caso que las contraseñas no coincidan generamos el error que se muestra en el formulario.
                errors.errors.push(crearError('Las contraseñas no coinciden', 'credInvPass'));
                return res.render('./users/register', {errors: errors.mapped (), oldData: req.body, userLogged})
            }    
        } else {
            res.render('./users/register', {errors: errors.mapped(), oldData: req.body, userLogged});
        }
    },
    profile: async (req, res) => {
        let userLogged = req.session.user;
        let userProfile = await db.Users.findByPk(req.params.id, { include: 'image_users' })
        return res.render('./users/profile', {user: userProfile, userLogged});
    },
    editProfile: async (req, res) => {
        let userId = req.params.id;
        if(req.file) {
            let newImage = await db.ImageUsers.create( { name: req.file.filename } );
            db.Users.update(
                {
                    fullName: req.body.fullName,
                    user: req.body.user,
                    email: req.body.email,
                    id_imageUser: newImage.id
                },
                { where: { id: userId } }
            );
            return res.redirect(`/users/profile/${userId}`)
        } else {
            db.Users.update(
                {
                    fullName: req.body.fullName,
                    user: req.body.user,
                    email: req.body.email,
                },
                { where: { id: userId } }
            )
            return res.redirect(`/users/profile/${userId}`)
        }
    },
    delete: (req, res) => {
        let userId = req.params.id;
        db.Users.destroy({ where: { id: userId}})
        if(userId == userLogged.id) {
            res.clearCookie('recordarUsuario');
            req.session.destroy();
        }
        res.redirect('/');   
    },
    password: (req, res) => {
        let userLogged = req.session.user;
        let userId = req.params.id;
        res.render('./users/passwordEdit', {userId, userLogged});
    },
    passwordEdit: async (req, res) => {
        let userLogged = req.session.user;
        let userId = req.params.id;
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            let userInfo = await db.Users.findByPk(userId);
            if(bcryptjs.compareSync(req.body.passwordActual, userInfo.password)) {
                if(req.body.password === req.body.confirmPassword) {
                    db.Users.update(
                        { password: bcryptjs.hashSync(req.body.password, 10)},
                        { where: { id: req.params.id }}
                    );
                    res.redirect(`/users/profile/${userId}`)
                }
                // Las nuevas contraseñas no coinciden, generamos el error y se lo mostramos al usuario.
                errors.errors.push(crearError('Las contraseñas no coinciden', 'credInvPass'));
                return res.render('./users/passwordEdit', {errors: errors.mapped (), userId, userLogged});
            }
            // La contraseña actual no coincide con la almacenada en la BD.
            errors.errors.push(crearError('Contraseña Incorrecta', 'credInvPassA'));
            return res.render('./users/passwordEdit', {errors: errors.mapped (), userId, userLogged});
        } else {
            return res.render('./users/passwordEdit', {errors: errors.mapped (), userId, userLogged});
        }
    },
    userList: async (req, res) => {
        let userLogged = req.session.user;
        let usersAll = await db.Users.findAll({ include: ['image_users','authorities'] })
        res.render('./users/userList', {users: usersAll, userLogged})
    },
    logout: (req, res) => {
        res.clearCookie('recordarUsuario');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = userController;