const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts/posts')

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', false);

const corsConfig = {
    "origin": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

// app.use(cors(corsConfig));

// app.set(corsConfig)


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.use('/posts', postsRouter);

async function connect() {
    try {
        await mongoose.connect(uri, {useNewUrlParser: true});
        console.log('Connected to the database');
    }catch (e) {
        console.log(e);
    }
}

connect();

app.listen(port, () => console.log(`server started on port ${port}`)) 