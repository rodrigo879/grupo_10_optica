const multer = require('multer')
const path = require('path')

function pathDestination(ruta) {
    return path.join(__dirname, ruta);
}

// PROPIEDADES DEL DISKSTORAGE (RUTA DONDE CARGA LA IMAGEN Y NOMBRE CON EL QUE GUARDA)
const storage = multer.diskStorage({ 
    destination: (req,file,cb) => {
        let rutaImage;
        let category = req.body.categoryProduct;
        if (req.body.user) {
            rutaImage = pathDestination('../public/images/users');
        } else if (category == 'lentesRecetados') {
            rutaImage = pathDestination(`../public/images/productos/${category}`);
        } else if (category == 'lentesSol') {
            rutaImage = pathDestination(`../public/images/productos/${category}`);
        } else if (category == 'lentesContacto') {
            rutaImage = pathDestination(`../public/images/productos/${category}`);
        } else {
            rutaImage = pathDestination(`../public/images/productos/${category}`);
        }
        cb(null, rutaImage);
    },
    filename: (req,file,cb) => {
        let newFileName;
        if (req.body.user) {
            newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        } else {
            newFileName = 'product-' + Date.now() + path.extname(file.originalname);
        }
        cb(null, newFileName);
    }
});

// SUBE LA IMAGEN
const upload = multer({ storage })

module.exports = upload;