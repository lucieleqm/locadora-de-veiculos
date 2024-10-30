'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tb_veiculo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipo: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      placa: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      renavam: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
      },
      chassi: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      motor: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      cor: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      ano: {
        type: Sequelize.STRING(4),
        allowNull: false
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      id_modelo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_modelo',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      id_combustivel: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_combustivel',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_veiculo');
  }
};
