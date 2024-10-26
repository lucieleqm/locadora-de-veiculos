
module.exports = (sequelize, DataTypes) => {
  const Modelo = sequelize.define("Modelo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_marca: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_marca',
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }
    }, {
    tableName: "tb_modelo"
  });

  Modelo.associate = (models) => {
    Modelo.belongsTo(models.Marca, { foreignKey: 'id_marca' });
    Modelo.hasMany(models.Veiculo);
  }

  return Modelo;
};
