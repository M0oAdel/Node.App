const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
const {Client} = require('pg')



//init app
const PORT = process.env.PORT || 3000;
const app = express();




//conect to redis
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis.....'));
redisClient.connect();










//connect to postgres
const POSTGRES_USER = 'example';
const POSTGRES_PASSWORD = 'example';
const POSTGRES_PORT = '5432';
const POSTGRES_HOST = 'postgres';

const URI = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}`;
const client = new Client({
  connectionString: URI,
});
client.connect()
  .then(() => console.log('Connected to Postgres.....'))
  .catch((err) => console.error('Error connecting to Postgres.....  ', err)); 














//connect to mongodb
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '27017';
// const DB_HOST = 'mongo';  


// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// mongoose
//   .connect(URI)
//   .then(() => console.log('Connected to DB.....'))
//   .catch((err) => console.error('Error connecting to DB.....  ', err));


app.get('/',(req, res) => {
  redisClient.set('product', 'product...');
  res.send('<h1> Hello Tresmerge!!  ^--^  -_- </h1>');
});

app.get('/data', async (req, res) => {
  const product = await redisClient.get('product');
  res.send(`<h1> Hello Tresmerge!!</h1> <h2>${product}</h2>`);
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});