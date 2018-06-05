// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const orm = require("./config/orm.js");
const routes = require("./controller/controller.js")

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 8080;

// //  Select all available memes.
// orm.selectAll();

// //  Find a meme by its tag/username.
// orm.findTagged();

// //  Add your own meme.
// orm.insertOne('memes', 'file_path', 'memes/turtles.jpeg', function(req, res) {
//   res.JSON();
// });


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));

app.use(routes);
// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/memes-api-routes.js")(app);
require("./routes/tagged-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });
