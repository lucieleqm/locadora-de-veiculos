module.exports = (sequelize, DataTypes) => {
  const Locacao = sequelize.define("Locacao", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dt_Inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dt_Final: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_veiculo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_veiculo',
        key: 'id'
      }
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_cliente',
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }
    }, {
    tableName: "tb_locacao",
    timestamps: true
  });

  Locacao.associate = (models) => {
    Locacao.belongsTo(models.Veiculo, { foreignKey: 'id_veiculo' });
    Locacao.belongsTo(models.Cliente, { foreignKey: 'id_cliente' });
    Locacao.hasOne(models.Review, { foreignKey: 'id_locacao' });
    Locacao.hasMany(models.ImagemLocacao, { foreignKey: 'id_locacao' });
  }

  return Locacao;
};
