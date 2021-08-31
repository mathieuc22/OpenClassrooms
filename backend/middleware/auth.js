const jwt = require('jsonwebtoken');

const User = require('../models/user')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    const user = await User.findByPk(userId);
    if (user){
      req.user = user;
      next();
    } else {
      res.status(403).json({
        message: "Votre profil n'existe pas ou a été supprimé"
      });
    }
  } catch {
    res.status(401).json({
      message: "Vous n'êtes pas connecté"
    });
  }
};