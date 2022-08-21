const { request } = require('express');
const bcryptjs= require('bcryptjs');
const { validationResult } = require('express-validator');
const usersJson = require('../jsondatabase/jsonTable');
const usersModel = usersJson('users');


const userController = {
    login: (req, res) => {
        let userLogged = req.session.user;
        res.render('./users/login', {userLogged});
    },
    logged: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            let users = usersModel.readFile();
            let userFind = users.find(element => element.user == req.body.user)
            let userPassword = req.body.password;

            //Quitamos las contraseñas para mayor seguridad.
            delete userFind.password;
            delete userFind.confirmPassword;   
            req.session.user = userFind;
            userLogged = req.session.user;       
                     
            //Cookie "Recordar Usuario"
            if (req.body.recordarUsuario != undefined) {
                res.cookie ('recordarUsuario', userFind.user, {maxAge: 1000*604800 })
            }
            res.redirect('/')
        } else {
            let userLogged = req.session.user
            res.render('./users/login', {errors: errors.mapped (), oldData: req.body, userLogged})
        }
    },
    register: (req, res) => {
        let userLogged = req.session.user
        res.render('./users/register', {userLogged} );
    },
    create: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            let userNew = req.body;
            userNew.password = bcryptjs.hashSync(req.body.password, 10);
            userNew.confirmPassword = bcryptjs.hashSync(req.body.confirmPassword, 10)
            userNew.imageUserNew = req.file.filename;
            userNew.admin = false;
            console.log(userNew)
            let users= usersModel.readFile();
            usersModel.create(userNew);
            //Al crearse una cuenta dejar logueado a ese usuario
            delete userNew.password;
            delete userNew.confirmPassword;   
            req.session.user = userNew;
            userLogged = req.session.user;
            res.redirect('/')
        } else {
            res.render('./users/register', {errors: errors.mapped(), oldData: req.body});
        }
    },
    profile: (req, res) => {
        let userId = req.params.id
        let users = usersModel.readFile();
        //let userFind = users.find(element => element.id == userId);
        let userLogged = req.session.user
        res.render('./users/profile', {user: userLogged});
    },
    editProfile: (req, res) => {
        let userId = req.params.id;
        let users = usersModel.readFile();
        let userFind = users.find(element => element.id == userId);
        let userBody = req.body
        userFind.fullName = userBody.fullName;
        userFind.email = userBody.email;
        userFind.user = userBody.user;
        if(req.file) {
            userFind.imageUser = req.file.filename;
        }
        usersModel.update(userFind);
        res.redirect(`/users/profile/${userId}`);
    },
    delete: (req, res) => {
        let userId = req.params.id;
        let users = usersModel.readFile();      
        let userFind = users.find(element => element.id == userId);
        usersModel.delete(userFind.id);
        res.redirect('/users/register');   
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
        let users = usersModel.readFile();
        let userLogged = req.session.user
        res.render('./users/userList', {users, userLogged})
    },
    logout: (req, res) => {
        res.clearCookie('recordarUsuario');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = userController;