'use strict';

angular.module('TodoApp.PaginationModule', [])
    .controller('PaginationController',
        ['$scope', function ($scope) {

            $scope.pageMeta = $scope.$parent.pageMeta;
            $scope.firstRecord = 1;
            $scope.lastRecord = 1;
            $scope.totalItemsCount = 0;

            $scope.$parent.$watch('pageMeta', function (pageMeta) {
                $scope.pageMeta = pageMeta;
                $scope.lastRecord = pageMeta.current_items_count + pageMeta.offset;
                $scope.firstRecord = pageMeta.offset + 1;
                $scope.totalItemsCount = pageMeta.total_items_count;
            });

            $scope.fetchMore = function (page, pageSize) {
                $scope.$parent.fetchMore(page, pageSize);
            };
        }]);
