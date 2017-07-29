/**
 * Created by wangsy on 2017/2/14
 */
//过滤数组第一个去掉
var MetronicApp = angular.module("MetronicApp");
MetronicApp.filter('arrayLimitFilter',function(){

    return function(input, limit) {

        limit = Number(limit);


        var out = [];
        for (; limit < input.length; limit++) {
            out.push(input[limit]);
        }

        return out;
    };
});