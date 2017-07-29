/**
 * Created by zhangyj on 15-10-6.
 */
MetronicApp.directive('tabActive', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // 初始化

            // view - model
            element.on('click', function () {
                element.parent().children().removeClass("active");
                element.addClass("active");
            });
        }
    }
});