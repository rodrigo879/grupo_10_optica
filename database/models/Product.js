module.exports = (sequelize, dataTypes) =>{
    let alias = 'Products';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(200)
        },
        description:  { 
            type: dataTypes.STRING(200)
        },
        price:{ 
            type: dataTypes.DOUBLE
        },
        discount: { 
            type: dataTypes.DOUBLE
        },
        id_category: {
            type: dataTypes.INTEGER
        },
        id_brand: {
            type:dataTypes.INTEGER 
        },
        id_image_product: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.ImagesProducts, {
			as: "images_products",
			foreignKey: "id_image_product"
		});
        Product.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "id_category",
        });
        Product.belongsTo(models.Brands, {
            as: "brands",
            foreignKey: "id_brand",
        });   
    }
    return Product;
}