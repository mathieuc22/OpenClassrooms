const sequelize = require('../middleware/database')
const Comment = require('../models/comment')

// Create and Save a new comment
exports.create = (req, res) => {
  const commentObject = { ...req.body };
  Comment.create({
    ...commentObject
  })
    .then(comment => res.status(201).json({ comment: comment }))
    .catch(error => res.status(400).json({ error }));
};

// Retrieve all comments from the database.
exports.findAll = (req, res) => {
  Comment.findAll()
    .then(comments => res.status(200).json({ comments: comments }))
    .catch(error => res.status(400).json({ error }));
};
