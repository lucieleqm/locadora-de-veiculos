module.exports = (sequelize, DataTypes) => {
  const Combustivel = sequelize.define("Combustivel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    }, {
    tableName: "tb_combustivel",
    timestamps: false
  });

  Combustivel.associate = (models) => {
    Combustivel.hasMany(models.Veiculo, {foreignKey: 'id_combustivel'});
  };

  return Combustivel;
};
