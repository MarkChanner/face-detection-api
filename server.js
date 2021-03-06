const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const keys = require('./config/keys');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    // host: keys.databaseURL,
    // user: '<YOUR LOCAL USER NAME>',
    // password: '',
    // database: '<YOUR LOCAL DATABASE NAME>',
    connectionString: keys.databaseURL,
    ssl: true
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('It is working..');
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
