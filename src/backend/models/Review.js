module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estrelas: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    comentario: {
      type: DataTypes.TEXT,
    },
    id_locacao: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_locacao',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }
    }, {
    tableName: "tb_review"
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Locacao, { foreignKey: 'id_locacao' });
  }

  return Review;
}