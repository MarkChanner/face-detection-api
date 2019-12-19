# Face Detection API

This is an Express app which uses Clarifai's [Face Detection Model][clarifai] to return coordinate locations of faces that appear in a given image. The app is deployed to [Heroku][heroku] and uses the heroku-postgres service to persist registered users and the number of image entries each user has made. SQL Queries are made with the [Knex.js library][knex]. 

To use this API, please clone my [Face Detection Client][face-detection-client]. 

[face-detection-client]: https://github.com/MarkChanner/face-detection-client/blob/master/README.md
[heroku]: https://radiant-harbor-69550.herokuapp.com/ 
[clarifai]: https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection 
[knex]: http://knexjs.org/ 
