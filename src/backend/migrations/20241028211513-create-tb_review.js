'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tb_review', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      estrelas: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 5
        }
      },
      comentario: {
        type: Sequelize.TEXT,
      },
      id_locacao: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('tb_review');
  }
};
