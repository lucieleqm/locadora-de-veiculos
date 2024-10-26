const { ForeignKeyConstraintError } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Veiculo = sequelize.define("Veiculo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    renavam: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    chassi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    motor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ano: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    }
    }, {
    tableName: "tb_veiculo"
  });

  Veiculo.associate = (models) => {
    Veiculo.belongsTo(models.Modelo, { foreignKey: 'id_modelo' });
    Veiculo.belongsTo(models.Combustivel, { foreignKey: 'id_combustivel' });
    Veiculo.hasMany(models.Locacao);
  };

  return Veiculo;
};
