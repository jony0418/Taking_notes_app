// const path = require("path");

// module.exports = (app) => {
//   app.get("/notes", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/notes.html"));
//   });

//   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });
// };

// Dependencies
const path = require('path');

module.exports = app => {
    // Route to notes.html
    app.get('/notes', (req, res) => {
        res.sendFile(path.resolve('public/notes.html'));
    });

    // Route to index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('public/index.html'));
    });
};
