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

const projetoSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true 
    },
    orcamento: { 
        type: Number, 
        required: true 
    },
    categoria: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categoria', 
        required: false 
    },
},
{
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }
    }
})



var Projetos = mongoose.model('Projeto', projetoSchema);
module.exports = Projetos;