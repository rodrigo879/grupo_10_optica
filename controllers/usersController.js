const { request } = require('express');
const usersJson = require('../database/jsonTable');
const usersModel = usersJson('users')

const userController = {
    login: (req, res) => {
        let userLogged = req.session.user
        res.render('./users/login', {userLogged});
    },
    logged: (req, res) => {
        let userBody = req.body.user;
        let users = usersModel.readFile()
        let userFilter = users.filter(person => person.user == userBody)
        if(userFilter.length > 0){  
            let userPassword = req.body.password;
            if(userFilter[0].password == userPassword){
                 req.session.user = userFilter[0];
                res.redirect('/')
            } else {
                res.send('Datos incorrectos')
            }
        } else {
            res.send('Datos incorrectos') 

        }
    },
    register: (req, res) => {
        let userLogged = req.session.user
        res.render('./users/register', {userLogged} );
    },
    create: (req, res) => {
        let users = req.body;
        users.imageUser = req.file.filename;
        users.admin = false;
        usersModel.create(users);
        res.redirect('/')
    },
    profile: (req, res) => {
        let userId = req.params.id
        let users = usersModel.readFile();
        let userFind = users.find(element => element.id == userId);
        let userLogged = req.session.user
        res.render('./users/profile', {users: userFind, userLogged});
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