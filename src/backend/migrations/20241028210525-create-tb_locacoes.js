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
      hora_Inicio: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      hora_Final: {
        type: Sequelize.TIME,
        allowNull: true,
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_locacao');
  }
};
