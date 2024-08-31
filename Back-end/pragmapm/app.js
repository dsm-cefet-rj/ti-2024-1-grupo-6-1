var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importar CORS

var indexRouter = require('./routes/index');
const projetosRouter = require('./routes/projetos');
var categoriasRouter = require('./routes/categorias');


const mongoose = require('mongoose');

const url = 'mongodb+srv://matman:math1912@cluster0.x21yu.mongodb.net/';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();

app.use(cors()); // Usar CORS globalmente
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projetos', projetosRouter); 
app.use('/categorias', categoriasRouter);

module.exports = app;

