module.exports = (sequelize, DataTypes) => {
  const ImagemVeiculo = sequelize.define("ImagemVeiculo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_veiculo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_veiculo',
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }
  }, {
      tableName: "tb_imgveiculo",
      timestamps: false
  });

  ImagemVeiculo.associate = (models) => {
    ImagemVeiculo.belongsTo(models.Veiculo, { foreignKey: 'id_veiculo' });
  };

  return ImagemVeiculo;
};
