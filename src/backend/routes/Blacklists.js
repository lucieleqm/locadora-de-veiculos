const express = require("express");
const router = express.Router();
const { Blacklist } = require("../models");

// Rota para deletar um infrator
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Blacklist.destroy({ where: { id } });
  
      if (deleted) {
        return res.status(200).json({ message: "Infrator deletado com sucesso!" });
      } else {
        return res.status(404).json({ error: "Infrator não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao deletar infrator:", error);
      return res.status(500).json({ error: "Erro ao deletar infrator" });
    }
  });
  
// Buscar Todos os Itens da Blacklist
router.get("", (req, res) => {
    Blacklist.findAll({
    }).then((blacklists) => {
        res.send(blacklists)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});

//Cadastrar
router.post("/cadastrar", async (req, res) => {
    const t = await Blacklist.sequelize.transaction();

    const { cpf, nome, motivo } = req.body;
    console.log('Recebido no backend:', req.body);

    try {
        const novaBlacklist = await Blacklist.create({
            cpf,
            nome,
            motivo,
        }, { transaction: t });

        await t.commit();

        res.status(201).json(novaBlacklist);
    } catch (error) {
        await t.rollback();
        console.error('Erro ao criar blacklist:', error);
        res.status(500).json({ error: 'Erro ao criar blacklist' });
    }
});
module.exports = router;