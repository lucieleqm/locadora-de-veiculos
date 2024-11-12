const express = require("express");
const router = express.Router();
const { Cliente, Endereco } = require("../models");

// Buscar Todos os Clientes
router.get("", (req, res) => {
    Cliente.findAll().then((clientes) => {
        res.send(clientes)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })   
});


// Buscar Cliente por Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const cliente = await Cliente.findOne({
        where: { id },
        include: [{
          model: Endereco,
        }]
      });
      if (!cliente) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(cliente);
  } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});


// Busca Cliente por meio do Cpf
// ex: "http://localhost:3001/clietes/000.000.000-00"
router.get('/buscar-cpf/:cpf', async (req, res) => {
    const { cpf } = req.params;
    try {
        const cliente = await Cliente.findOne({ where: { cpf } });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  });

// Rota de Cadastro de Cliente
router.post("/cadastrar", async (req, res) => {
    const t = await Cliente.sequelize.transaction();
  
    try {
      // Criar o cliente
      const novoCliente = await Cliente.create({
        nome: req.body.nome,
        estado_civil: req.body.estado_civil,
        profissao: req.body.profissao,
        rg: req.body.rg,
        cpf: req.body.cpf,
        email: req.body.email,
        telefone1: req.body.telefone1,
        telefone2: req.body.telefone2
      }, { transaction: t });
  
      // Criar o endereço associado ao cliente
      const novoEndereco = await Endereco.create({
        rua: req.body.rua,
        numero: req.body.numero,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        cidade: req.body.cidade,
        cep: req.body.cep,
        id_cliente: novoCliente.id
      }, { transaction: t });
  
      await t.commit();
  
      res.status(201).json({ 
        message: "Cliente e endereço cadastrados com sucesso!", 
        cliente: novoCliente, 
        endereco: novoEndereco 
      });
    } catch (err) {
      await t.rollback();
      console.error("Erro ao cadastrar cliente e endereço:", err);
      res.status(500).json({ message: "Erro ao cadastrar cliente e endereço.", error: err.message });
    }
  });

router.delete("/delete", (req, res) => {
    res.send("delete");
});

module.exports = router;
