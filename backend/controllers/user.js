const User = require('../models/user');
const jwt = require('jsonwebtoken');
// Utilisation de bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
// Utilisation de cryptojs pour crypter l'adresse email
const SHA256 = require("crypto-js/sha256");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.create({
          email: SHA256(req.body.email).toString(),
          password: hash,
          username: req.body.username,
          moderator: req.body.moderator
        })
          .then(user => res.status(201).json({ message: 'Utilisateur créé !', uuid: user.id }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
  User.findOne({ where: { email: SHA256(req.body.email).toString() } })
    .then(user => {
      if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            userName: user.username,
            moderator: user.moderator,
            token: jwt.sign(
            { userId: user.id },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then(users => res.status(200).json({ users: users }))
    .catch(error => res.status(400).json({ error }));
};

// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  if (req.user.id != id && !req.user.moderator) {
    res.status(403).json({ message: 'Modification non autorisée pour cet utilisateur'});
  } else {
    User.destroy({ where: { id: id } })
      .then(num => {
        if (num == 1) {
          res.status(200).json({ message: `L'utilisateur id=${id} a été supprimé`});
        } else {
          res.status(400).json({ message: `Suppression l'utilisateur id=${id} impossible` });
        }
      })
      .catch(error => res.status(500).json({ error }));
  }
};