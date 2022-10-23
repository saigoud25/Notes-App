require("dotenv").config()

const express = require("express");
const note = require("./routes/note.js");
const user = require("./routes/user.js");
const mongoose = require('mongoose');

const app = express();

//Set up the MongoDB Server
mongoose.connect(process.env.mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("Connected to the Database...");
});

//Able to read the JSON data in the Body.
app.use(express.json());

app.use('/user', user);

//When the starting page hits.
app.use('/', note);

//App is listening on a port.
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port ${process.env.PORT}`);
});


