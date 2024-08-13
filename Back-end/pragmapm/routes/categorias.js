var express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(cors());
router.use(bodyParser.json());

let categorias = [
    { "id": "326b", "categoria": "Desenvolvimento" },
    { "id": "ac9d", "categoria": "Design" }
];

router.route('/')
  .get((req, res) => {
      res.status(200).json(categorias);
  })
  .post((req, res) => {
      let proxId = (Math.max(...categorias.map(p => parseInt(p.id, 16))) + 1).toString(16);
      let categoria = { ...req.body, id: proxId };
      categorias.push(categoria);
      res.status(200).json(categoria);
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
