const db = require('../../database/models');
const { product } = require('../productController');

let productsApiController = {
    list: async (req,res) => {
        let products=  await db.Products.findAll({
            include: ['categories','images_products', 'brands'],
            order: [ ["id", "ASC"] ]      
        })   

        let categoryCount = await db.Products.count({ include: ['categories'], attributes: [ 'id_category', 'categories.name'], group: 'id_category', order: ['id_category'] });

        let brandsCount = await db.Products.count({ include: ['brands'], attributes: [ 'id_brand', 'brands.name'], group: 'id_brand', order: ['id_brand'] })

            products.forEach((element) => {
                element.dataValues.detail = `http://localhost:3000/api/products/${element.id}`;
              });
        
            return res.json ({
            code:200,
            msg: "success",
            count: products.length,
            countByCategory: categoryCount, 
            countByBrand: brandsCount, 
            data: products

            })
        },
    detail: (req, res) => {
        let idParam = req.params.id;
        db.Products.findByPk (idParam, { include: ['categories','images_products', 'brands']})
        .then(product => { 
                product.dataValues.url_image = `http://localhost:3000/images/productos/${product.categories.name}/${product.images_products.name}`;

            return res.json ({
            code:200,
            msg: "success",
            data: product
        });
        })
    }

    }


module.exports = productsApiController;