const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicoSchema = new Schema({
    id: { 
        type: String, 
        required: true 
    },
    nome: { 
        type: String, 
        required: true 
    },
    custo: { 
        type: Number, 
        required: true 
    },
    descricao: { 
        type: String 
    }
});

const projetoSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    orcamento: {
        type: String,
        required: true,
    },
    custo: { 
        type: Number, 
        default: 0,
    },
    categorias: {
      id: String,
      categoria: String
    },
    subcategorias: {
      id: String,
      subcategoria: String
    },
    servicos: [ServicoSchema]  // Array de serviço
})

var Projetos = mongoose.model('Projeto', projetoSchema);

module.exports = Projetos;