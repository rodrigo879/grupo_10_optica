
const products= [
    {   
        id: 1,
        ruta: 'Lentes Recetados',
        src: 'lentesRecetados/lentesRecetados',
        extension: '.jpg',
        alt: 'Lente Recetado ',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado '
    },
    {   
        id: 2,
        ruta: 'Lentes Recetados',
        src: 'lentesRecetados/lentesRecetados',
        extension: '.jpg',
        alt: 'Lente Recetado ',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado '
    },
    {   
        id: 3,
        ruta: 'Lentes Recetados',
        src: 'lentesRecetados/lentesRecetados',
        extension: '.jpg',
        alt: 'Lente Recetado ',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado '
    },
    {   
        id: 4,
        ruta: 'Lentes Recetados',
        src: 'lentesRecetados/lentesRecetados',
        extension: '.jpg',
        alt: 'Lente Recetado ',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado '
    },
    {   
        id: 5,
        ruta: 'Lentes Recetados',
        src: 'lentesRecetados/lentesRecetados',
        extension: '.jpg',
        alt: 'Lente Recetado ',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado '
    },
    {   
        id: 6,
        ruta: 'Lentes Recetados',
        src: 'lentesRecetados/lentesRecetados',
        extension: '.jpg',
        alt: 'Lente Recetado ',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado '
    },
    {   
        id: 7,
        ruta: 'Lentes Recetados',
        src: 'lentesRecetados/lentesRecetados',
        extension: '.jpg',
        alt: 'Lente Recetado ',
        price: '$6.770',
        priceDisc: '$4.062',
        discount: '40% OFF',
        title: 'Lente Recetado '
    },
];

let productController= {
    product: (req,res) => {
        let idParam= req.params.id
        res.render('./products/product' , {products,idParam});
    },
    

}

module.exports= productController;