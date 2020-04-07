const Sequilize = require('sequelize');

const db = new Sequilize('UpTaskNode', 'root', 'JulieKennedy', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  operatorAliases: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;