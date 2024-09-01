var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importar CORS
const User = require('./models/user')

var indexRouter = require('./routes/index');
const projetosRouter = require('./routes/projetos');
var categoriasRouter = require('./routes/categorias');

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//novos imports. No package foi trocado "node ./bin/www" por "nodemon app.js"

const mongoose = require('mongoose');

const url = 'mongodb+srv://matman:math1912@cluster0.x21yu.mongodb.net/';

var app = express();

app.use(cors()); // Usar CORS globalmente
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a nossa API!"});
})

//Private Route
app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id;

    // checa se o usuario existe
    const user = await User.findById(id, '-password');
    if(!user){
        return res.status(404).json({msg: "Usuário não encontrado"});
    }
    res.status(200).json({user});
})

// Validar token
function checkToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({msg: "Acesso negado!"});
    }
    try{
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    }catch(error){
        res.status(400).json({msg: "Token inválido!"});
    }
}

// Register User
app.post('/auth/register', async(req, res) => {
    const {email, password} = req.body;

    // validations
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório!" });
    }
    if(!password){
        return res.status(422).json({msg: "A senha é obrigatória!" });
    }

    // checando se email existe
    const userExists = await User.findOne({email: email})
    if(userExists){
        return res.status(422).json({msg: "Email já registrado!" });
    }

    // criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // criar usuario
    const user = new User({
        email,
        password: passwordHash,
    })
    try{
        await user.save()
        res.status(201).json({msg: 'Usuário criado com sucesso'});
    }catch(error){
        console.log(error)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde'});
    }
})

// Login User
app.post("/auth/login", async (req, res) => {
    const {email, password} = req.body;

    // validations
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório!" });
    }
    if(!password){
        return res.status(422).json({msg: "A senha é obrigatória!" });
    }

    // checando se usuario existe
    const user = await User.findOne({email: email})
    if(!user){
        return res.status(404).json({msg: "Email não encontrado!" });
    }

    // checando se a senha combina
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        return res.status(422).json({msg: "Senha inválida!" });
    }

    try{
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user._id,
        },
        secret,
        )
        res.status(200).json({msg: "Autenticação realizada com sucesso!", token});
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde'});
    }
})

// Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.x21yu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao banco!');
})
.catch((err) => console.log(err))

app.use('/', indexRouter);
app.use('/projetos', projetosRouter); 
app.use('/categorias', categoriasRouter);

module.exports = app;

