/**
 * Created by zhangyj on 15-10-8.
 */

/**
 * msgpriview封装
 */
MetronicApp.filter('to_html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


MetronicApp.directive('textMsgPriview', function () {
    return{
        restrict:"E",
        templateUrl:"app/directives/msgPriview/textPriview.html",
        replace:"true",
        link:function(scope,element,attrs){
            scope.$watch('textcontent', function (newValue) {
                scope.msgpriviewcontent = html_encode(newValue);
            });

            scope.$watch();
        }
    }
});
MetronicApp.directive('pictureMsgPriview', function () {
    return{
        restrict:"E",
        templateUrl:"app/directives/msgPriview/picturePriview.html",
        replace:"true"
    }
});
MetronicApp.directive('voiceMsgPriview', function () {
    return{
        restrict:"E",
        templateUrl:"app/directives/msgPriview/voicePriview.html",
        replace:"true"
    }
});
MetronicApp.directive('videoMsgPriview', function () {
    return{
        restrict:"E",
        templateUrl:"app/directives/msgPriview/videoPriview.html",
        replace:"true"
    }
});
MetronicApp.directive('fileMsgPriview', function () {
    return{
        restrict:"E",
        templateUrl:"app/directives/msgPriview/filePriview.html",
        replace:"true"
    }
});



MetronicApp.directive('multiGraphicMsgPriview', function () {
    return{
        restrict:"EA",
        templateUrl:"app/directives/msgPriview/multiGraphicPriview.html",
        replace:"true"
    }
});



var html_encode=function(str){
    var s = "";
    if (!str || str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}