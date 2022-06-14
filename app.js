const express = require('express');
const path = require('path')
const app = express();

app.use(express.static(path.resolve(__dirname,'./public')));

app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/index.html'))
})

app.get('/base.html', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/base.html'))
})

app.get('/login.html', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/login.html'))
})

app.get('/register.html', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/register.html'))
})

app.get('/productDetail.html', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/productDetail.html'))
})

app.get('/productCart.html', function(req,res){
    res.sendFile(path.resolve(__dirname,'./views/productCart.html'))
})

app.listen(3000, function(){
    console.log('listening on http://localhost:3000');
})