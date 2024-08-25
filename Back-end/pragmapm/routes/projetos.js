const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const Projetos = require('../models/projetos');
const Categoria = require('../models/categorias');

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
    console.log("Requisição GET recebida");
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
  .post( (req, res, next) => {
    try {
        const categoria = Categoria.findById(req.body.categoria);
        if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }

        const projeto = new Projetos({
              method:"post",
            nome: req.body.nome,
            orcamento: req.body.orcamento,
            categoria: categoria._id,
            servicos: req.body.servicos || [],
        });

        const novoProjeto = projeto.save();
        res.status(200).json(novoProjeto);
    } catch (err) {
        next(err);
    }
});

router.route('/:id')
  .get((req, res) => {
    Projetos.findById(req.params.id)
      .then(projeto => {
        if (projeto) {
          res.status(200).json(projeto);
        } else {
          res.status(404).json({ message: "Projeto não encontrado" });
        }
      })
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .delete((req, res) => {
    Projetos.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json({ message: "Projeto deletado com sucesso" }))
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .put((req, res) => {
    Projetos.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(projeto => {
        if (projeto) {
          res.status(200).json(projeto);
        } else {
          res.status(404).json({ message: "Projeto não encontrado" });
        }
      })
      .catch(err => res.status(500).json({ message: err.message }));
  });


  // Rota para adicionar um serviço a um projeto
router.post('/:id/servicos', (req, res) => {
  const { id } = req.params;
  const servico = req.body;

  Projetos.findById(id)
    .then(projeto => {
      if (!projeto) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }

      
      // Verifica se o array `servicos` existe e inicializa se necessário
      if (!Array.isArray(projeto.servicos)) {
        projeto.servicos = [];
      } 

      // Adiciona o serviço ao projeto
      projeto.servicos.push(servico);
      projeto.custo += servico.custo; // Atualiza o custo total do projeto

      return projeto.save();
    })
    .then(projetoAtualizado => res.status(200).json(projetoAtualizado))
    .catch(err => res.status(500).json({ message: err.message }));
});

// Rota para editar um serviço existente
router.put('/:id/servicos/:servicoId', (req, res) => {
  const { id, servicoId } = req.params;
  const servicoAtualizado = req.body;

  Projetos.findById(id)
    .then(projeto => {
      if (!projeto) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }

      // Encontra o serviço pelo ID
      const servicoIndex = projeto.servicos.findIndex(serv => serv.id === servicoId);
      if (servicoIndex === -1) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }

      // Atualiza o serviço
      projeto.servicos[servicoIndex] = { ...projeto.servicos[servicoIndex], ...servicoAtualizado };

      // Atualiza o custo total do projeto
      projeto.custo = projeto.servicos.reduce((total, servico) => total + servico.custo, 0);

      return projeto.save();
    })
    .then(projetoAtualizado => res.status(200).json(projetoAtualizado))
    .catch(err => res.status(500).json({ message: err.message }));
});

// Rota para remover um serviço de um projeto
router.delete('/:id/servicos/:servicoId', (req, res) => {
  const { id, servicoId } = req.params;

  Projetos.findById(id)
    .then(projeto => {
      if (!projeto) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }

      // Filtra o serviço a ser removido
      const servicosAtualizados = projeto.servicos.filter(serv => serv.id !== servicoId);

      // Atualiza o projeto sem o serviço removido
      projeto.servicos = servicosAtualizados;

      // Recalcula o custo total do projeto
      projeto.custo = servicosAtualizados.reduce((total, servico) => total + servico.custo, 0);

      return projeto.save();
    })
    .then(projetoAtualizado => res.status(200).json(projetoAtualizado))
    .catch(err => res.status(500).json({ message: err.message }));
});



module.exports = router;
