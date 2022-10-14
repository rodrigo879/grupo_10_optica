const db = require('../database/models');
async function recordarUsuarioMiddleware(req, res, next) {
    if (req.cookies.recordarUsuario != undefined && req.session.user == undefined) {
        let userFind = await db.Users.findByPk(req.cookies.recordarUsuario.id, { include: ['image_users','authorities'] });
        req.session.user = userFind;
        userLogged = req.session.user;
    }
    next ();
}

module.exports =  recordarUsuarioMiddleware;