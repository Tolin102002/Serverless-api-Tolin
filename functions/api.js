const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const cloudDB = 'mongodb+srv://tolinvin:O4HhHtQ4U3VDJPT@cluster1.wnwzcvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluste';
const localDB = 'mongodb://localhost:27017/serverless-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose
  .connect(cloudDB || localDB)
  .then(()=> console.log('Connected to MongoDB'))
  .catch((error)=>console.error('Failed to connect to MongoDB'));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);