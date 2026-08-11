const express = require('express');
const mongoose = require('mongoose');

//init app
const PORT = process.env.PORT || 3000;
const app = express();

//connect to mongodb
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '27017';
const DB_HOST = 'mongo';  


const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URI)
  .then(() => console.log('Connected to DB.....'))
  .catch((err) => console.error('Error connecting to DB.....  ', err));


app.get('/', (req, res) => {
  res.send('<h1> Hello, World ^--^  -_- </h1>');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});