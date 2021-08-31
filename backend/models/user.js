const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  moderator: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
})

module.exports = User;