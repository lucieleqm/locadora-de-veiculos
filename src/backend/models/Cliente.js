//const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Cliente", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    estado_civil: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    profissao: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    rg: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    telefone1: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    telefone2: {
      type: DataTypes.STRING(15),
      allowNull: true
    }

  }, {
    tableName: "tb_cliente",
    timestamps: true
  });

  Cliente.associate = (models) => {
    Cliente.hasOne(models.Endereco, { foreignKey: 'id_cliente' });
    Cliente.hasMany(models.Locacao, { foreignKey: 'id_cliente' });
  }

  return Cliente;
};
