const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
  res.send("Hello from my distributed system, my name is Tran Minh Nhat, helo helo helo!");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

