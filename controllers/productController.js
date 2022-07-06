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
        res.render('./products/productCart');
    }
}

module.exports= productController;