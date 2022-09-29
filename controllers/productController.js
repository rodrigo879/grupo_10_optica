const jsonTable = require('../jsondatabase/jsonTable');
const productsModel = jsonTable('products')
const db = require('../database/models');
const { validationResult } = require('express-validator');
const multer = require('multer');

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
    product: async (req,res) => {
        let userLogged = req.session.user;
        let idParam = req.params.id
        let allProducts = await db.Products.findAll({include: ['categories','images_products', 'brands']})
        // Creamos un Array con 3 productos al azar.
        let productsRandom = ramdonResult(allProducts);
        // Almacenamos el indice al cual corresponde el id del producto igual al pasado por parametro en la URL.
        let indice = allProducts.findIndex((element) => {return element.id == idParam})
        if(indice >= 0) {
            // Creamos una variable con los datos que devuelve la promesa, ajustado a como habiamos hecho la vista inicialmente.
            let products = {
                id: allProducts[indice].id,
                nameProduct: allProducts[indice].name,
                descriptionProduct: allProducts[indice].description,
                categoryProduct: allProducts[indice].categories.name,
                trademarkProduct: allProducts[indice].brands.name,
                priceProduct: allProducts[indice].price,
                image: allProducts[indice].images_products.name,
                discount: allProducts[indice].discount,
                priceDiscount: allProducts[indice].price * (100 - 10) / 100
            }
            return res.render('./products/productDetail' , {products, idParam, userLogged, productsRandom, toThousand, toComma});
        } else {
            return res.render('./products/productDetail' , {userLogged, productsRandom, toThousand, toComma});
        }
    },
    showFormCreate: async (req, res) => {
        let brands = await db.Brands.findAll();
        let categories = await db.Categories.findAll();
        let userLogged = req.session.user
        res.render('./products/create', {userLogged, brands, categories})
    },
    create: async (req, res) => { 
        let userLogged = req.session.user
        let errors = validationResult(req);
        if (errors.isEmpty()){ 
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
            } else {       
                let brands = await db.Brands.findAll();
                let categories = await db.Categories.findAll(); 
                let error = {
                    msg: "Debe ingresar una imagen",
                    param: "credInvImg"
                }
            res.render('./products/create', {error, brands, categories, oldData: req.body, userLogged});
            }
        } else {
            let brands = await db.Brands.findAll();
            let categories = await db.Categories.findAll();
            res.render('./products/create', {errors:errors.mapped (), brands, categories, oldData: req.body, userLogged});
        } 
    },
    allProducts: (req, res) => {
        db.Products.findAll({
            include: ['categories','images_products', 'brands'],
            order: [ ["id", "DESC"] ]
        })
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
    edit: async (req,res) => {
        let userLogged = req.session.user;
        let idParam = req.params.id
        let brands = await db.Brands.findAll();
        let categories = await db.Categories.findAll();
        let product = await db.Products.findByPk( idParam, {include: ['categories','images_products', 'brands']})
        // Creamos una variable con los datos que devuelve la promesa, ajustado a como habiamos hecho la vista inicialmente.
        let products = {
            id: product.id,
            nameProduct: product.name,
            descriptionProduct: product.description,
            categoryProduct: product.categories.name,
            trademarkProduct: product.brands.name,
            priceProduct: product.price,
            image: product.images_products.name,
            discount: product.discount,
            priceDiscount: product.price * (100 - 10) / 100
        }
        return res.render('./products/productEdit' , {products, idParam, brands, categories, userLogged, toThousand, toComma});
    },
    update: async (req, res) => {
        let productId = req.params.id;
        let errors = validationResult(req)
        if(errors.isEmpty()) {
            if(req.file) {
                let newImage = await db.ImagesProducts.create( { name: req.file.filename } );
                let newBrand = await db.Brands.create( { name: req.body.trademarkProduct} );
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
                return res.redirect(`/products/${productId}/edit`)
            } else {
                let newBrand = await db.Brands.create( { name: req.body.trademarkProduct} );
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
                return res.redirect(`/products/${productId}/edit`)
            }
        } else {
            let userLogged = req.session.user;
            let idParam = req.params.id
            let brands = await db.Brands.findAll();
            let categories = await db.Categories.findAll();
            let product = await db.Products.findByPk( idParam, {include: ['categories','images_products', 'brands']})
            let products = {
                id: product.id,
                nameProduct: product.name,
                descriptionProduct: product.description,
                categoryProduct: product.categories.name,
                trademarkProduct: product.brands.name,
                priceProduct: product.price,
                image: product.images_products.name,
                discount: product.discount,
                priceDiscount: product.price * (100 - 10) / 100
            }
            res.render('./products/productEdit' , { errors:errors.mapped (), userLogged, oldData: req.body, products, idParam, brands, categories, userLogged, toThousand, toComma});
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
        let costo = -1;
        res.render('./products/productCart', {costo, userLogged, toThousand, toComma});
    },
    calculoEnvio: (req, res) => {
        let userLogged = req.session.user;
        let codigoPostal = req.body.codigoPostal;
        if(codigoPostal){
            let costo;
            if (codigoPostal < 0){
                costo = -1
            } else if (0 <= codigoPostal && codigoPostal <= 100) {
                costo = 0
            } else if (100 < codigoPostal && codigoPostal <= 1000 ) {
                costo = (codigoPostal * 1.5).toFixed(2);
            } else {
                costo = (codigoPostal * 1.1).toFixed(2);
            }
            res.render('./products/productCart', {costo, codigoPostal, userLogged, toThousand, toComma});
        } else {
            let costo = -1
            res.render('./products/productCart', {costo, userLogged, toThousand, toComma});
        }
    }
}

module.exports = productController;