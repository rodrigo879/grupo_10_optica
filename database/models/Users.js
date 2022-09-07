module.exports = (sequelize, dataTypes) =>{
    let alias = 'User';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: dataTypes.STRING(200),
        user: dataTypes.STRING(200),
        email: dataTypes.STRING(200),
        password: dataTypes.STRING(200),
        id_imageUser: dataTypes.INTEGER
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsToMany(models.Authorities, {
            as: "authorities",
            through: "users_authorities",
            foreignKey: "id_user",
            otherKey: "id_authority",
            timestamps: false
        });
        User.belongsTo(models.ImageUsers, {
            as: "image_users",
            foreignKey: "id_imageUser"
        });
    }
    return User;
}