const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'env/.env' });

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 