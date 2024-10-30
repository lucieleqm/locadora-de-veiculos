module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define("Marca", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    }, {
    tableName: "tb_marca",
    timestamps: false
  });

  Marca.associate = (models) => {
    Marca.hasMany(models.Modelo, {foreignKey: 'id_marca'});
  }

  return Marca;
};
