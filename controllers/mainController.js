const jsonTable = require('../jsondatabase/jsonTable');
const db = require('../database/models');

const imgCarrousel = jsonTable('imageCarrousel')
// Reemplaza el punto de los decimales por una coma en el precio de los productos..
const toComma = n => n.toString().replace(".", ",");
// Agrega el punto cada 3 caracteres en el precio de los productos..
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Funcion para generar resultados al azar para mostrar en la seccion de ofertas..
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
        let userLogged = req.session.user;   
        let imageCarrousel = imgCarrousel.readFile();
        db.Products.findAll({include: ['categories','images_products', 'brands']})
            .then((products) => {      
                let result = ramdonResult(products);
                res.render('index', {imageCarrousel, products, result, userLogged, toThousand, toComma});
            })
            .catch(error => res.json(
                error = {
                    msj: "Problemas en el servidor"
                }
            ));
    },
    contact: (req, res) => {
        let userLogged = req.session.user;
        res.render('contact', {userLogged} );
    }
}

module.exports = mainController;