const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const Projetos = require('../models/projetos');

router.use(cors());
router.use(bodyParser.json());

let projetos = [
  {
    id: "81d7",
    nome: "PSW",
    orcamento: "5000",
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
  .get((req, res, next) => {
    Projetos.find({})
      .then((projetosBanco) => {
        if (projetosBanco.length > 0) {
          res.status(200).json(projetosBanco);
        } else {
          res.status(200).json(projetos); // Retornar projetos locais se banco de dados estiver vazio
        }
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Projetos.create(req.body)
      .then((projeto) => {
        console.log('Projeto criado ', projeto);
        res.status(200).json(projeto); 
      })
      .catch((err) => next(err));
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
