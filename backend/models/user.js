const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String, 
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => Date.now(),
    }
});

const Note = mongoose.model('Note', NoteSchema);

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
    notes: [NoteSchema]
    //Have to add Array of Notes Collection
    
});

const User = mongoose.model('User', UserSchema);

module.exports = User;