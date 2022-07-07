const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products')

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

let productController= {
    product: (req,res) => {
        let idParam= req.params.id
        let products = productsModel.readFile();
        res.render('./products/productDetail' , {products, idParam, result: ramdonResult()});
    },
    showForm: (req, res) => {
        res.render('./products/create')
    },
    create: (req, res) => {
        if(req.file) {
            let productsCreate = req.body;
            productsCreate.image = req.file.filename;
            productsCreate.priceDiscount = req.body.priceProduct * (100 - productsCreate.discount) / 100;
            productsId = productsModel.create(productsCreate);
            res.render('./products/create');
        }
    },
    accesorios: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'accesorios')
        res.render('./products/listProducts', {products})
    },
    lentesSol: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'lentesSol')
        res.render('./products/listProducts', {products})
    },
    lentesRecetado: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'lentesRecetados')
        res.render('./products/listProducts', {products})
    },
    lentesContacto: (req, res) => {
        let products = productsModel.readFile().filter(element => element.categoryProduct == 'lentesContacto')
        res.render('./products/listProducts', {products})
    },
    productCart: (req, res) => {
        let products = productsModel.readFile();
        let costo = -1
        res.render('./products/productCart', {products, costo});
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
            res.render('./products/productCart', {products, costo});
        } else {
            let costo = -1
            res.render('./products/productCart', {products, costo});
        }
    }
}

module.exports= productController;