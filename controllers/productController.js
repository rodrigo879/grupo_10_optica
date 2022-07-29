const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products')

//Reemplaza el punto de los decimales por una coma en el precio de los productos..
const toComma = n => n.toString().replace(".", ",");

//Agrega el punto cada 3 caracteres en el precio de los productos..
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Funcion para generar resultados al azar para mostrar como productos opcionales en el detalle de producto..
function ramdonResult() {
    let result = [];
    let i = 0;
    do {
        let ramdomI = Math.floor(Math.random() * 36)
        if(result.find(element => element == ramdomI) == undefined) {
            result.push(ramdomI)
            i = i + 1;
        }
    } while (i < 12);
    return result
}

let productController = {
    product: (req,res) => {
        let idParam= req.params.id
        let products = productsModel.readFile();
        res.render('./products/productDetail' , {products, idParam, result: ramdonResult(), toThousand, toComma});
    },
    showFormCreate: (req, res) => {
        res.render('./products/create')
    },
    create: (req, res) => {
        if(req.file) {
            let productsCreate = req.body;
            productsCreate.image = req.file.filename;
            productsCreate.priceDiscount = req.body.priceProduct * (100 - productsCreate.discount) / 100;
            productsId = productsModel.create(productsCreate);
            res.redirect('/');
        }
    },
    edit: (req,res) => {
        let idParam = req.params.id;
        let products = productsModel.readFile();
        res.render('./products/productEdit', {products, idParam})
    },
    update: (req, res) => {
        let idParam = req.params.id;
        let newProduct = req.body;
        newProduct.id = idParam;
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
        let products = productsModel.readFile();      
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idParam) {
                productsModel.delete(idParam);
                break;
            } 
        }
        res.redirect('/');     
    },
    accesorios: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'accesorios')
        res.render('./products/listProducts', {products, toThousand, toComma})
    },
    lentesSol: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'lentesSol')
        res.render('./products/listProducts', {products, toThousand, toComma})
    },
    lentesRecetado: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'lentesRecetados')
        res.render('./products/listProducts', {products, toThousand, toComma})
    },
    lentesContacto: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'lentesContacto')
        res.render('./products/listProducts', {products, toThousand, toComma})
    },
    productCart: (req, res) => {
        let products = productsModel.readFile();
        let costo = -1;
        res.render('./products/productCart', {products, costo, toThousand, toComma});
    },
    calculoEnvio: (req, res) => {
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
            res.render('./products/productCart', {products, costo, codigoPostal, toThousand, toComma});
        } else {
            let costo = -1
            res.render('./products/productCart', {products, costo, toThousand, toComma});
        }
    }
}

module.exports= productController;