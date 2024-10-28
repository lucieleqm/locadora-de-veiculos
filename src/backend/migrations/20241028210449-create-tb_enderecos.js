'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tb_endereco', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rua: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      numero: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      bairro: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      complemento: {
        type: Sequelize.STRING(50),
      },
      cidade: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_cliente',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_endereco');
  }
};
