/**
 * Created by wangsy on 2017/2/14.
 */
//过滤器 把特殊字符转化为html输出
var MetronicApp = angular.module("MetronicApp");
MetronicApp.filter('to_html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
