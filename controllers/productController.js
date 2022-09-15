const jsonTable = require('../jsondatabase/jsonTable');
const db = require('../database/models');
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
            let userLogged = req.session.user
            res.render('./products/create', {userLogged})
        },
        create: (req, res) => {
            if(req.file) {
                let productsCreate = req.body;
                productsCreate.image = req.file.filename;
                productsCreate.priceDiscount = req.body.priceProduct * (100 - productsCreate.discount) / 100;
                productsId = productsModel.create(productsCreate);
                res.redirect('/products/all');
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
        edit: async (req,res) => {
            let userLogged = req.session.user;
            let idParam = req.params.id
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
                return res.render('./products/productEdit' , {products, idParam, userLogged, toThousand, toComma});
    },
    update: (req, res) => {
        let idParam = req.params.id;
        let newProduct = req.body;
        newProduct.id = parseInt(idParam);
        newProduct.priceDiscount = newProduct.priceProduct * (100 - newProduct.discount) / 100;
        if(req.file) {
            newProduct.image = req.file.filename;
        } else {
            let products= productsModel.readFile();
            let productFind = products.find(element => element.id == idParam);
            newProduct.image = productFind.image;
        }
        productsModel.update(newProduct);
        res.redirect ('/');
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