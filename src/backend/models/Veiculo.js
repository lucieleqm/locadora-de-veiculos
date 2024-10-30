

module.exports = (sequelize, DataTypes) => {
  const Veiculo = sequelize.define("Veiculo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    renavam: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    chassi: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    motor: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    cor: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ano: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: 0
    },/*
    id_marca: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_marca',
        key: 'id'
      }
    },*/
    id_modelo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_modelo',
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    id_combustivel: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_combustivel',
        key: 'id'
      },

      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    }, {
    tableName: "tb_veiculo",
    timestamps: false
  });

  Veiculo.associate = (models) => {
    Veiculo.belongsTo(models.Modelo, { foreignKey: 'id_modelo' });
    Veiculo.belongsTo(models.Combustivel, { foreignKey: 'id_combustivel' });
    Veiculo.hasMany(models.Reparo, { foreignKey: 'id_veiculo' });
    Veiculo.hasMany(models.Locacao, { foreignKey: 'id_veiculo' });
    Veiculo.hasMany(models.ImagemVeiculo, { foreignKey: 'id_veiculo' });
  };

  return Veiculo;
};
