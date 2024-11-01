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
    },
    profissao: {
      type: DataTypes.STRING(150),
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
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: false
    }

  }, {
    tableName: "tb_cliente",
    timestamps: true
  });

  Cliente.associate = (models) => {
    Cliente.hasOne(models.Blacklist, { foreignKey: 'id_cliente' });
    Cliente.hasOne(models.Endereco, { foreignKey: 'id_cliente' });
    Cliente.hasMany(models.Locacao, { foreignKey: 'id_cliente' });
  }

  return Cliente;
};
