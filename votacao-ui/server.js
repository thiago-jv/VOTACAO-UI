const express = require('express');
const app = express();
const projectName = 'votacao-ui'

app.use(express.static(__dirname + '/dist/' + projectName));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/' + projectName + '/index.html');
});

app.listen(4200);