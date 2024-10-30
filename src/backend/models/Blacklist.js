module.exports = (sequelize, DataTypes) => {
  const Blacklist = sequelize.define("Blacklist", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_cliente',
        key: 'id'
      },

      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }
  }, {
    tableName: "tb_blacklist",
    timestamps: false
  });

  Blacklist.associate = (models) => {
    Blacklist.belongsTo(models.Cliente, { foreignKey: 'id_cliente' });
  };

  return Blacklist;
};
