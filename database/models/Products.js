module.exports = (sequelize, dataTypes) =>{
    let alias = 'Product';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING(200),
        description: dataTypes.STRING(200),
        price: dataTypes.DOUBLE,
        discount: dataTypes.DOUBLE,
        id_category: dataTypes.INTEGER,
        id_brand: dataTypes.INTEGER,
        id_image_product: dataTypes.INTEGER
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.ImageProduct, {
			as: "images_products",
			foreignKey: "id_image_product"
		});
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "id_category",
        });
        Product.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "id_brand",
        });   
    }
    return Product;
}