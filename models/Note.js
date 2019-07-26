const mongoose = require("mongoose");

// check hw requirements
const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true,
        unique: true
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;