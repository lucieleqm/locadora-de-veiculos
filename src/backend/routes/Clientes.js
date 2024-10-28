const express = require("express");
const router = express.Router();
const { Cliente, Endereco } = require("../models");

router.get("/select", (req, res) => {
    Cliente.findAll().then((clientes) => {
        res.send(clientes)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })

    
});
/*
router.get("/select", (req, res) => {
    Cliente.findAll({ where: { nome: "Ana" } }).then((clientes) => {
        res.send(clientes)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })

    //res.send("select");
});
/*
router.get("/insert", (req, res) => {
    //res.send("insert");
    Cliente.create({
        nome: "João da Silva",
        estado_civil: "Solteiro",
        profissao: "Engenheiro",
        rg: "123456789",
        cpf: "123.456.789-00",
        email: "joao@example.com",
        telefone: "1234567890",
        rua: "Rua Exemplo",
        numero: "123",
        bairro: "Centro",
        complemento: "Apto 101",
        cidade: "Cidade Exemplo",
        cep: "12345-678"
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});
*/



router.post("/insert", async (req, res) => {
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
        telefone: req.body.telefone
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
