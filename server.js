// Setup
var express = require("express");
var app = express(); // create our app with express
var mongoose = require("mongoose"); // mongoose for mongodb
var databaseUrl = require("./config/database");

mongoose.connect(databaseUrl.url); // Connect to mongodb database

app.configure(function () {
	app.use(express.static(__dirname + "/public")); // Static files location
	app.use(express.logger("dev")); // Log every request to the console
	app.use(express.bodyParser()); // Pull info from html in POST
	app.use(express.methodOverride()); // Simulate delete and put
});

// Routes
require("./app/routes.js")(app);

// Listen
app.listen(8080);
console.log("App listening on port 8080");