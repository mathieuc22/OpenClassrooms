const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const hpp = require('hpp');
require('dotenv').config();

// Paramètres de la base de données
const sequelize = require('./middleware/database');

// Connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error))

// Sync à la base de données
sequelize.sync().then(() => {
  console.log("Databse synchronisée");
});

// routes
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

// Utilisation d'Helmet pour configurer de manière appropriée des en-têtes HTTP
app.use(helmet());

// Utilisation de Cors pour autoriser le front
const corsOptions = {
  origin: 'http://localhost:8080',
}
app.use(cors(corsOptions));

// Utilisation de hpp pour les HTTP Parameter Pollution attacks
// On n'utilise pas de paramètre, est-ce nécessaire ?
app.use(hpp());

// parse requests of content-type - application/json
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;