const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(res);
})

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});