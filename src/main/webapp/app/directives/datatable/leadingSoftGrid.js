/**
 * Created by wangwj on 15-11-18.
 */
'use strict';
/**
 *
 *
 * columns:[
 *          {
 *          name: 'name',
 *          label: '姓名',
 *          sortable: true,
 *          templateUrl: "example.html",  //<script type="text/ng-template" id="example.html"></script>
 *          click:{"class":"blue","linkFun":$scope.clickCallBackFun},   // class 默认为超链接的颜色 #3CA2E3 clickCallBackFun = function(row)
 *          values:[{"text":"男","value":"male","class":""},{"text":"女","value":"female","class":""}], array
 *          }
 *       ]
 *
 * sort sort
 *
 * order order
 *
 * rows result.data
 *
 */

MetronicApp.constant('ldGridConfig', {
    column:{
        values:{
            label:"text",
            value:"value"
        }
    }
});

MetronicApp.directive('ldGrid', ['ldGridConfig', function (ldGridConfig) {
    return {
        templateUrl: 'app/directives/datatable/leadingSoftGrid.html',
        restrict: 'EA',
        scope: {
            columns: '=',      // list of maps each containing column.name, column.label and column.sortable
            sort: '=',         // column.name used for sorting
            order: '=',        // sort order: 'asc' or 'desc'
            rows: '=',         // current page: list of maps each mapping column.name onto a cell value
            config: '=',
            selectItem: '=',
            selectItems: '='
        },
        replace: true,
        link: function ($scope, $element, $attrs) {

        },
        controller: ['$scope', function ($scope) {
            $scope.displayLabel = ldGridConfig.column.values.label;
            $scope.displayValue = ldGridConfig.column.values.value;

            if ($scope.config&&$scope.config.methods && $scope.config.methods.length) {
                for (var i = 0; i < $scope.config.methods.length; i++) {
                    $scope[$scope.config.methods[i].methodName] = $scope.config.methods[i].linkFun;
                }
            }

            $scope.gridCheckAllEvent = function () {
                if (angular.element(document.querySelector('#checkAllItem'))[0].checked) {
                    angular.element(document.querySelectorAll('.checkItem')).attr("checked", true);
                } else {
                    angular.element(document.querySelectorAll('.checkItem')).attr("checked", false);
                }
                $scope.selectItems = [];

                angular.forEach(angular.element(document.querySelectorAll('.checkItem:checked')), function (data) {
                    $scope.selectItems.push($.parseJSON(angular.element(data).attr("item")));
                });
            };

            $scope.gridCheckItemEvent = function () {
                if (angular.element(document.querySelector('#checkAllItem')).length &&
                    angular.element(document.querySelectorAll('.checkItem')).length !== angular.element(document.querySelectorAll('.checkItem:checked')).length) {
                    angular.element(document.querySelector('#checkAllItem'))[0].checked = false;
                }
                $scope.selectItems = [];
                angular.forEach(angular.element(document.querySelectorAll('.checkItem:checked')), function (data) {
                    $scope.selectItems.push($.parseJSON(angular.element(data).attr("item")));
                });
            };

            $scope.gridRadioItemEvent = function (row) {
                $scope.selectItem = row;
            };

            $scope.isNullString = function (str) {
                if (str && str !== "") {
                    return false;
                }
                return true;
            };

            $scope.isEmpty = function (array) {
                if (array && array.length) {
                    return false;
                }
                return true;
            };
            // sort and order
            $scope.isSortedBy = function (columnName) {
                return $scope.sort === columnName;
            };

            $scope.isOrder = function (order) {
                return $scope.order === order;
            };

            $scope.getType = function (column) {
                if (column.radioOrCheckbox) {
                    if (column.radioOrCheckbox === "radio") {
                        return "radio";
                    } else if (column.radioOrCheckbox === "checkbox") {
                        return "checkbox";
                    } else {
                        return "other";
                    }
                } else if (column.templateUrl) {
                    return "template";
                } else if (column.click) {
                    return "click";
                } else if (column.values) {
                    return "values";
                } else {
                    return "other";
                }
            };

            $scope.getColumnValue = function (column, columnValue) {
                if(column.values.value || column.values.value === 0){
                    return columnValue[column.values.value];
                }else{
                    return columnValue[$scope.displayValue];
                }

            };

            $scope.getColumnLabel = function (column, columnValue) {
                if(column.values.label || column.values.label === 0){
                    var labels = column.values.label.split(",");
                    if(labels.length === 1){
                        return columnValue[labels[0]];
                    }else{
                        var returnLabels = "";
                        for(var index in labels){
                            if(index == 0){
                                returnLabels += columnValue[labels[index]]+ "(";
                            }else if(index == labels.length -1){
                                returnLabels += columnValue[labels[index]]+ ")";
                            }else{
                                returnLabels += columnValue[labels[index]]+ "，";
                            }
                        }
                        return returnLabels;
                    }
                }else{
                    return columnValue[$scope.displayLabel];
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
}]);

