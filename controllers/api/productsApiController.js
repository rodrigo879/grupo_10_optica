const db = require('../../database/models');
const { lentesContacto } = require('../productController');

let productsApiController = {
    list: async (req,res) => {
        let products=  await db.Products.findAll({
            include: ['categories','images_products', 'brands'],
            order: [ ["id", "ASC"] ]      
        })   
        

        let cuentaLentesRecetado = await db.Products.count ({ where: { id_category : 1} });
        let cuentaLentesSol = await db.Products.count({ where: { id_category : 2} });
        let cuentaLentesContacto = await db.Products.count({ where: { id_category : 3} });
        let cuentaAccesorios = await db.Products.count({ where: { id_category : 4} });

            return res.json ({
            code:200,
            countByCategory: {lentesContacto: cuentaLentesContacto, lentesRecetado: cuentaLentesRecetado, lentesSol: cuentaLentesSol, accesorios: cuentaAccesorios}, 
            msg: "success",
            count: products.length,
            data: products
            })
        },
    detail: (req, res) => {
        let idParam = req.params.id;
        db.Products.findByPk (idParam, { include: ['categories','images_products', 'brands']})
        .then(product => { 
        return res.json ({
            code:200,
            msg: "success",
            data: product
        });
        })
    }

    }


module.exports = productsApiController;