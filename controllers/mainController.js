const fs = require('fs');

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

const product = [
    {
        src: 'lentesRecetados/lentesRecetados1.jpg',
        alt: 'Lentes Recetados 1',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado 1'
    },
    {
        src: 'lentesRecetados/lentesRecetados2.jpg',
        alt: 'Lentes Recetados 2',
        price: '$10.000',
        priceDisc: '$8.200',
        discount: '18% OFF',
        title: 'Lente Recetado 2'
    },
    {
        src: 'lentesSol/lentesSol1.jpg',
        alt: 'Lentes Sol 1',
        price: '$45.500',
        priceDisc: '$27.300',
        discount: '40% OFF',
        title: 'Lente Sol 1'
    },
    {
        src: 'lentesSol/lentesSol2.jpg',
        alt: 'Lentes Sol 2',
        price: '$38.500',
        priceDisc: '$21.175',
        discount: '45% OFF',
        title: 'Lente Sol 2'
    },
    {
        src: 'lentesRecetados/lentesRecetados3.jpg',
        alt: 'Lentes Recetados 3',
        price: '$23.200',
        priceDisc: '$15.080',
        discount: '35% OFF',
        title: 'Lente Recetado 3'
    },
    {
        src: 'lentesRecetados/lentesRecetados4.jpg',
        alt: 'Lentes Recetados 4',
        price: '$7.900',
        priceDisc: '$7.505',
        discount: '5% OFF',
        title: 'Lente Recetado 4'
    },
    {
        src: 'lentesSol/lentesSol3.jpg',
        alt: 'Lentes Sol 3',
        price: '$17.400',
        priceDisc: '$13.050',
        discount: '25% OFF',
        title: 'Lente Sol 3'
    },
    {
        src: 'lentesSol/lentesSol4.jpg',
        alt: 'Lentes Sol 4',
        price: '$17.450',
        priceDisc: '$13.960',
        discount: '20% OFF',
        title: 'Lente Sol 4'
    },
    {
        src: 'lentesContacto/lentesContacto1.jpg',
        alt: 'Lentes Contacto 1',
        price: '$23.960',
        priceDisc: '$17.970',
        discount: '25% OFF',
        title: 'Lente Contacto 1'
    },
    {
        src: 'lentesContacto/lentesContacto2.jpg',
        alt: 'Lentes Contacto 2',
        price: '$27.600',
        priceDisc: '$20.760',
        discount: '25% OFF',
        title: 'Lente Contacto 2'
    },
    {
        src: 'lentesRecetados/lentesRecetados5.jpg',
        alt: 'Lentes Recetados 5',
        price: '$25.750',
        priceDisc: '$21.115',
        discount: '18% OFF',
        title: 'Lente Recetado 5'
    },
    {
        src: 'lentesRecetados/lentesRecetados6.jpg',
        alt: 'Lentes Recetados 6',
        price: '$18.500',
        priceDisc: '$15.170',
        discount: '18% OFF',
        title: 'Lente Recetado 6'
    }
]

let mainController = {
    index: (req, res) => {
        res.render('index', {imageCarrousel, product});
    },
    contact: (req, res) => {
        res.render('contact');
    },
    showForm: (req, res) => {
        res.render('./products/create')
    },
    create: (req, res) => {
        let productsCreate = {
            nameProduct: req.body.nameProduct,
            descriptionProduct: req.body.descriptionProduct,
            imageProduct: req.body.imageProduct,
            categoryProduct: req.body.categoryProduct,
            trademarkProduct: req.body.trademarkProduct,
            priceProduct: req.body.priceProduct,
        }

            let archivoProducts = fs.readFileSync('./database/products.json', {encoding: 'utf-8'})
            let products;
            
            if(archivoProducts == ""){
                products = [];
            } else {
                products = JSON.parse(archivoProducts);
            }
            
            products.push(productsCreate);

            productsJSON = JSON.stringify(products);
            
            fs.writeFileSync('./database/products.json', productsJSON);

            res.render('./products/create');
    },  
}

module.exports = mainController;

