const express = require('express');

const app = express();
const port = 8080;

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
