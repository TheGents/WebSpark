// import Axios from 'axios';

const dotenv = require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');



const app = express();
app.use(json());
app.use(cors());

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static('./public'));



const connectionString = process.env.DATABASE_URL; //Connects to heroku bro
massive(connectionString).then(db => app.set('db', db));



app.listen(process.env.PORT, () => { console.log(`Listening on port: ${process.env.PORT}`)});