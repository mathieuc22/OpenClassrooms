const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
})

module.exports = User;