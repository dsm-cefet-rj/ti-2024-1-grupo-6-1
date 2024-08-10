const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetoSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    orcamento: {
        type: String,
        required: true,
    }
})

var Projetos = mongoose.model('Projeto', projetoSchema);

module.exports = Projetos;