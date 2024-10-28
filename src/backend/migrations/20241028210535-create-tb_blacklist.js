'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_blacklist', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      motivo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_cliente',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_blacklist');
  }
};
