const sequelize = require('../middleware/database')
const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

// Create and Save a new Posts
exports.create = (req, res) => {
  const postObject = { ...req.body };
  Post.create({
    ...postObject
  })
    .then(post => res.status(201).json({ post: post }))
    .catch(error => res.status(400).json({ error }));
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.findAll()
    .then(posts => res.status(200).json({ posts: posts }))
    .catch(error => res.status(400).json({ error }));
};

// Find a single Posts with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id, { include: [ Comment, { model: User,
    attributes: ['id'],
    through: {
      attributes: []
    } ,
    as: 'likes' } ] })
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
exports.update = (req, res) => {
  const id = req.params.id;
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
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Post.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ message: "Post was deleted successfully."});
      } else {
        res.status(400).json({ message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!` });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

// Comment a Post with the specified id in the request
exports.comment = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id)
  const commentObject = { ...req.body };
  post.createComment({
    ...commentObject
  })
    .then(comment => res.status(201).json({ comment: comment }))
    .catch(error => res.status(400).json({ error }));
};

// Update a Posts by the id in the request
exports.like = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id)
  const user = await User.findByPk(req.body.user)
  post.addLikes(user, { through: { selfGranted: false } })
    .then(post => res.status(200).json({ post: post }))
    .catch(error => res.status(404).json({ error }));
  };