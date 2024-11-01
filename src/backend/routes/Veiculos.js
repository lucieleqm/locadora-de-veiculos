const express = require("express");
const router = express.Router();
const multer = require('multer');
const { Veiculo, Modelo, ImagemVeiculo, Sequelize } = require("../models");
const { ForeignKeyConstraintError } = Sequelize;

//const storage = multer.memoryStorage(); const upload = multer({ storage: storage})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });


router.get('/select', async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      include: [{ model: Modelo, attributes: ['nome']},
      { model: ImagemVeiculo, attributes: ['url'] }
      ],
    });
    res.json(veiculos);
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    res.status(500).send('Erro ao buscar veículos');
  }
});
/*
router.get("/insert", (req, res) => {
    //res.send("insert");
    Veiculo.create({
        tipo: "Moto",
        placa: "ABC1A24",
        renavam: "Engenheiro",
        chassi: "9BD111060T5002156",
        motor: "200 cc",
        cor: "Preta",
        ano: "2020",
        valor: "100",
        status: "123",
        id_modelo: 2766,
        id_combustivel: 1,
        imagem: "https://image1.mobiauto.com.br/images/api/images/v1.0/388675756/transform/fl_progressive,f_webp,q_70,w_600"
        
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});
*/

// Rota para cadastro de um veículo

router.post('/insert', upload.array('imagens'), async (req, res) => {
  const t = await Veiculo.sequelize.transaction();
  const {
    id_tipo_veiculo,
    placa,
    renavam,
    chassi,
    motor,
    km,
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
      km,
      id_cor,
      ano,
      valor,
      disponibilidade,
      id_modelo,
      id_combustivel,
    }, { transaction: t });

    // Manipulação das imagens
    //const imagens = req.files.map((file) => ({ id_veiculo: novoVeiculo.id, url: file.buffer}))
    const imagens = req.files.map((file) => ({
      id_veiculo: novoVeiculo.id,
      url: `uploads/${file.filename}`/*`data:image/jpeg;base64,${file.buffer.toString('base64')}`*/, // Armazena a imagem em base64 para exibição
    }));

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