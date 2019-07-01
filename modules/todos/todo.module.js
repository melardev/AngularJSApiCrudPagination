'use strict';

angular.module('TodoApp.TodoModule', ['ngRoute', 'TodoApp.PaginationModule'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/todos", {
                templateUrl: "modules/todos/templates/list.html",
                controller: "TodoController"
            })
            .when("/todos/create", {
                templateUrl: "modules/todos/templates/create_edit.html",
                controller: "TodoDetailsController"
            })
            .when("/todos/:id", {
                templateUrl: "modules/todos/templates/show.html",
                controller: "TodoDetailsController"
            })
            .when("/todos/:id/edit", {
                templateUrl: "modules/todos/templates/create_edit.html",
                controller: "TodoDetailsController"
            })
            .otherwise({redirectTo: "/todos"});
    }]);
