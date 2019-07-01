'use strict';

const app = angular.module('TodoApp', [
    'ngRoute',
    'TodoApp.TodoModule',
    'TodoApp.PaginationModule'
]);

app.constant('urls', {
    BASE: 'http://localhost:8080/api',
    TODO_SERVICE: 'http://localhost:8080/api/todos'
}).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/todos'});
}]);
