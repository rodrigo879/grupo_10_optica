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
    },
    profile: (req, res) => {
        let usersId = req.params.id
        let users = usersModel.readFile('users.json');
        let usersFind = users.find(element => element.id == usersId);
        res.render('./users/profile', {users: usersFind});
    },
    editProfile: (req, res) => {
        let usersId = req.params.id;
        let users = usersModel.readFile('users.json');
        let userBody = req.body
        for(let i = 0; i < users.length; i++) {
            if(users[i].id == usersId){
                users[i].fullName = userBody.fullName;
                users[i].email = userBody.email;
                users[i].user = userBody.user;
                users[i].imageUser = req.file.filename;
                break;
            }
        }
        
        usersModel.writeFile(users)
        res.redirect(`/users/profile/${usersId}`);
    }
}

module.exports = userController;