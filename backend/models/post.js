const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');

const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
})

module.exports = Post;