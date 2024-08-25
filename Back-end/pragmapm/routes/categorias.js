var express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const Categoria = require('../models/categorias'); 

router.use(cors());
router.use(bodyParser.json());

let categoria = [
    { "id": "326b", "categoria": "Desenvolvimento" },
    { "id": "ac9d", "categoria": "Design" }
];

router.route('/')
  .get((req, res) => {
      Categoria.find({}) // Garantir que o método 'find' esteja sendo chamado corretamente
        .then((categorias) => res.status(200).json(categorias))
        .catch((err) => res.status(500).json({ message: err.message }));
  })
  .post((req, res) => {
      Categoria.create(req.body) // Certifique-se de que 'create' está sendo usado corretamente
        .then((categoria) => res.status(200).json(categoria))
        .catch((err) => res.status(500).json({ message: err.message }));
  });

router.route('/:id')
  .get((req, res) => {
      const categoria = categorias.find(c => c.id === req.params.id);
      if (categoria) {
          res.status(200).json(categoria);
      } else {
          res.status(404).json({ message: "Categoria não encontrada" });
      }
  })
  .delete((req, res) => {
      categorias = categorias.filter(c => c.id !== req.params.id);
      res.status(200).json({ message: "Categoria deletada com sucesso" });
  })
  .put((req, res) => {
      let index = categorias.findIndex(c => c.id === req.params.id);
      if (index !== -1) {
          categorias[index] = { ...req.body, id: req.params.id }; // Atualizar categoria mantendo o ID
          res.status(200).json(categorias[index]);
      } else {
          res.status(404).json({ message: "Categoria não encontrada" });
      }
  });

module.exports = router;
