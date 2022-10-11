const express = require('express');
const helmet = require("helmet");
const app = express();
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
const mongoose = require('mongoose');
const path = require('path');
const bodyparser = require('body-parser');
require('dotenv').config();
mongoose.connect(process.env.MONGO_DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;