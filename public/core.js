var todoApp = angular.module("todoApp", []);

function mainController ($scope, $http) {
	$scope.formData = {};

	// When landing on page, get all todos and show them
	$http.get("/api/todos")
		.success(function (data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function (data) {
			console.log("Error: " + data);
		});

	$scope.createTodo = function () {
		$http.post("/api/todos", $scope.formData)
			.success(function (data) {
				$scope.formData = {}; // Clear the form
				$scope.todos = data;
				console.log(data);
			})
			.error(function (data) {
				console.log("Error: " + data);
			});
	};

	// Delete a todo after checking it
	$scope.deleteTodo = function (id) {
		$http.delete("/api/todos/" + id)
			.success(function (data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function (data) {
				console.log("Error: " + data);
			});
	};
}