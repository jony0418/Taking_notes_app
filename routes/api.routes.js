const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
  app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: err });
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json(newNote);
      });
    });
  });

  app.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: err });
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== id);
      fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Note deleted" });
      });
    });
  });
};
