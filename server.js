const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'markchanner',
    password: '',
    database: 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Error: User Not found');
      }
    });
});

app.put('/image', (req, res) => {
  const { id } = req.body;

  db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to submit entries'));
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
