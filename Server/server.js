const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const Hope =  require('./Routes/API/Hope');
const User =  require('./Routes/API/User');
require('../config/passport')(passport);

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json()); 
app.use(passport.initialize());

mongoose.connect('mongodb://127.0.0.1:27017/Hope', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use('/', Hope);
app.use('/add', Hope);
app.use('/users', User);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
