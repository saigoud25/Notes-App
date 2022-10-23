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

module.exports = Note;

modelu.exports = null;