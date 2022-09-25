const express = require("express");
const Note = require("../models/note.js");
const routes = express.Router();

//On Get Request.
routes.get('/', async (req, res) => {
    try {
        //Fetches the All the Documents from the Collection (Note).
        const data = await Note.find();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});

//On Post Request.
routes.post('/', async (req, res) => {
    try {
        console.log(req.body);
        //Create a new Note using given Body, Here ID is provided by the MongoDB by default.
        const note = new Note({title: req.body.title, message: req.body.message, date: new Date().toISOString()});
        //Saves the Document(note) in the Collection.
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});

//On Put Request.
routes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        //From the body read the updated Title & Message.
        const newTitle = req.body.title;
        const newMessage = req.body.title;

        //Find the Document by ID, update the title with newTitle and message with newMessage.
        await Note.findByIdAndUpdate(id, {title: newTitle, message: newMessage});

        //Sending the Updated Document to the client.
        const note = await Note.findById(id);
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

//On Delete Request.
routes.delete('/:id', async (req, res) => {
    try {
        //Get the ID from the parameters provided in the URL
        const {id} = req.params;

        //Find the Document by ID and Delete it.
        const data = await Note.findByIdAndDelete(id);

        res.status(200).json({ data,  message: 'Note Deleted Sucessfully..'});
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});

module.exports = routes;