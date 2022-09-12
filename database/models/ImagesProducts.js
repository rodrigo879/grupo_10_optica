module.exports = (sequelize, dataTypes) =>{
    let alias = 'ImageProduct';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING(200),
    };
    let config = {
        tableName: 'images_products',
        timestamps: false
    };

    const ImageProduct = sequelize.define(alias, cols, config);

    ImageProduct.associate = function(models) {
		ImageProduct.hasMany(models.Product, {
			as: "products",
			foreignKey: "id_image_product"
		})
	}
    return ImageProduct;
}