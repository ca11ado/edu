// server.js
const express = require('express');
const path = require('path');
const app = express();
const api = require('./api-middleware');
const cors = require('./cors-middleware');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors);
app.use('/api', api);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT);
});
