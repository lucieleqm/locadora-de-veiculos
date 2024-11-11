const express = require("express");
const router = express.Router();
const { Locacao, ImagemLocacao, Cliente, Veiculo, Modelo, Marca } = require("../models");
const upload = require('../config/multer');

// Buscar Todas as Locacoes
router.get("", (req, res) => {
    Locacao.findAll({
        include: [
            { model: Cliente, attributes: ['nome'] },
            {
                model: Veiculo, attributes: ['placa'],
                include: [
                    {
                        model: Modelo, attributes: ['nome'],
                        include: [
                            { model: Marca, attributes: ['nome'] }
                        ]
                    }
                ]
            },
        ]
    }).then((locacoes) => {
        res.send(locacoes)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});


// Buscar Locacao por Id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const locacao = await Locacao.findOne({
            where: { id },
            include: [{
                model: ImagemLocacao, attributes: ['id', 'url']
            }, {
                model: Cliente, attributes: ['nome', 'cpf', 'telefone1', 'telefone2']
            }, {
                model: Veiculo, attributes: ['placa'], include: [{
                    model: Modelo, attributes: ['nome'], include: [{
                        model: Marca, attributes: ['nome']
                    }]
                }]
            }]
        });
        if (!locacao) {
            return res.status(404).json({ error: 'Locação não encontrada' });
        }
        res.json(locacao);
    } catch (error) {
        console.error("Erro ao buscar locacao:", error);
        res.status(500).json({ error: 'Erro ao buscar locacao' });
    }
});


// Buscar Locacoes de um veiculo
router.get("/veiculo/:veiculoId", async (req, res) => {
    const veiculoId = Number(req.params.veiculoId);
    console.log('Recebido no backend:', veiculoId);
    Locacao.findAll({
        where: { id_veiculo: veiculoId },
        include: [{
            model: ImagemLocacao,
            attributes: ['id', 'url']
        }, {
            model: Cliente,
            attributes: ['nome', 'cpf', 'telefone1', 'telefone2']
        }, {
            model: Veiculo,
            attributes: ['placa'],
            include: [{
                model: Modelo,
                attributes: ['nome'],
                include: [{
                    model: Marca,
                    attributes: ['nome']
                }]
            }]
        }]
    }).then((locacoes) => {
        res.send(locacoes)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});


// Rota para Cadastrar a Locacao
router.post("/cadastrar", upload.array('imagens'), async (req, res) => {
    // transaction serve para garantir que todas as inserções sejam atômicas, 
    //ou seja,  (ou todas ocorrem, ou nenhuma ocorre, para garantir integridade)
    const t = await Locacao.sequelize.transaction();

    const { dt_inicio, dt_final, caucao, valor, km, id_veiculo, id_cliente } = req.body;
    console.log('Recebido no backend:', req.body);

    try {
        // Cria a Locacão
        const novaLocacao = await Locacao.create({
            dt_Inicio: dt_inicio,
            dt_Final: dt_final,
            caucao,
            valor,
            km,
            id_veiculo,
            id_cliente,
        }, { transaction: t });

        // Manipulação das imagens
        const imagens = req.files.map((file) => ({
            id_locacao: novaLocacao.id,
            url: `uploads/${file.filename}`
        }));

        //Cadastra várias imagens de uma vez
        await ImagemLocacao.bulkCreate(imagens, { transaction: t });

        await t.commit();

        res.status(201).json(novaLocacao);
    } catch (error) {
        // Reverte alteraçoes feitas na transação
        await t.rollback();
        console.error('Erro ao criar locação:', error);
        res.status(500).json({ error: 'Erro ao criar locação' });
    }
});


module.exports = router;
