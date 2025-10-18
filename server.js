const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MyApp - Distributed System</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #007bff, #00c6ff);
          color: white;
          text-align: center;
        }
        h1 {
          font-size: 2.5em;
          margin-bottom: 0.2em;
        }
        p {
          font-size: 1.2em;
          margin-bottom: 2em;
        }
        button {
          background: white;
          color: #007bff;
          border: none;
          padding: 12px 25px;
          font-size: 1em;
          border-radius: 25px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          background: #007bff;
          color: white;
          transform: scale(1.05);
        }
        footer {
          position: absolute;
          bottom: 10px;
          font-size: 0.9em;
          opacity: 0.8;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Welcome to My Distributed System</h1>
      <p>Hello from my distributed system, love you ❤️</p>
      <button onclick="alert('Thank you for visiting!')">Say Hi 👋</button>
      <footer>Running on port ${PORT}</footer>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

