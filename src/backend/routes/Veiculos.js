const express = require("express");
const router = express.Router();
const multer = require('multer');
const { Veiculo, Modelo, ImagemVeiculo, TipoVeiculo, Combustivel, Cor, Marca, Sequelize } = require("../models");
const { ForeignKeyConstraintError } = Sequelize;
const upload = require('../config/multer');


router.get('', async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      include: [{ 
        model: Modelo, 
        attributes: ['nome'],
      include: [{
        model: Marca,
        attributes: ['nome']
      }] },
      { model: ImagemVeiculo, 
        attributes: ['url'] }
      ],
    });
    res.json(veiculos);
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    res.status(500).send('Erro ao buscar veículos');
  }
});

// Buscar Veiculo por Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const veiculo = await Veiculo.findOne({
      where: { id },
      include: [
        { model: ImagemVeiculo, attributes: ['id', 'url'] },
        { model: Cor, attributes: ['cor'] },
        { model: TipoVeiculo, attributes: ['tipo'] },
        { model: Combustivel, attributes: ['tipo'] },
        {
          model: Modelo, attributes: ['nome'],
          include: [{ model: Marca, attributes: ['nome'] }]
        }
      ]
    });
    if (!veiculo) {
      return res.status(404).json({ error: 'Veiculo não encontrado' });
    }
    res.json(veiculo);
  } catch (error) {
    console.error("Erro ao buscar veiculo:", error);
    res.status(500).json({ error: 'Erro ao buscar veiculo' });
  }
});


// Busca Veículo por meio da Placa
// ex: "http://localhost:3001/veiculos/ABC0D00"
router.get('/buscar-placa/:placa', async (req, res) => {
  const { placa } = req.params;
  try {
    const veiculo = await Veiculo.findOne({ where: { placa } });
    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    res.json(veiculo);
  } catch (error) {
    console.error("Erro ao buscar veículo:", error);
    res.status(500).json({ error: 'Erro ao buscar veículo' });
  }
});


// Rota para cadastro de um veículo
router.post('/insert', upload.array('imagens'), async (req, res) => {
  // transaction serve para garantir que todas as inserções sejam atômicas, 
  //ou seja,  (ou todas ocorrem, ou nenhuma ocorre, para garantir integridade)
  const t = await Veiculo.sequelize.transaction();
  const {
    id_tipo_veiculo,
    placa,
    renavam,
    chassi,
    motor,
    id_cor,
    ano,
    valor,
    disponibilidade,
    id_modelo,
    id_combustivel,
  } = req.body;

  try {
    const novoVeiculo = await Veiculo.create({
      id_tipo_veiculo,
      placa,
      renavam,
      chassi,
      motor,
      id_cor,
      ano,
      valor,
      disponibilidade,
      id_modelo,
      id_combustivel,
    }, { transaction: t });

    // Manipulação das imagens
    const imagens = req.files.map((file) => ({
      id_veiculo: novoVeiculo.id,
      url: `uploads/${file.filename}`
    }));

    // Cadastra Imagens
    await ImagemVeiculo.bulkCreate(imagens, { transaction: t });

    await t.commit();

    res.status(201).json({ mensagem: "Veículo e imagens cadastrados com sucesso!", veiculo: novoVeiculo });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao cadastrar veículo e imagens:", error);

    // Verifica se o erro é de violação de chave estrangeira
    if (error instanceof ForeignKeyConstraintError) {
      return res.status(400).json({ mensagem: "Modelo ou combustível não encontrado." });
    }

    res.status(500).json({ mensagem: "Erro ao cadastrar o veículo." });
  }
});
module.exports = router;