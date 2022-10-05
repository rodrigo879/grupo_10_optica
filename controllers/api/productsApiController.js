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
        
        let showProducts = [];
            for (let i= 0; i< products.length; i++) {
                // let idProduct = products[i].id
                // let nameProduct = products[i].name
                showProducts.push ({ productName: products[i].name, productId: products[i].id, description: products[i].description,price: products[i].price, discount: products[i].discount,id_category: products[i].id_category, id_brand: products[i].id_brand, id_image_product: products[i].id_image_product, categories: products[i].categories,  images_Products: products[i].images_Products, brands: products[i].brands,   detail: `http://localhost:3000/products/${products[i].id}`  })     

            };
        
            return res.json ({
            code:200,
            msg: "success",
            count: products.length,
            countByCategory: categoryCount, 
            countByBrand: brandsCount, 
            data: showProducts

            })
        },
    detail: (req, res) => {
        let idParam = req.params.id;
        db.Products.findByPk (idParam, { include: ['categories','images_products', 'brands']})
        .then(product => { 
            let showProductDetail = []
            showProductDetail.push ({name: product.name, id: product.id, description: product.description, price: product.price,  discount: product.discount, id_category: product.id_category, id_brand: product.id_brand, categories: product.categories,id_image_product: product.id_image_product, image_product: product.images_products, url_image: `http://localhost:3000/images/productos/${product.categories.name}/${product.images_products.name}`, brands: product.brands});

            return res.json ({
            code:200,
            msg: "success",
            data: showProductDetail
        });
        })
    }

    }


module.exports = productsApiController;