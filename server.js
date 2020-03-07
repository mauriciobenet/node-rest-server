require('./src/config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// body parser settings
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use significa middleware

// Routes
// para evitar importar las rutas una por una, se puede hacer un index.js
// app.use(require('./routes/user'));
// app.use(require('./routes/login'));
app.use(require('./src/routes/index'));

mongoose.connect(process.env.URLDB,
                {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
                (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});


app.listen(process.env.PORT, () => console.log(`Server ready: http://localhost:${process.env.PORT}`));