const express = require("express");
const User = require("../models/user.js");
const router = express.Router();

//Get all Notes from a User
router.get('/:id', async (req, res) => {
    try {
        const { id }= req.params;
        const user = await User.findById(id);
        // console.log(user.notes);

        res.json(user.notes);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}); 


//Insert a Note
router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        var user = await User.findById(id);

        user.notes.push({title: req.body.title, message: req.body.message, date: new Date().toISOString()});

        user.save();        
        res.json({notes: user.notes, message: "Note Created Successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});


//On Put Request.
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        //From the body read the updated Title & Message.
        const noteID = req.body.noteID;
        const newTitle = req.body.title;
        const newMessage = req.body.message;

        const user = await User.findById(id);
        
        const arr = user.notes;
        var flag = true;
        for(var i = 0; i<arr.length; i++) {
            const note = arr[i];

            if(note._id == noteID) {
                note.title = newTitle;
                note.message = newMessage;
                flag = false;
                break;
            } 
        }

        if(flag) {
            res.status(400).json({ message: "Note not Found" });
            return;
        }

        user.save();
        res.status(200).json({ notes: user.notes, message: "Note Successfully Updated"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

//On Delete Request.
router.delete('/:id', async (req, res) => {
    try {
        //Get the ID from the parameters provided in the URL
        const {id} = req.params;
        const noteID = req.body.noteID;

        const user = await User.findById(id);

        const arr = user.notes;
        var flag = true;

        for(var i = 0; i<arr.length; i++) {
            const note = arr[i];

            if(note._id == noteID) {
                user.notes.splice(i, 1);
                flag = false;
                break;
            }
        }

        if(flag) {
            res.status(400).json({ message: "Note not Found" });
            return;
        }

        user.save();

        res.status(200).json({ notes: user.notes,  message: 'Note Deleted Sucessfully..'});
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
