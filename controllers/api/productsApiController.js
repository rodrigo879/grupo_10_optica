const db = require('../../database/models');

let productsApiController = {
    list: async (req, res) => {
        try {
            let products = await db.Products.findAll({include: ['categories','images_products', 'brands']})   
            let countByCategory = await db.Products.count({
                include: ['categories'],
                attributes: ['categories.name'],
                group: 'id_category'
            })
            let countByBrand = await db.Products.count({
                include: ['brands'],
                attributes: ['brands.name'],
                group: 'id_brand'
            })
            products.forEach(element => {
                delete element.dataValues.id_category;
                delete element.dataValues.id_brand;
                delete element.dataValues.id_image_product;
                element.dataValues.images = `/images/productos/${element.categories.name}/${element.images_products.name}`;
                element.dataValues.detail = `/api/products/${element.id}`;
            });
            return res.json ({
                code: 200,
                msg: "success",
                count: products.length,
                countByCategory: countByCategory,
                countByBrand: countByBrand,
                data: products             
            });
        } catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    },
    detail: async (req, res) => {
        try {
            let idParam = req.params.id;
            let product = await db.Products.findByPk (idParam, { include: ['categories','images_products', 'brands']});
            delete product.dataValues.id_category;
            delete product.dataValues.id_brand;
            delete product.dataValues.id_image_product;
            product.dataValues.images = `/images/productos/${product.categories.name}/${product.images_products.name}`;
            return res.json ({
                code:200,
                msg: "success",
                data: product
            });    
        } catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    }
}

module.exports = productsApiController;