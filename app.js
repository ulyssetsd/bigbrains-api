const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const clarifaiRouter = require('./routes/clarifai');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/clarifai', clarifaiRouter);

module.exports = app;