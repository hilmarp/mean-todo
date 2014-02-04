// Load Todo model
var Todo = require("./models/todo");

// Expose routes to the app
module.exports = function (app) {

	// Routes
	// API

	// Get all todos
	app.get("/api/todos", function (req, res) {
		// Use mongoose to get all todos in the database
		Todo.find(function (err, todos) {
			// If there is an error, send it
			if (err) {
				res.send(err);
			}

			res.json(todos); // Return all todos in json format
		});
	});

	// Create todo and send back all todos after creation
	app.post("/api/todos", function (req, res) {
		// Create a todo, info comes from ajax request from angular
		Todo.create({
			text: req.body.text,
			done: false
		}, function (err, todo) {
			if (err) {
				res.send(err);
			}
			// Get and return all the todos after you create another
			Todo.find(function (err, todos) {
				if (err) {
					res.send(err);
				}

				res.json(todos);
			});
		});
	});

	// Delete a todo
	app.delete("/api/todos/:todo_id", function (req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, function (err, todo) {
			if (err) {
				res.send(err);
			}

			// Get and return all todos after deleting
			Todo.find(function (err, todos) {
				if (err) {
					res.send(err);
				}

				res.json(todos);
			});
		});
	});

	// Application
	app.get("*", function (req, res) {
		res.sendfile("./public/index.html"); // Load the single view file
	});
	
};