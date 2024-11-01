'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tb_locacao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dt_Inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dt_Final: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_veiculo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_veiculo',
          key: 'id'
        }
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_cliente',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_locacao');
  }
};
