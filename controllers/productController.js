const jsonTable = require('../jsondatabase/jsonTable');
const db = require('../database/models');
const { BLOB } = require('sequelize');

const productsModel = jsonTable('products')

// Reemplaza el punto de los decimales por una coma en el precio de los productos..
const toComma = n => n.toString().replace(".", ",");

// Agrega el punto cada 3 caracteres en el precio de los productos..
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Funcion para generar resultados al azar para mostrar como productos opcionales en el detalle de producto..
function ramdonResult(productos) {
    let result = [];
    let i = 0;
    do {
        let ramdomI = Math.floor(Math.random() * 36)
        if(result.find(element => element == ramdomI) == undefined) {
            result.push(ramdomI)
            i = i + 1;
        }
    } while (i < 3);
    let productsRandom = [];
    for (let i = 0; i < result.length; i++) {
        productsRandom.push(productos[result[i]]);                    
    } 
    return productsRandom
}

let productController = {
    product: (req,res) => {
            let idParam = req.params.id
            let userLogged = req.session.user
            // let products = productsModel.readFile();
            db.Products.findAll({include: ['categories','images_products', 'brands']})
                .then((product) => {
                    // Almacenamos el indice al cual corresponde el id del producto igual al pasado por parametro en la URL.
                    let indice = product.findIndex((element) => {
                        return element.id == idParam;
                    })
                    // Creamos una variable con los datos que devuelve la promesa, ajustado a como habiamos hecho la vista inicialmente.
                    let products = {
                        id: product[indice].id,
                        nameProduct: product[indice].name,
                        descriptionProduct: product[indice].description,
                        categoryProduct: product[indice].categories.name,
                        trademarkProduct: product[indice].brands.name,
                        priceProduct: product[indice].price,
                        image: product[indice].images_products.name,
                        discount: product[indice].discount,
                        priceDiscount: product[indice].price * (100 - 10) / 100
                    }
                    // Creamos un Array con 3 productos al azar.
                    let resultRandom = ramdonResult();
                    let productsRandom = [];
                    for (let i = 0; i < resultRandom.length; i++) {
                        productsRandom.push(product[resultRandom[i]]);                    
                    }  
                    // Retornamos el renderizado de la vista Detalle de un producto, con todas las variables utilizadas.     
                    return res.render('./products/productDetail' , {products, idParam, userLogged, productsRandom, toThousand, toComma});
                })
                .catch(error => res.json(
                    error = {
                        msj: "Producto no encontrado"
                    }
                ));
        },
    showFormCreate: (req, res) => {
            let userLogged = req.session.user;
            db.Brands.findAll()
            .then ((brands) => {
                res.render('./products/create', {brands, userLogged})

            })
        },
    create: async (req, res) => {
            if(req.file) {
                if(req.body.radio_trademark == 1) {
                    let brand = await db.Brands.findByPk(req.body.trademarkProductExist);
                    let categories = await db.Categories.findOne({ where: {name: req.body.categoryProduct}});
                    let newImage = await db.ImagesProducts.create( { name: req.file.filename});
                    let newProduct = await db.Products.create({
                        name: req.body.nameProduct,
                        description: req.body.descriptionProduct,
                        price: req.body.priceProduct,
                        discount: req.body.discount,
                        id_category: categories.id,
                        id_brand: brand.id,
                        id_image_product: newImage.id
                    })
                    res.redirect('/products/all');
                } else if (req.body.radio_trademark == 2) {
                    let brands = await db.Brands.create( { name: req.body.trademarkProduct });
                    let categories = await db.Categories.findOne({ where: {name: req.body.categoryProduct}});
                    let newImage = await db.ImagesProducts.create( { name: req.file.filename});
                    let newProduct = await db.Products.create({
                        name: req.body.nameProduct,
                        description: req.body.descriptionProduct,
                        price: req.body.priceProduct,
                        discount: req.body.discount,
                        id_category: categories.id,
                        id_brand: brands.id,
                        id_image_product: newImage.id
                    });
                    res.redirect('/products/all');
                }
            }
        },
    allProducts: (req, res) => {
            db.Products.findAll({include: ['categories','images_products', 'brands']},
            {order: [ ["id", "DESC"] ]})
            .then((products) => {      
                let userLogged = req.session.user
                res.render('./products/allProducts', {products, userLogged, toThousand, toComma});
            })
            .catch(error => res.json(
                error = {
                    msj: "Problemas en el servidor"
                }
            ));
        },
    edit: (req,res) => {
        let userLogged = req.session.user;
        let idParam = req.params.id;
        let products = productsModel.readFile();
        res.render('./products/productEdit', {products, idParam, userLogged})
    },
    update: async (req, res) => {
        let productId = req.params.id;
        if(req.file) {
            let newImage = await db.ImagesProducts.create( { name: req.file.filename } );
            let newBrand = await db.Brands.create( { name: req.file.trademarkProduct} );
            db.Products.update(
                {
                    name: req.body.nameProduct,
                    description: req.body.descriptionProduct,
                    price: req.body.priceProduct,
                    discount: req.body.discount,
                    id_brand: newBrand.id,
                    id_image_product: newImage.id,
                },
                { where: { id: productId } }
            );
            return res.redirect(`/products/productEdit/${productId}`)
        } else {
            let newBrand = await db.Brands.create( { name: req.file.trademarkProduct} );
            db.Products.update(
                {
                    name: req.body.nameProduct,
                    description: req.body.descriptionProduct,
                    price: req.body.priceProduct,
                    discount: req.body.discount,
                    id_brand: newBrand.id,
                },
                { where: { id: productId } }
            );
            return res.redirect(`/products/productEdit/${productId}`)
        }
    },
    delete: (req, res) => {
        let idParam = req.params.id;
        db.Products.destroy({ where: { id: idParam}})
        res.redirect('/');            
    },
    accesorios: async (req, res) => {
        let userLogged = req.session.user;
        let accesoryProduct = await db.Products.findAll({ 
            include: ['categories','images_products', 'brands'],
            where: {id_category: 4}
        });
        let products = [];
        accesoryProduct.forEach(element => {
            let product = {
                id: element.id,
                nameProduct: element.name,
                descriptionProduct: element.description,
                categoryProduct: element.categories.name,
                trademarkProduct: element.brands.name,
                priceProduct: element.price,
                image: element.images_products.name,
                discount: element.discount,
                priceDiscount: element.price * (100 - 10) / 100
            }   
            products.push(product)
        });
        res.render('./products/listProducts', {products, userLogged, toThousand, toComma})
    },
    lentesRecetado: async (req, res) => {
        let userLogged = req.session.user;
        let recetadoProduct = await db.Products.findAll({ 
            include: ['categories','images_products', 'brands'],
            where: {id_category: 1}
        });
        let products = [];
        recetadoProduct.forEach(element => {
            let product = {
                id: element.id,
                nameProduct: element.name,
                descriptionProduct: element.description,
                categoryProduct: element.categories.name,
                trademarkProduct: element.brands.name,
                priceProduct: element.price,
                image: element.images_products.name,
                discount: element.discount,
                priceDiscount: element.price * (100 - 10) / 100
            }   
            products.push(product)
        });
        res.render('./products/listProducts', {products, userLogged, toThousand, toComma})
    },
    lentesSol: async (req, res) => {
        let userLogged = req.session.user;
        let solProduct = await db.Products.findAll({ 
            include: ['categories','images_products', 'brands'],
            where: {id_category: 2}
        });
        let products = [];
        solProduct.forEach(element => {
            let product = {
                id: element.id,
                nameProduct: element.name,
                descriptionProduct: element.description,
                categoryProduct: element.categories.name,
                trademarkProduct: element.brands.name,
                priceProduct: element.price,
                image: element.images_products.name,
                discount: element.discount,
                priceDiscount: element.price * (100 - 10) / 100
            }   
            products.push(product)
        });
        res.render('./products/listProducts', {products, userLogged, toThousand, toComma})
    },
    lentesContacto: async (req, res) => {
        let userLogged = req.session.user;
        let contactoProduct = await db.Products.findAll({ 
            include: ['categories','images_products', 'brands'],
            where: {id_category: 3}
        });
        let products = [];
        contactoProduct.forEach(element => {
            let product = {
                id: element.id,
                nameProduct: element.name,
                descriptionProduct: element.description,
                categoryProduct: element.categories.name,
                trademarkProduct: element.brands.name,
                priceProduct: element.price,
                image: element.images_products.name,
                discount: element.discount,
                priceDiscount: element.price * (100 - 10) / 100
            }   
            products.push(product)
        });
        res.render('./products/listProducts', {products, userLogged, toThousand, toComma})
    },
    productCart: (req, res) => {
        let userLogged = req.session.user;
        let products = productsModel.readFile();
        let costo = -1;
        res.render('./products/productCart', {products, costo, userLogged, toThousand, toComma});
    },
    calculoEnvio: (req, res) => {
        let userLogged = req.session.user;
        let products = productsModel.readFile();
        if(req.body.codigoPostal){
            let codigoPostal = req.body.codigoPostal;
            let costo;
            if (codigoPostal < 0){
                costo = -1
            } else if (0 <= codigoPostal && codigoPostal <= 100) {
                costo = 0
            } else if (100 < codigoPostal && codigoPostal <= 1000 ) {
                costo = (codigoPostal * 1.5).toFixed(2)
            } else {
                costo = (codigoPostal * 1.1).toFixed(2)
            }

            res.render('./products/productCart', {products, costo, codigoPostal, userLogged, toThousand, toComma});
        } else {
            let costo = -1
            res.render('./products/productCart', {products, costo, userLogged, toThousand, toComma});
        }
    }
}

module.exports = productController;