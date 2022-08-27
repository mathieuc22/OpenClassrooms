const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');
const User = require('../models/user')

const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING
  },
})

// relation le post doit avoir un utilisateur du model Post
Comment.belongsTo(User, {
  as: 'author',
  type: Sequelize.UUID,
  allowNull: false,
  onDelete: 'cascade'
});

module.exports = Comment;