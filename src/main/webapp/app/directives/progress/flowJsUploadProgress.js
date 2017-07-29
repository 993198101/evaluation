/**
 * Created by wangwj on 16-04-05.
 */
'use strict';

MetronicApp.constant('flowJsUploadProgressConfig', {

});

MetronicApp.run(["$templateCache", function($templateCache) {
    $templateCache.put("template/progress/file-upload-progress.html",
        "<div style='width: 600px;'>\n" +
        "<div class=\"modal-header\">\n" +
        "  <h3 class=\"modal-title\">\n" +
        "     上传进度\n" +
        "  </h3>\n" +
        "</div>\n" +
        "<div class=\"modal-body\">\n" +
        "   <table width='570px;' style='width: 570px;' class=\"table table-hover table-bordered table-striped\">\n" +
        "       <tr ng-repeat=\"file in files\">\n" +
        "           <td width='168px' style='vertical-align: middle;width: 168px;'>\n" +
        "               <div style='width: 150px;' ng-class=\"{active: file.isUploading() || file.paused}\">\n" +
        "                   <p style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;' ng-bind=\"file.name\">\n" +
        "                   </p>\n" +
        "               </div>\n" +
        "           </td>\n" +
        "           <td style='vertical-align: middle;'>\n" +
        "               <div class=\"progress progress-striped\" ng-class=\"{active: file.isUploading() || file.paused}\">\n" +
        "                   <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" ng-style=\"{width: (file.progress() * 100) + '%'}\">\n" +
        "                       <span ng-bind=\"toProgressStr(file.progress())\">\n" +
        "                       </span>\n" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </td>\n" +
        "           <td width='60px' style='vertical-align: middle;'>\n" +
        "               <div>\n" +
        "                   <a class=\"btn blue btn-xs btn-warning ng-hide\" ng-click=\"file.pause()\" ng-show=\"!file.paused && file.isUploading()\">\n" +
        "                       暂停\n" +
        "                   </a>\n" +
        "                   <a class=\"btn blue btn-xs btn-warning ng-hide\" ng-click=\"file.resume()\" ng-show=\"file.paused\">\n" +
        "                       恢复\n" +
        "                   </a>\n" +
        "               </div>\n" +
        "           </td>\n" +
        "       </tr>\n" +
        "   </table>\n" +
        "</div>\n" +
        "<div class=\"modal-footer\">\n" +
        "</div>\n" +
        "</div>\n" +
        "");
}]);

MetronicApp.directive('flowJsUploadProgress', ['flowJsUploadProgressConfig','$modal', function (flowJsUploadProgressConfig,$modal) {
    return {
        restrict: 'EA',
        scope: {
            filesObj: '='
        },
        replace: true,
        link: function ($scope, $element, $attrs) {
            $scope.init = function(){
                $scope.modalInstance = $modal.open({
                    templateUrl: 'template/progress/file-upload-progress.html',
                    controller: ['$scope', '$modalInstance', function (scope, $modalInstance) {
                        scope.files = $scope.filesObj;
                        scope.toProgressStr = function(progress){
                            if(progress){
                                var progressStr = (progress * 100).toString();
                                if(progressStr.indexOf(".") != -1){
                                    progressStr = progressStr.substring(0,4) + "%";
                                }else{
                                    progressStr += "%";
                                }
                                return progressStr;
                            }
                        };
                    }],
                    backdrop:false,
                    resolve: {}
                });
            };

            $scope.$watch('filesObj.length', function (newVal) {
                if(newVal && newVal > 0){
                    $scope.init();
                }else{
                    if($scope.modalInstance){
                        $scope.modalInstance.close();
                    }
                }
            });
        }
    };
}]);

