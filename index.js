require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Home = require('./Router/Home')

/* Initializes express app */
const app = express();
app.use(express.json({}))

const DEFAULT_PORT = 2850;

/* Listen to server */
const server = app.listen(process.env.PORT || DEFAULT_PORT, () => {
    const port = server.address().port;
    console.log(`Server running at ${port}`)
})

/* Mongooose Connect */
mongoose.set('strictQuery', false)
mongoose.connect(process.env.connection)
    .then(() => {
        console.log('Connection')
    })
    .catch(() => {
        console.log('Failed')
    })

/* Cors */
app.use(cors())

/* Routes */
app.use('/', Home)