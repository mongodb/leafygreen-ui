const express = require('express');

const app = express();
const port = 8080;

app.get('/hello', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
