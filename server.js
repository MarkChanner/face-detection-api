const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'Mark',
      email: 'mark@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'mark@gmail.com'
    }
  ]
};

app.get('/', (req, res) => {
  res.json(database.users);
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error loggin in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const user = database.users.find(user => user.id === id);
  if (!user) {
    res.status(404).json('no user with that id');
  }
  res.json(user);
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  const user = database.users.find(user => user.id === id);
  if (!user) {
    res.status(404).json('no user with that id');
  }
  user.entries++;
  res.json(user.entries);
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
