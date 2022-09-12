module.exports = (sequelize, dataTypes) =>{
    let alias = 'ImageUsers';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{ 
            type: dataTypes.STRING(200)
        }
    };
    let config = {
        tableName: 'image_users',
        timestamps: false
    };

    const ImageUser = sequelize.define(alias, cols, config);

    ImageUser.associate = function(models) {
        ImageUser.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_imageUser"
        });
    }

    return ImageUser;
}