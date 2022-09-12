module.exports = (sequelize, dataTypes) =>{
    let alias = 'Brands';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { 
            type: dataTypes.STRING(200)
        }
    };
    let config = {
        tableName: 'brands',
        timestamps: false
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models) {
		Brand.hasMany(models.Products, {
			as: "products",
			foreignKey: "id_brand"
		});
	}
    return Brand;
}