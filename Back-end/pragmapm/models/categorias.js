const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    id: { 
        type: String, 
        required: true 
    },
    categoria: {
        type: String,
        required: true,
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

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria;