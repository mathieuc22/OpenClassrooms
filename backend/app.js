const express = require('express');
const cors = require("cors");
require('dotenv').config();

// database
const sequelize = require('./middleware/database');

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error))

// sequelize.sync({ force: true }).then(() => {
//   console.log("Databse droppée et resynchronisée");
// });

sequelize.sync().then(() => {
  console.log("Databse synchronisée");
});

// routes
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;