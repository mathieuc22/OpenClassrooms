const express = require('express');
const cors = require("cors");
require('dotenv').config();

// routes
const postRoutes = require('./routes/post');
// const userRoutes = require('./routes/user');

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use('/api/posts', postRoutes);
//app.use('/api/auth', userRoutes);

module.exports = app;