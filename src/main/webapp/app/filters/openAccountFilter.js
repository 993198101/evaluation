/**
 * Created by wangsy on 2017/2/14.
 */
var MetronicApp = angular.module("MetronicApp");
MetronicApp.filter('openAccountFilter', function() {
    return function(state) {
        if(state == 'inuse'){
            return '已开通';
        }else{
            return '点击开通';
        }
    };
});
