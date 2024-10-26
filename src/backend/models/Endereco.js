module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define("Endereco", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rua: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complemento: {
            type: DataTypes.STRING,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tb_cliente',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }

    }, {
        tableName: "tb_endereco"
    });

    Endereco.associate = (models) => {
        Endereco.belongsTo(models.Cliente, { foreignKey: 'id_cliente'});
    }

    return Endereco;
}