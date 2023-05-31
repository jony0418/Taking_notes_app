// const fs = require("fs");
// const { v4: uuidv4 } = require('uuid');

// module.exports = (app) => {
//   app.get("/api/notes", function(req, res) {
//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//       if (err) throw err;
//       res.json(JSON.parse(data));
//     });
//   });

//   app.post("/api/notes", function(req, res) {
//     const newNote = req.body;
//     newNote.id = uuidv4();
//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//       if (err) throw err;
//       const notes = JSON.parse(data);
//       notes.push(newNote);
//       fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
//         if (err) throw err;
//         res.json(newNote);
//       });
//     });
//   });

//   app.delete("/api/notes/:id", function(req, res) {
//     const id = req.params.id;
//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//       if (err) throw err;
//       let notes = JSON.parse(data);
//       notes = notes.filter((note) => note.id !== id);
//       fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
//         if (err) throw err;
//         res.json({ message: "Note deleted" });
//       });
//     });
//   });
// };


const fs = require("fs");

const generateUniqueId = require("generate-unique-id");

const editNote = (updatedNotesArray) => {
  fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
    if (err) throw err;
  });
};
// Dependencies
const fs = require('fs');
const uuid = require('uuid');

const updateNotes = (notes) => {
    fs.writeFile('./db/notes.json', JSON.stringify(notes), err => {
        if (err) throw err;
    });
};

module.exports = app => {
    // Get all notes
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });

    // Add a new note
    app.post('/api/notes', (req, res) => {
        const note = req.body;
        note.id = uuid.v4();

        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            notes.push(note);
            updateNotes(notes);
            res.json(note);
        });
    });

    // Delete a note
    app.delete('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;

        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            notes = notes.filter(note => note.id !== noteId);
            updateNotes(notes);
            res.json({ message: `Note ${noteId} has been deleted` });
        });
    });

    // Update a note
    app.put('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;

        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            const noteIndex = notes.findIndex(note => note.id === noteId);

            if (noteIndex !== -1) {
                const updatedNote = {
                    ...notes[noteIndex],
                    title: req.body.title,
                    text: req.body.text
                };
                notes[noteIndex] = updatedNote;
                updateNotes(notes);
                res.json(updatedNote);
            } else {
                res.status(404).json({ message: 'Note not found' });
            }
        });
    });
};
