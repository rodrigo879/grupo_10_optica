const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products')
const imgCarrousel = jsonTable('imageCarrousel')

function ramdonResult(products) {
    let result = [];
    let i = 0;
    do {
        let ramdomI = Math.floor(Math.random() * 48)
        if(products[ramdomI].discount > 0) {
            if(result.find(element => element == ramdomI) == undefined) {
                result.push(ramdomI)
                i = i + 1;
            }
        }
    } while (i < 12);
    return result
}

let mainController = {
    index: (req, res) => {
        let imageCarrousel = imgCarrousel.readFile();
        let products = productsModel.readFile();
        let result = ramdonResult(products);
        res.render('index', {imageCarrousel, products, result});
    },
    contact: (req, res) => {
        res.render('contact');
    }
}

module.exports = mainController;

