const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products')

const imageCarrousel = [
    {
        src: 'carrousel-1-movile.jpg',
        alt: 'Imagen 1',
        class: 'img-movile-tablet'
    },
    {
        src: 'carrousel-2-movile.jpg',
        alt: 'Imagen 2',
        class: 'img-movile-tablet'
    },
    {
        src: 'carrousel-5-movile.jpeg',
        alt: 'Imagen 3',
        class: 'img-movile-tablet'
    },
    {
        src: 'carrousel-4-movile.jpg',
        alt: 'Imagen 4',
        class: 'img-movile-tablet'
    },
    {
        src: 'carrousel-1-desktop.jpg',
        alt: 'Imagen 1',
        class: 'img-desktop'
    },
    {
        src: 'carrousel-2-desktop.jpg',
        alt: 'Imagen 2',
        class: 'img-desktop'
    },
    {
        src: 'carrousel-3-desktop.jpg',
        alt: 'Imagen 3',
        class: 'img-desktop'
    },
    {
        src: 'carrousel-4-desktop.jpg',
        alt: 'Imagen 4',
        class: 'img-desktop'
    },
];

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

let mainController = {
    index: (req, res) => {
        let products = productsModel.readFile();
        res.render('index', {imageCarrousel, products, result : ramdonResult()});
    },
    contact: (req, res) => {
        res.render('contact');
    }
}

module.exports = mainController;

