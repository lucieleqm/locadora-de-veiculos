//const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Cliente", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado_civil: {
      type: DataTypes.STRING,
    },
    profissao: {
      type: DataTypes.STRING,
    },
    rg: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    tableName: "tb_cliente"
  });

  Cliente.associate = (models) => {
    Cliente.hasOne(models.Blacklist);
    Cliente.hasOne(models.Endereco);
    Cliente.hasMany(models.Locacao);
  }

  return Cliente;
};
