module.exports = (sequelize, DataTypes) => {
    const Cor = sequelize.define("Cor", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cor: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    }, {
      tableName: "tb_cor",
      timestamps: false
    });

    Cor.associate = (models) => {
      Cor.hasMany(models.Veiculo, { foreignKey: 'id_cor' });
    };
  
    return Cor;
  };
  