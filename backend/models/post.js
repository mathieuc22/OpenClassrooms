const Sequelize = require('sequelize');
const sequelize = require('../middleware/database');
const User = require('../models/user')
const Comment = require('../models/comment')

const Post = sequelize.define('post', {
  channel: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  },
})

// relation un post a plusieurs commentaires, un commentaire a un post
Post.hasMany(Comment);
Comment.belongsTo(Post);

// relation le post doit avoir un utilisateur du model Post
Post.belongsTo(User, {
  foreignKey: {
    name: 'author',
    type: Sequelize.UUID,
    allowNull: false
  }
});

// relation le post stocke un tableau utilisateurs dans la colonne like
Post.belongsToMany(User, {
  through: 'post_user',
  type: Sequelize.UUID,
  as: 'likes'
});
// User.belongsToMany(Post, {
//   through: 'post_user'
// });

module.exports = Post;