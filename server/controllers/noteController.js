const Note = require('../models/Note');
const colors = require('colors');


// @desc    Get all Notes by user id
// @route   '/api/Notes
// @access  Private
const getNotes = async (req, res) => {
    try {
        const Notes = await Note.find({ user: req.user.id });
        res.json(Notes);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const getNoteById = async (req, res) => {
    try {
        const Note = await Note.findOne({ _id: req.params.id, user: req.user.id });

        if(!Note) return res.status(404).json([
            {
                message: 'Note not found',
                type: 'error'
            }
        ])
        res.json(Note);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const NewNote = new Note({
            title,
            content,
            user: req.user.id
        });
        
        await NewNote.save();

        if(!NewNote) return res.status(400).json([{ message: 'Note not created', type: 'error' }]);

        res.json(NewNote);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const Note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { title, content }, { new: true });
        res.json(Note);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const deleteNote = async (req, res) => {
    try {
        const Note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({
            NoteId: req.params.id,
            toasts: [{ message: 'Note deleted', type: 'success' }]
        });
    } catch (error) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    deleteNote,
    updateNote,
    createNote,
    getNotes,
    getNoteById
}