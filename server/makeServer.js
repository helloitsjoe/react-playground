const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const ip = require('ip');

const app = express();
const server = require('http').Server(app);


const makeServer = (port = 3000) => {
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '..')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.get('/snake', (req, res) => {
    res.sendFile(path.join(__dirname, '../snake/index.html'));
  });

  server.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    console.log(`listening at http://${ip.address()}:${port}`);
  })

  return server;
}

module.exports = makeServer;
