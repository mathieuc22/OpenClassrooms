const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');

const Comment = sequelize.define('comment', {
  author: {
    type: Sequelize.STRING
  },
  parent_comment: {
    type: Sequelize.STRING
  },
  like: {
    type: Sequelize.STRING
  },
})

module.exports = Comment;