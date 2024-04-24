const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const cloudDB = 'mongodb+srv://tolinelvin:elvintolin20@elvin20.uj50pg3.mongodb.net/?retryWrites=true&w=majority&appName=Elvin20';
const localDB = 'mongodb+srv://tolinelvin:elvintolin20@elvin20.uj50pg3.mongodb.net/?retryWrites=true&w=majority&appName=Elvin20';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose
  .connect(cloudDB || localDB)
  .then(()=> console.log('Connected to MongoDB'))
  .catch((error)=>console.error('Failed to connect to MongoDB'));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);