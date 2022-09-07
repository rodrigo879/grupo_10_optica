module.exports = (sequelize, dataTypes) =>{
    let alias = 'Category';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING(200),
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
		Category.hasMany(models.Product, {
			as: "products",
			foreignKey: "id_category"
		});
	}   
    return Category;
}