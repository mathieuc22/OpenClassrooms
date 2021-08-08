const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json( sauce ))
    .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId.toString() === req.body.userId) {
        let sauceObject
        if (req.file) {
          sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
          // suppression du fichier précédent
          Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, (err) => {
                if (err) throw err;
              });
            })
            .catch(error => res.status(500).json({ error }));
        } else {
          sauceObject = { ...req.body }
        }
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      } else {
        res.status(403).json({ message: 'Modification non autorisée pour cet utilisateur'});
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    case 1:
      Sauce.updateOne({ _id: req.params.id }, { $push: { 'usersLiked': req.body.userId }, $inc: { 'likes': 1 } })
        .then(() => res.status(200).json({ message: 'Sauce likée'}))
        .catch(error => res.status(400).json({ error }));
      break;
    case -1:
      Sauce.updateOne({ _id: req.params.id }, { $push: { 'usersDisliked': req.body.userId }, $inc: { 'dislikes': 1 } })
        .then(() => res.status(200).json({ message: 'Sauce pas likée'}))
        .catch(error => res.status(400).json({ error }));
      break;
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1)
            sauce.likes = sauce.usersLiked.length
          } else {
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1)
            sauce.dislikes = sauce.usersDisliked.length
          }
          sauce.save()
          res.status(200).json({ message: 'Opinion modifiée !'});
        })
        .catch(error => res.status(500).json({ error }));
      break;
  }
  
  
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};