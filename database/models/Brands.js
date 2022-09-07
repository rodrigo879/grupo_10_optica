module.exports = (sequelize, dataTypes) =>{
    let alias = 'Brand';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING(200),
    };
    let config = {
        tableName: 'brands',
        timestamps: false
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models) {
		Brand.hasMany(models.Product, {
			as: "products",
			foreignKey: "id_brand"
		});
	}
    return Brand;
}