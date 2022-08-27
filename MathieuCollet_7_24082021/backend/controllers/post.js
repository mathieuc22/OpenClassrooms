const sequelize = require('../middleware/database')

const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

// Create and Save a new Posts
exports.create = (req, res) => {
  Post.create({
    ...req.body,
    authorId: req.user.id
  })
    .then(post => res.status(201).json({ post: post }))
    .catch(error => res.status(400).json({ error }));
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.findAll({ 
    include: [
      {
        model: User,
        attributes: ['username'],
        as: 'author'
      },
      {
        model: User,
        attributes: ['id'],
        through: {
          attributes: []
        },
        as: 'likes' }],
    order: [['createdAt','DESC',]],
  })
  .then(posts => res.status(200).json({ posts: posts }))
  .catch(error => res.status(400).json({ error }));
};

// Find a single Posts with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id, { 
    include: [ 
      { model: Comment,
        include: {
          model: User,
          attributes: ['username'],
          as: 'author'
        },
      },
      { model: User,
        attributes: ['id'],
        through: {
          attributes: []
        },
        as: 'likes'
      },
      { model: User,
      attributes: ['username'],
      as: 'author'
      }
    ],
    order: [[ {model: Comment}, 'createdAt','DESC',]],
    })
    .then(post => {
      if (post) {
        res.status(200).json({ post: post })
      } else {
        res.status(404).json({ message: `Aucun post avec l'id ${id} n'a été trouvé` })
      }
    })
    .catch(error => res.status(404).json({ error }));
};

// Update a Posts by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id)
  // test si l'élément avec l'id est présent en base 
  if (post) {
    if (req.user.id != post.authorId && !req.user.moderator) {
      res.status(403).json({ message: 'Modification non autorisée pour cet utilisateur'});
    } else {
      Post.update(req.body, { where: { id: id }
      // pour postgresql  returning: true,
      })
        .then((num, post) => {
          if (num == 1) {
            console.log(post)
            res.status(200).json({ message: post });
          } else {
            res.status(400).json({ message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!` });
          }
        })
        .catch(error => res.status(500).json({ error }));
    }
  } else {
    res.status(400).json({ message: `Publication id=${id} non trouvée` });
  }
};

// Delete a Post with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id)
  // test si l'élément avec l'id est présent en base 
  if (post) {
    if (req.user.id != post.authorId && !req.user.moderator) {
      res.status(403).json({ message: 'Modification non autorisée pour cet utilisateur'});
    } else {
      Post.destroy({ where: { id: id } })
        .then(num => {
          if (num == 1) {
            res.status(200).json({ message: `Le post id=${id} a été supprimé`});
          } else {
            res.status(400).json({ message: `Suppression du post id=${id} impossible` });
          }
        })
        .catch(error => res.status(500).json({ error }));
    }
  } else {
    res.status(400).json({ message: `Publication id=${id} non trouvée` });
  }
};

// Delete a Comment with the specified id in the request
exports.deleteComment = async (req, res) => {
  const id = req.params.id;
  const comment = await Comment.findByPk(id);
  // test si l'élément avec l'id est présent en base 
  if (comment) {
    if (req.user.id != comment.authorId && !req.user.moderator) {
      res.status(403).json({ message: 'Modification non autorisée pour cet utilisateur'});
    } else {
      Comment.destroy({ where: { id: id } })
        .then(num => {
          if (num == 1) {
            res.status(200).json({ message: `Le commentaire id=${id} a été supprimé`});
          } else {
            res.status(400).json({ message: `Suppression du commentaire id=${id} impossible` });
          }
        })
        .catch(error => res.status(500).json({ error }));
    }
  } else {
    res.status(400).json({ message: `Commentaire id=${id} non trouvée` });
  }
};

// Comment a Post with the specified id in the request
exports.comment = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id)
  // test si l'élément avec l'id est présent en base 
  if (post) {
    post.createComment({
      text: req.body.text,
      authorId: req.user.id
    })
      .then(comment => res.status(201).json({ comment: comment }))
      .catch(error => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: `Publication id=${id} non trouvée` });
  }
};

// Add like by the id in the request
exports.like = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id)
  // test si l'élément avec l'id est présent en base 
  if (post) {
    const likes = await post.getLikes({where: {
      id: req.user.id,
    }})
    if (!likes.length) {
      post.addLikes(req.user.id, { through: { selfGranted: false } })
        .then(() => res.status(200).json({ message: `Like ajouté pour l'utilisateur ${req.user.id}`, like: true }))
        .catch(error => res.status(404).json({ error }));
    } else {
      post.removeLikes(req.user.id, { through: { selfGranted: false } })
        .then(() => res.status(200).json({ message: `Like enlevé pour l'utilisateur ${req.user.id}`, like: false }))
        .catch(error => res.status(404).json({ error }));
    }
  } else {
    res.status(400).json({ message: `Publication id=${id} non trouvée` });
  }
};
