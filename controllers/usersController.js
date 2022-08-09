const { request } = require('express');
const bcryptjs= require('bcryptjs');
const { validationResult } = require('express-validator');
const usersJson = require('../database/jsonTable');
const usersModel = usersJson('users');


const userController = {
    login: (req, res) => {
        let userLogged = req.session.user
        res.render('./users/login', {userLogged});
    },
    logged: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            // let userBody = req.body.user;
            // let users = usersModel.readFile()
            // let userFilter = users.filter(person => person.user == userBody)
            // if(userFilter.length > 0){  
            //     let userPassword = req.body.password;
            //     if(userFilter[0].password == userPassword){
                let users= usersModel.readFile();
                let userFind = users.find(element => element.user == req.body.user)
                delete userFind.password;
                delete userFind.confirmPassword;   
                req.session.user = userFind;
                userLogged = req.session.user;
                res.redirect('/' )
            //     } else {
            //         res.render('./users/login', {errors: errors.mapped (), oldData: req.body })
            //     }
            // } else {
            //     res.render('./users/login', {errors: errors.mapped (),oldData: req.body})
            // }
        } else {
            res.render('./users/login', {errors: errors.mapped (),oldData: req.body})
        }
            

                //     } else {
                //         res.render('.users/login', {errors: [{msg: 'Credenciales Invalidadas'}]})
                //     }
                // } else {
                //     res.render('./users/login', {errors: [{msg: 'Credenciales Invalidadas'}]})
                // }
                // } else {
                // res.render('./users/login', {errors: [{msg: 'Credenciales Invalidadas'}]})
                // }


    },
    register: (req, res) => {
        let userLogged = req.session.user
        res.render('./users/register', {userLogged} );
    },
    create: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            let user = req.body;
            user.password = bcryptjs.hashSync(req.body.password, 10);
            user.confirmPassword = bcryptjs.hashSync(req.body.confirmPassword, 10)
            user.imageUser = req.file.filename;
            user.admin = false;
            let users= usersModel.readFile();
            usersModel.create(user);
            let userFind = users.find(element => element.user == req.body.user)
            delete userFind.password;
            delete userFind.confirmPassword;   
            req.session.user = userFind;
            userLogged = req.session.user;
            res.redirect('/')
        } else {
            res.render('./users/register', {errors: errors.mapped(), oldData: req.body});
        }
    },
    profile: (req, res) => {
        let userId = req.params.id
        let users = usersModel.readFile();
        let userFind = users.find(element => element.id == userId);
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

        // for(let i = 0; i < users.length; i++) {
        //     if(users[i].id == usersId){
        //         users[i].fullName = userBody.fullName;
        //         users[i].email = userBody.email;
        //         users[i].user = userBody.user;
        //         if(req.file) {
        //             users[i].imageUser = req.file.filename;
        //         }
        //         break;
        //     }
        // }
        
        // usersModel.writeFile(users);
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

    }
}

module.exports = userController;