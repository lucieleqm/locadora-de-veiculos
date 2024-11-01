'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tb_img_locacao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      id_locacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_locacao',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }   
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_img_locacao');
  }
};
