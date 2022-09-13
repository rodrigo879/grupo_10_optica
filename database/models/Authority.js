module.exports = (sequelize, dataTypes) =>{
    let alias = 'Authorities';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: { 
            type: dataTypes.STRING(200) 
        }
    };
    let config = {
        tableName: 'authorities',
        timestamps: false
    };

    const Authority = sequelize.define(alias, cols, config);

    Authority.associate = function(models) {
        Authority.belongsToMany(models.Users, {
            as: "users",
            through: "users_authorities",
            foreignKey: "id_authority",
            otherKey: "id_user",
            timestamps: false
        })
    }

    return Authority;
}