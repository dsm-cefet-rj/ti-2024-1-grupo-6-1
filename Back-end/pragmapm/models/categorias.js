const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    categoria: {
        type: String,
        required: true,
    },
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria;