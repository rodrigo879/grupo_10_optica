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
    showFormCreate: (req, res) => {
        let userLogged = req.session.user;
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
        let userLogged = req.session.user;
        let products = productsModel.readFile().sort((a, b) => {return b.id - a.id});
        //let products = productsOriginal.sort((a, b) => {return b.id - a.id})
        res.render('./products/allProducts', {products, userLogged, toThousand, toComma});
    },
    edit: (req,res) => {
        let userLogged = req.session.user;
        let idParam = req.params.id;
        let products = productsModel.readFile();
        res.render('./products/productEdit', {products, idParam, userLogged})
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