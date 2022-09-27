
const usersJson = require('../jsondatabase/jsonTable');
const usersModel = usersJson('users');
const db = require('../database/models');
const { Op } = require('Sequelize');

async function  recordarUsuarioMiddleware (req, res, next) {
    if (req.cookies.recordarUsuario != undefined && req.session.user == undefined) {
            let users= usersModel.readFile();
            let userFind = users.find(element => element.user == req.cookies.recordarUsuario)
            // let userFind = await db.Users.findOne(
            //     {
            //         include: ['image_users','authorities'],
            //         where: { user: req.cookies.recordarUsuario }          
            //     }
            // )
            req.session.user = userFind;
            userLogged = req.session.user;

        }
        next ();
    }

module.exports =  recordarUsuarioMiddleware;