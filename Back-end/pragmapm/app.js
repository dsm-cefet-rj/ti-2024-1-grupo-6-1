var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importar CORS

var indexRouter = require('./routes/index');
var projetosRouter = require('./routes/projetos');

var app = express();

app.use(cors()); // Usar CORS globalmente
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projetos', projetosRouter); // Certifique-se de que esta rota está correta

module.exports = app;
