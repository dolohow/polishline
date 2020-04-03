const express = require('express');
const path = require('path');
const rendertron = require('rendertron-middleware');

const app = express();

app.use(rendertron.makeMiddleware({
  proxyUrl: 'http://localhost:3000/render'
}));

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080, 'localhost');
