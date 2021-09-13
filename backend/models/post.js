const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');
const User = require('../models/user')
const Comment = require('../models/comment')

const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  },
})

// relation un post a plusieurs commentaires, un commentaire a un post
Post.hasMany(Comment, {
  onDelete: 'cascade'
});
Comment.belongsTo(Post);

// relation le post doit avoir un utilisateur du model Post
Post.belongsTo(User, {
  as: 'author',
  type: Sequelize.UUID,
  allowNull: false,
  onDelete: 'cascade'
});

// relation le post stocke un tableau utilisateurs dans la colonne like
Post.belongsToMany(User, {
  through: 'post_user',
  type: Sequelize.UUID,
  as: 'likes'
});

module.exports = Post;