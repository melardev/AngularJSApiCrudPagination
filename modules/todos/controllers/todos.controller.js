'use strict';

app
    .controller("TodoController", ['TodoService', '$scope', function (TodoService, $scope) {

        $scope.pageMeta = {};
        $scope.message = null;
        $scope.messageClass = 'alert alert-success';

        function buildError(messages) {
            $scope.message = (messages || []).map(msg => msg + '<br/>');
            $scope.messageClass = 'alert alert-danger';
        }


        $scope.fetchMany = function (page = 1, pageSize = 5) {
            TodoService.fetchMany(page, pageSize)
                .then(response => {
                    if (!response)
                        return buildError(['Something Went wrong']);

                    if (response.success) {
                        // delete response.data.success;
                        // delete response.data.full_messages;
                        $scope.pageMeta = response.page_meta;
                        $scope.todos = response.todos;
                    }
                });
        };

        $scope.fetchMany();

        $scope.destroy = function (todo) {
            TodoService.destroy(todo)
                .then(
                    function (result) {
                        $scope.message = 'Todo deleted successfully';
                        $scope.messageClass = 'alert alert-success';
                        $scope.todos = $scope.todos.filter(t => t.id !== todo.id);
                    },
                    function (errorMessages) {
                        buildError(errorMessages);
                    }
                );
        };

        $scope.toggleComplete = function (todo) {
            const newTodo = {...todo, completed: !todo.completed};
            TodoService.update(newTodo).then(function (updatedTodo) {
                delete updatedTodo.success;
                delete updatedTodo.full_messages;
                $scope.todos = $scope.todos.map(t => t.id === todo.id ? updatedTodo : t);
            }, function (errorMessages) {
                buildError(errorMessages);
            });
        };

        $scope.fetchMore = function (page, pageSize) {
            $scope.fetchMany(page, pageSize);
        };
    }]);
