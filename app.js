const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser')

const keys = require('./config/keys')
const connectRoute = require('./routes/connection')
const pingRoute = require('./routes/pinging')
const userRoute = require('./routes/users')
const removeRoute = require('./routes/removeDevice')

const app = express();

mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())
app.set('trust proxy',true);

app.use('/api/app', connectRoute)
app.use('/api/app', pingRoute)
app.use('/api/app', userRoute)
app.use('/api/app', removeRoute)

module.exports = app;
