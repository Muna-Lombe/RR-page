import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'babel-polyfill';

import Watchlist from './src/controllers//Watchlist'
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())


app.get('/api/v1/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})
app.post('/api/v1/watchlists', Watchlist.create);
app.get('/api/v1/watchlists', Watchlist.getAll);
app.get('/api/v1/watchlists/:id', Watchlist.getOne);
app.put('/api/v1/watchlists/updates', Watchlist.update);
app.delete('/api/v1/watchlists/:id', Watchlist.delete);


app.listen(5000)
console.log('app running on port ', 5000);