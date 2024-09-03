const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema do Serviço
const ServicoSchema = new Schema({
    id: { 
        type: String, 
        required: true,
        default: () => new mongoose.Types.ObjectId().toString()  // Geração automática de ID
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

// Esquema do Projeto
const projetoSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true 
    },
    orcamento: { 
        type: Number, 
        required: true 
    },
    custo: { 
        type: Number, 
        default: 0,
    },
    categoria: { 
        type: String
    },
    servicos: { 
        type: [ServicoSchema],  // Array de serviços
        default: []  // Inicializa como array vazio
    }
}, 
{
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

// Modelo do Projeto
const Projetos = mongoose.model('Projeto', projetoSchema);
module.exports = Projetos;
