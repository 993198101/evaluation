/**
 * Created by wangsy on 2017/2/14..
 */
var MetronicApp = angular.module("MetronicApp");
MetronicApp.filter('codeTypeState', function() {
    return function(state) {
        return state === true ? "启用" : "废弃";
    };
});
