module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: { 
            type: dataTypes.STRING(200)
        },
        user: { 
            type: dataTypes.STRING(200)
        },
        email: {
            type: dataTypes.STRING(200) 
        },
        password:{ 
            type: dataTypes.STRING(200)
        },
        id_imageUser:{ 
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsToMany(models.Authorities, {
            as: "authorities",
            through: models.UserAuthority,
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