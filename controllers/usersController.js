const usersJson = require('../database/jsonTable');
const usersModel = usersJson('users')

const userController = {
    login: (req, res) => {
        res.render('./users/login');
    },
    logged: (req, res) => {
        let userBody = req.body.user;
        let users = usersModel.readFile('users.json')
        let userFilter = users.filter(person => person.user == userBody)
        if(userFilter.length > 0){  
            let userPassword = req.body.password;
            if(userFilter.password == userPassword){
                res.redirect('/')
            } else {
                res.send('Datos incorrectos')
            }
        } else {
            res.send('Datos incorrectos') 

        }
    },
    register: (req, res) => {
        res.render('./users/register');
    },
    create: (req, res) => {
        let users = req.body;
        users.imageUser = req.file.filename;
        users.admin = false;
        let userId = usersModel.create(users);
        

        res.redirect('/')
    }

}

module.exports = userController;