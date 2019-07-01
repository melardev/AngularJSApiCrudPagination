'use strict';

app
    .service('TodoService',
        ['$http', '$q', 'urls',
            function ($http, $q, urls) {
                const factory = {};

                function buildError(response) {
                    if (response && response.full_messages &&
                        response.full_messages instanceof Array) {
                        return response.full_messages;
                    } else {
                        return ['Something went wrong'];
                    }
                }

                factory.fetchMany = function (page = 1, pageSize = 5) {
                    const deferred = $q.defer();
                    $http.get(urls.TODO_SERVICE + `?page=${page}&page_size=${pageSize}`)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function (errorResponse) {
                                deferred.reject(errorResponse);
                            }
                        );
                    return deferred.promise;
                };

                factory.fetchById = function (id) {
                    const deferred = $q.defer();
                    $http.get(urls.TODO_SERVICE + '/' + id)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function (errorResponse) {
                                deferred.reject(buildError(errorResponse));
                            }
                        );
                    return deferred.promise;
                };

                factory.create = function (todo) {
                    const deferred = $q.defer();
                    $http.post(urls.TODO_SERVICE, todo)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function (errorResponse) {
                                deferred.reject(buildError(errorResponse));
                            }
                        );
                    return deferred.promise;
                };

                factory.update = function (todo) {
                    const deferred = $q.defer();
                    $http.put(urls.TODO_SERVICE + '/' + todo.id, todo)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function (errorResponse) {
                                deferred.reject(buildError(errorResponse));
                            }
                        );
                    return deferred.promise;
                };

                factory.destroy = function (todo) {
                    const deferred = $q.defer();
                    $http.delete(urls.TODO_SERVICE + '/' + todo.id)
                        .then(
                            function (response) {
                                // response.status === 204
                                deferred.resolve(true);
                            },
                            function (errorResponse) {
                                deferred.reject(buildError(errorResponse));
                            }
                        );
                    return deferred.promise;
                };

                return factory;
            }
        ]);
