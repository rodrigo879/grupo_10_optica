const db = require("../../database/models");

module.exports = usersApiController = {
  list: (req, res) => {
    db.Users.findAll({ include: ["image_users"] }).then((users) => {
      users.forEach((element) => {
        delete element.dataValues.password;
        delete element.dataValues.id_imageUser;
        element.dataValues.image = `/images/users/${element.image_users.name}`;
        element.dataValues.detail = `/api/users/${element.id}`;
      });
      return res.json({
        status: 200,
        msg: "success",
        count: users.length,
        data: users,
      });
    });
  },
  detail: (req, res) => {
    db.Users.findByPk(req.params.id, { include: ["image_users"] }).then(
      (user) => {
        delete user.dataValues.password;
        user.dataValues.image = `/images/users/${user.image_users.name}`;
        return res.json({
          data: user,
          status: 200,
          msg: "success",
        });
      }
    );
  },
};
