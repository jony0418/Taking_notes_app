const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs for notes

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET route for returning notes
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST route for saving notes
app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  newNote.id = uuidv4(); // Assign a unique id to the note

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// DELETE route for deleting notes
app.delete("/api/notes/:id", function(req, res) {
  const id = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== id);
    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json({ message: "Note deleted" });
    });
  });
});

// HTML routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// This will wait until the HTML is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {
  // Query DOM elements
  const saveNoteButton = document.querySelector(".fa-save");
  const newNoteButton = document.querySelector(".fa-plus");
  const noteTitleInput = document.querySelector(".note-title");
  const noteTextarea = document.querySelector(".note-textarea");

  // Event listener for the save button
  saveNoteButton.addEventListener("click", function() {
    // Get the values from the inputs
    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteTextarea.value.trim();

    // If both fields have content
    if (noteTitle && noteText) {
      // Send the data to the server
      fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: noteTitle, text: noteText }),
      })
        .then((response) => response.json())
        .then((note) => {
          console.log("Note saved", note);
          // Clear the input fields
          noteTitleInput.value = "";
          noteTextarea.value = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  // Event listener for the new note button
  newNoteButton.addEventListener("click", function() {
    // Clear the input fields
    noteTitleInput.value = "";
    noteTextarea.value = "";
  });
});