// DEPENDENCIES
const express = require("express");
const { clog } = require('./middleware/clog'); // Import clog middleware
const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARE
console.log('server.js is being run');

app.use(clog); // Use clog middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTER
require("./routes/api.routes")(app);
require("./routes/html.routes")(app);

// LISTENER
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);