var express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(cors());
router.use(bodyParser.json());

let subcategorias = [
    { "id": "001", "subcategorias": "Front-end", "idCategoria": "326b" },
    { "id": "002", "subcategorias": "UX/UI", "idCategoria": "ac9d" }
];

router.route('/')
  .get((req, res) => {
      res.status(200).json(subcategorias);
  })
  .post((req, res) => {
      let proxId = (Math.max(...subcategorias.map(p => parseInt(p.id, 10))) + 1).toString();
      let subcategoria = { ...req.body, id: proxId };
      subcategorias.push(subcategoria);
      res.status(200).json(subcategoria);
  });

router.route('/:id')
  .get((req, res) => {
      const subcategoria = subcategorias.find(s => s.id === req.params.id);
      if (subcategoria) {
          res.status(200).json(subcategoria);
      } else {
          res.status(404).json({ message: "Subcategoria não encontrada" });
      }
  })
  .put((req, res) => {
      let index = subcategorias.findIndex(s => s.id === req.params.id);
      if (index !== -1) {
          subcategorias[index] = { ...req.body, id: req.params.id }; // Atualizar subcategoria mantendo o ID
          res.status(200).json(subcategorias[index]);
      } else {
          res.status(404).json({ message: "Subcategoria não encontrada" });
      }
  })
  .delete((req, res) => {
      subcategorias = subcategorias.filter(s => s.id !== req.params.id);
      res.status(200).json({ message: "Subcategoria deletada com sucesso" });
  });

module.exports = router;
