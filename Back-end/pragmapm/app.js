var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate')

var indexRouter = require('./routes/index');
const projetosRouter = require('./routes/projetos');
var categoriasRouter = require('./routes/categorias');
var usersRouter = require('./routes/users');

const mongoose = require('mongoose');

//mongodb+srv://matman:math1912@cluster0.x21yu.mongodb.net/
const url = 'mongodb://localhost:27017/pragmapm';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: 'session-id',
    secret: '12345-53291-09876-25365',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

// Definindo a função de autenticação
function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        next(err);
    } else {
        next();
    }
}

// Rotas que não exigem autenticação
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Aplicar o middleware de autenticação apenas nas rotas que exigem login
app.use(auth);

// Rotas protegidas
app.use('/projetos', projetosRouter); 
app.use('/categorias', categoriasRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;