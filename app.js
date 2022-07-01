//PAQUETES REQUERIDOS INSTALADOS
const express = require('express');
const methodOverride = require('method-override')
const path = require('path')
const app = express();

//ARCHIVOS REQUERIDOS DEL PROYECTO
const indexRoute = require('./routes/indexRoute');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

//CONFIGURACION DEL EJS
app.set('view engine', 'ejs');

//ARCHIVOS ESTATICOS (PUBLIC)
app.use(express.static(path.resolve(__dirname,'./public')));

//PARA PODER CAPTURAR LA INFORMACION QUE VIENEN DE LOS FORMULARIOS
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//PARA PODER UTILIZAR PUT DELETE ETC..
app.use(methodOverride('_method'));

// PAGINA INDEX
app.use('/', indexRoute);
app.get('/create', (req,res) => {
    res.render('./products/create')
})



app.get('/login', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/login.html'))
})

app.get('/register', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/register.html'))
})

app.get('/product', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/product.html'))
})

app.get('/anteojosSol', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/anteojosSol.html'))
})

app.get('/anteojosRecetados', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/anteojosRecetados.html'))
})

app.get('/anteojosLentesContacto', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/anteojosLentesContacto.html'))
})

app.get('/accesorios', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/accesorios.html'))
})

app.get('/productCart', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/productCart.html'))
})

// CUALQUIER DIRECCION QUE NO EXISTA NOS DIRIGE A LA PAGINA DE NOT FOUND.
app.use((req,res,next) => {res.status(404).render('notFound')});

//SERVIDOR LEVANTADO EN LA VARIABLE PORT
app.listen(PORT, function(){
    console.log(`listening on http://localhost:${PORT}`);
})