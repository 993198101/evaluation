/**
 *  电影项目自定义列表
 */
'use strict';
angular.module("MetronicApp").directive('ngTable', ['$timeout', function ($timeout) {
    return {
        templateUrl: 'app/directives/ngTable/template.html',
        restrict: 'EA',
        scope: {
            a:'=',
            rowsOne:'=',
            columns: '=',
            sort: '=',
            order: '=',
            pageable: '=',
            rows: '=',
            notpageable: '=',
            embed: '=',
            pageableConfig: '='
        },
        replace: true,
        link: function ($scope, $element, $attrs) {

        },
        controller: ['$scope', function ($scope) {

            if($scope.$parent)
            {
                $scope.parentObj =  $scope.$parent;
            }
            if($scope.embed) { // 保存子表格元素，防止刷新后丢失
                $scope.tablec = $('.embed-table');
            }
            //判断是否直接输入
            $scope.isOutput = function (column) {
                return !(undefined !== column['type'] || undefined !== column['filter'])
            };
            //获取列显示类型
            $scope.typeOf = function (column) {
                return column['type']
            };

            // checkbox is checked
            $scope.onCheckboxChecked = function ($event, row) {
                if ($event.target.checked) {
                    $scope.$parent.checkedList.push(row);
                }
            };

            $scope.onRadioChecked = function ($event, row) {
                if ($event.target.checked) {
                    $scope.$parent.row=row;
                }
            };

            $scope.onActionClick = function (row, parentMethod) {
                if ($scope.$parent.hasOwnProperty(parentMethod)) {
                    $scope.$parent[parentMethod](row);
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

            $scope.onRowClicked = function(row, $event){
                if(!$scope.embed) return;
                if($($event.currentTarget).next('tr.embed-table').size()>0 && !$('.embed-table').is(":hidden") ) {
                    $('.embed-table').hide();
                    return;
                }
                if ($scope.$parent.hasOwnProperty('onRowClicked')) {
                    $scope.$parent['onRowClicked'](row, $scope.callbackfn);
                }
                $scope.tablec.insertAfter($event.currentTarget);    //移动节点
                $('.embed-table').show();
            }
        }]
    };
}]).filter("ngTableFilter", ['$filter', '$sce', function ($filter, $sce) {
    return function (val, filter) {
        return $filter(filter)(val);
    }
}]);

