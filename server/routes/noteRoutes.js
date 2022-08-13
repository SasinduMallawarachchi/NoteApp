const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware');

const {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById
} = require('../controllers/NoteController')

router.get('/', [auth], getNotes)

router.post('/', [auth], createNote)

router.put('/:id', [auth], updateNote);

router.delete('/:id', [auth], deleteNote)

router.get('/:id', [auth], getNoteById)

module.exports = router;