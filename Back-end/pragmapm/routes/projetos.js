const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(cors());
router.use(bodyParser.json());

let projetos = [
  {
    id: "81d7",
    nome: "PSW",
    orcamento: "5000",
    categoria: {
      id: "326b",
      categoria: "Desenvolvimento"
    },
    subcategoria: {
      id: "f21e",
      subcategoria: "Front-end"
    },
    custo: 0,
    servicos: []
  },
  {
    id: "81d9",
    nome: "Metodologia",
    orcamento: "5000",
    categoria: {
      id: "326b",
      categoria: "Desenvolvimento"
    },
    subcategoria: {
      id: "f21e",
      subcategoria: "Front-end"
    },
    custo: 0,
    servicos: []
  }
];

// Endpoint para obter projetos
router.route('/')
  .get((req, res) => {
    res.status(200).json(projetos);
  })
  .post((req, res) => {
    let proxId = (1 + Math.max(...projetos.map(p => parseInt(p.id, 16)))).toString(16);
    let projeto = { ...req.body, id: proxId };
    projetos.push(projeto);

    res.status(200).json(projeto);
  });

router.route('/:id')
  .get((req, res) => {
    const projeto = projetos.find(p => p.id === req.params.id);
    if (projeto) {
      res.status(200).json(projeto);
    } else {
      res.status(404).json({ message: "Projeto não encontrado" });
    }
  })
  .delete((req, res) => {
    projetos = projetos.filter(p => p.id !== req.params.id);
    res.status(200).json(req.params.id);
  })
  .put((req, res) => {
    const index = projetos.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
      projetos[index] = { ...projetos[index], ...req.body }; // Atualiza o projeto com os novos dados
      res.status(200).json(projetos[index]);
    } else {
      res.status(404).json({ message: "Projeto não encontrado" });
    }
  });

module.exports = router;