
const usersJson = require('../jsondatabase/jsonTable');
const usersModel = usersJson('users');


function  recordarUsuarioMiddleware (req, res, next) {
    if (req.cookies.recordarUsuario != undefined && req.session.user == undefined) {
            let users= usersModel.readFile();
            let userFind = users.find(element => element.user == req.cookies.recordarUsuario)
            req.session.user = userFind;
            userLogged = req.session.user;

        }
        next ();
    }

module.exports =  recordarUsuarioMiddleware;