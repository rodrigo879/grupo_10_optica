const express = require('express');
const path = require('path')
const app = express();

app.use(express.static(path.resolve(__dirname,'./public')));

app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/index.html'))
})

app.get('/base', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/base.html'))
})

app.get('/login', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/login.html'))
})

app.get('/register', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/register.html'))
})

app.get('/productDetail', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/productDetail.html'))
})

app.get('/productCart', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/productCart.html'))
})

app.listen(3000, function(){
    console.log('listening on http://localhost:3000');
})