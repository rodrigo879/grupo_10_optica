const db = require('../../database/models');

const usersApiController = {
    detail: async (req, res) => {
        let user = await db.Users.findByPk(req.params.id);
        let respuesta = {
            meta: {
                status: 200,
                url: "/api/users/" + user.id
            },
            data: {
                id: user.id,
                fullname: user.fullname,
                user: user.user,
                email: user.email
            }
        }
        res.json(respuesta);
    }
}

module.exports = usersApiController;