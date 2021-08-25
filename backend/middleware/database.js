const { Sequelize } = require('sequelize');

module.exports = new Sequelize('sqlite::memory:', {
  // Displays the first parameter of the log function call
  logging: console.log,
});
