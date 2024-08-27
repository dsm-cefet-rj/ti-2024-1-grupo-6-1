var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importar CORS
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
const projetosRouter = require('./routes/projetos');
var categoriasRouter = require('./routes/categorias');


const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/pragmapm';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();

app.use(cors()); // Usar CORS globalmente
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(session({
    name: 'session-id',
    secret: '12345-53291-09876-25365',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

function auth (req, res, next) {
    console.log(req.session);
    if(!req.session.user){
        var authHeader = req.headers.authorization;
        if(!authHeader){
            var err = new Error('Voce nao esta autenticado');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
            return;
        }

        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if(user == 'admin' && pass == 'password'){
            
            req.session.user = 'admin';
            next();//autorizado
        } else {
            var err = new Error('Voce nao esta autenticado');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
        }
    }else{
        if(req.session.user === 'admin'){
            next();
        }
        else{
            var err = new Error('Voce nao esta autenticado');
            err.status = 401;
            next(err);
        }
    }
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projetos', projetosRouter); 
app.use('/categorias', categoriasRouter);

module.exports = app;

