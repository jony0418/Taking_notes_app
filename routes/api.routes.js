const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
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

  app.delete("/api/notes/:id", (req, res) => {
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
};
