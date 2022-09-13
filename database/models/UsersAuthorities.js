module.exports = (sequelize, dataTypes) =>{
    let alias = 'UserAuthority';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        id_authority: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Authority',
                key: 'id'
            }
        },
    };
    let config = {
        tableName: 'users_authorities',
        timestamps: false
    };

    const UserAuthority = sequelize.define(alias, cols, config);

    UserAuthority.associate = function(models) {
        UserAuthority.belongsTo(models.Users, {
            foreignKey: 'id_user',
            as: 'users'
        });
        UserAuthority.belongsTo(models.Authorities, {
            foreignKey: 'id_authority',
            as: 'authorities'
        });
    }
    return UserAuthority;
}