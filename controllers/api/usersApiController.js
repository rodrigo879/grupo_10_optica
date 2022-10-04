const db = require('../../database/models');

module.exports = usersApiController = { 
    'list': (req, res) => {
        db.Users.findAll()
            .then(users => {
                return res.json({
                    status: 200,
                    msg: 'success',
                    count: users.length,
                    data: users 
                });
            });

    },
    'detail': (req, res) => {
        db.Users.findByPk(req.params.id)
            .then(user => {
                return res.json({
                    data: user, 
                    status: 200,
                    msg: 'success',
                });
            })
    }
};