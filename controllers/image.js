const Clarifai = require('clarifai');
const keys = require('../config/keys');

const app = new Clarifai.App({
  apiKey: keys.clarifaiAPI
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to submit entries'));
};

module.exports = {
  handleImage,
  handleApiCall
};
