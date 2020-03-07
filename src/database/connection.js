'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cafe')
.then(() => {
    console.log("\x1b[32m", 'Database is connected');
})
.catch(err => console.log("\x1b[31m", err));

module.exports = mongoose;