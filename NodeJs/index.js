const express = require('express');
const router = require('./Controller/usersController.js');
const dbContext = require('./Model/db.js');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => { console.log('Server started at port: 8080');});