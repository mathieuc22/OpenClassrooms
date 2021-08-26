const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');
const Comment = require('../models/comment')

const Post = sequelize.define('post', {
  author: {
    type: Sequelize.STRING
  },
  channel: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  like: {
    type: Sequelize.STRING
  },
})

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = Post;