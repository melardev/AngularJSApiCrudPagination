'use strict';

app
    .controller('TodoDetailsController',
        ['TodoService', '$routeParams', '$location', '$scope', function (TodoService, $routeParams, $location, $scope) {

            function buildError(message) {
                $scope.message = (message || []).map(msg => msg + '<br/>');
                $scope.messageClass = 'alert alert-danger';
            }

            $scope.submitted = false;
            $scope.isSubmitting = false;
            $scope.todo = {title: '', description: '', completed: false};
            const todoId = $routeParams.id;

            if (todoId != null) {
                TodoService.fetchById(todoId)
                    .then(
                        function (todo) {
                            $scope.todo = todo;
                        },
                        function (errorMessages) {
                            $scope.message = errorMessages.map(errMsg => errMsg + '<br/>');
                            $scope.messageClass = 'alert alert-error';
                        });
            }

            $scope.createOrUpdateTodo = function () {
                if ($scope.todo.id != null)
                    $scope.update();
                else
                    $scope.create();
            };

            $scope.create = function () {
                TodoService.create($scope.todo)
                    .then(
                        function (createdTodo) {
                            $scope.message = 'Todo created successfully';
                            $scope.messageClass = 'alert alert-success';
                            $location.path('');
                        },
                        function (errResponse) {
                            $scope.message = 'Error';
                            $scope.messageClass = 'alert alert-error';
                        }
                    );
            };

            $scope.update = function () {
                TodoService.update($scope.todo)
                    .then(
                        function (response) {
                            $scope.message = 'Successfully Updated';
                            $scope.messageClass = 'alert alert-success';
                            $location.path('');
                        },
                        function (response) {
                            $scope.message = 'Error';
                            $scope.messageClass = 'alert alert-error';
                        }
                    );
            };

            $scope.destroy = function () {
                TodoService.destroy($scope.todo)
                    .then(
                        function (result) {
                            $scope.message = 'Todo deleted successfully';
                            $scope.messageClass = 'alert alert-success';
                            $location.path('');
                        },
                        function (errorMessages) {
                            buildError(errorMessages);
                        }
                    );
            };
        }]);
