/**
 *  电影项目自定义列表
 */
'use strict';
angular.module("MetronicApp").directive('ngTable', ['$timeout', function ($timeout) {
    return {
        templateUrl: '../app/directives/ngTable/template.html',
        restrict: 'EA',
        scope: {
            a:'=',
            rowsOne:'=',
            columns: '=',
            order: '=',
            pageable: '=',
            rows: '=',
            notpageable: '=',
            embed: '=',
            pageableConfig: '=',
            selectable: "="
        },
        replace: true,
        link: function ($scope, $element, $attrs) {

        },
        controller: ['$scope', function ($scope) {

            $scope.onHeadCheckboxClick = function ($event) {
                var flag = false;
                if ($event.target.checked) {
                    flag = true
                }
                angular.forEach($scope.rows, function (row) {
                    row.selected = flag;
                });
            };
            $scope.rowSelect = function ($event, row) {
                if($scope.selectable){
                    if (row.selected) {
                        row.selected = false;
                    } else {
                        row.selected = true;
                    }
                }
            };

            if($scope.selectable){
                $scope.$watch('rows', function () {
                    $scope.getCheckedItems();
                }, true);
            }

            $scope.getCheckedItems = function () {
                if($scope.rows && $scope.rows.length !== 0){
                    var selectItems = [];
                    angular.forEach($scope.rows, function (row) {
                        if (row.selected) {
                            selectItems.push(row);
                        }
                    });
                    $scope.$parent.checkedList = selectItems;

                    if(selectItems.length === $scope.rows.length){
                        $scope.headChecked = true;
                    }else{
                        $scope.headChecked = false;
                    }
                }
            };

            //判断是否直接输入
            $scope.isOutput = function (column) {
                return !(undefined !== column['type'] || undefined !== column['filter'])
            };

            //获取列显示类型
            $scope.typeOf = function (column) {
                return column['type'];
            };

            $scope.onActionClick = function (row, parentMethod) {
                if (angular.isFunction($scope.$parent[parentMethod])) {
                    $scope.$parent[parentMethod](row);
                }
            };

            $scope.onEvaluationMethod = function (row, parentMethod) {
                if (angular.isFunction($scope.$parent[parentMethod])) {
                    return $scope.$parent[parentMethod](row);
                }
            };

            $scope.isNullString = function (str) {
                return !(str && str !== "");
            };

            $scope.isEmpty = function (array) {
                return !(array && array.length);
            };
            // sort and order
            $scope.isSortedBy = function (columnName) {
                return $scope.sort === columnName;
            };

            $scope.isOrder = function (order) {
                return $scope.order === order;
            };

            $scope.onRadioChecked = function ($event, row) {
                if ($event.target.checked) {
                    $scope.$parent.row=row;
                }
            };
            // header
            $scope.onHeaderClicked = function (column) {
                if (!column.sortable) {
                    return;
                }
                if ($scope.sort === column.name) {
                    $scope.order = $scope.order === 'asc' ? 'desc' : 'asc';
                } else {
                    $scope.sort = column.name;
                    $scope.order = 'asc';
                }
            };
        }]
    };
}]).filter("ngTableFilter", ['$filter', '$sce', function ($filter, $sce) {
    return function (val, filter) {
        return $filter(filter)(val);
    }
}]);

