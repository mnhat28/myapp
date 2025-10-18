const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
  res.send("Hello from my distributed system, love you");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

