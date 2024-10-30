'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tb_imgveiculo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      id_veiculo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_veiculo',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }  
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_imgveiculo');
  }
};
