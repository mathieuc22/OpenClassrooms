const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

// Correction suite aux Deprecation Warnings https://mongoosejs.com/docs/deprecations.html#-ensureindex-
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connexion à la base de données
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Utilisation d'Helmet pour configurer de manière appropriée des en-têtes HTTP
app.use(helmet());

// Utilisation de Cors pour autoriser le front
const corsOptions = {
  origin: 'http://localhost:8081',
  methods: 'GET,PUT,POST,DELETE',
}
app.use(cors(corsOptions));

// Utilisation de hpp pour les HTTP Parameter Pollution attacks
// On n'utilise pas de paramètre, est-ce nécessaire ?
app.use(hpp());

// Utilisation de express-rate-limit pour limiter les attaques brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(express.json());

// Validation des entrées pour éviter les attaques Injection
app.use(mongoSanitize());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', authLimiter,userRoutes);

module.exports = app;