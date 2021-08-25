const sequelize = require('../middleware/database')
const Post = require('../models/post')

// Create and Save a new Posts
exports.create = (req, res) => {
  console.log(req.body)
  const postObject = { ...req.body };
  console.log(postObject)
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
  Post.findByPk(id)
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
  Post.update(req.body, { where: { id: id } })
    .then((num, post) => {
      if (num == 1) {
        res.status(200).json({ message: post });
      } else {
        res.status(400).json({ message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!` });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

// Delete a Posts with the specified id in the request
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