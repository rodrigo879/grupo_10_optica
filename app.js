//PAQUETES REQUERIDOS INSTALADOS
const express = require('express');
const methodOverride = require('method-override')
const path = require('path')
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors')

//ARCHIVOS REQUERIDOS DEL PROYECTO
const mainRoute = require('./routes/mainRoute');
const usersRoute = require('./routes/usersRoute');
const productRoute = require('./routes/productRoute');

//REQUIRIENDO APIS
const apiProductsRoute= require ('./routes/api/productsApiRoute');
const apiUsersRoute = require('./routes/api/usersApiRoute');

//REQUIRIENDO MIDDLEWARES
const recordarUsuarioMiddleware = require ('./middlewares/recordarUsuarioMiddleware');

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || 'localhost';

//CONFIGURACION DEL EJS
app.set('view engine', 'ejs');

//COMPARTIR LA API CON CUALQUIER PROGRAMA EXTERNO
app.use(cors());

//ARCHIVOS ESTATICOS (PUBLIC)
app.use(express.static(path.resolve(__dirname,'./public')));

//PARA PODER CAPTURAR LA INFORMACION QUE VIENEN DE LOS FORMULARIOS
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//PARA PODER UTILIZAR PUT DELETE ETC..
app.use(methodOverride('_method'));

// APLICANDO SESSION
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

//PARA UTILIZAR COOKIES
app.use(cookieParser());

//CRUZANDO MIDDLEWARES (Recordar Usuario)
app.use(recordarUsuarioMiddleware);

// PAGINAS MAIN
app.use('/', mainRoute);

// PAGINAS USERS
app.use('/users', usersRoute);

//PAGINAS PRODUCT
app.use('/products', productRoute);

//PARA USAR APIS
app.use (('/api/products'), apiProductsRoute)
app.use ('/api/users', apiUsersRoute)

// CUALQUIER DIRECCION QUE NO EXISTA NOS DIRIGE A LA PAGINA DE NOT FOUND.
app.use((req,res,next) => {res.status(404).render('notFound')});

//SERVIDOR LEVANTADO EN LA VARIABLE PORT
app.listen(PORT, function(){
    console.log(`listening on http://localhost:${PORT}`);
})