const db = require("../../database/models");

let usersApiController = { 
    list: async (req, res) => {
        try { 
            let users = await db.Users.findAll({include: ['image_users']});
            users.forEach(element => {
                delete element.dataValues.password;
                delete element.dataValues.id_imageUser;
                element.dataValues.image = `/images/users/${element.image_users.name}`;
                element.dataValues.detail = `/api/users/${element.id}`
            });
            return res.json({
                status: 200,
                msg: 'success',
                count: users.length,
                data: users
            });        
        } catch (error) {
            res.json({
                code: 500,
                msg: "No pudo conectar"
            });        
        }
    },
    detail: async (req, res) => {
        try {
            let user = await db.Users.findByPk(req.params.id, {include: ['image_users']});
            delete user.dataValues.password;
            delete user.dataValues.id_imageUser;
            user.dataValues.image = `/images/users/${user.image_users.name}`;
            return res.json({
                status: 200,
                msg: 'success',
                data: user 
            });        
        } catch (error) {
            res.json({
                code: 500,
                msg: "No pudo conectar"
            });  
        }
    }
};

module.exports = usersApiController;
