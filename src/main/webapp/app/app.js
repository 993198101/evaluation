/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngResource",
    "ngCookies",
    "flow",
    "ldDatePicker",
    "ngJsTree",
    "toastr",
    "ng.ueditor",
    "ui.calendar",
    "ui.validate",
    "ngMessages",
    "signature"
]);


MetronicApp.constant('paginationConfig', {
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: '首页',
    previousText: '上页',
    nextText: '下页',
    lastText: '尾页',
    rotate: true
});

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

MetronicApp.config(function () {
    moment.locale("zh-cn");
});

MetronicApp.config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
        target: '/upload',
        singleFile: true,//默认false
        chunkSize: 5 * 1024 * 1024,
        testChunks: false,
        generateUniqueIdentifier: function () {
            return new UUID().createUUID();
        }
    };
    flowFactoryProvider.on('catchAll', function (event) {
        //console.log('catchAll', arguments);
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/
/**
 `$controller` will no longer look for controllers on `window`.
 The old behavior of looking on `window` for controllers was originally intended
 for use in examples, demos, and toy apps. We found that allowing global controller
 functions encouraged poor practices, so we resolved to disable this behavior by
 default.

 To migrate, register your controllers with modules rather than exposing them
 as globals:

 Before:

 ```javascript
 function MyController() {
  // ...
}
 ```

 After:

 ```javascript
 angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

 Although it's not recommended, you can re-enable the old behavior like this:

 ```javascript
 angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
 **/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
//MetronicApp.config(['$controllerProvider', function($controllerProvider) {
//  // this option might be handy for migrating old apps, but please don't use it
//  // in new ones!
//  $controllerProvider.allowGlobals();
//}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    moment.locale('zh-cn');
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: true, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', '$cookies','$resource', 'DataDictionaryService',function
    ($scope, $rootScope, $cookies,$resource, DataDictionaryService) {
    // 登陆验证
    $scope.model = {};
    var id = $scope.model.id;
    $scope.loginName = $cookies.get("nickname");
    //获取码表信息
    DataDictionaryService.loadDictionary();
    DataDictionaryService.loadDataDictionaryData();

    $scope.$on('$viewContentLoaded', function () {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$cookieStore', '$window', '$resource', '$cookies',"$http", function ($scope, $cookieStore, $window, $resource, $cookies,$http) {
    $scope.exitLoginEvent = function () {
        $http({url:"logout",method:"post"}).success(function(res){
        })
       
        $window.location.href = "toLogin";
    };
    $http({url:"findUser",method:"post"}).success(function(res){
    	if(res.user==null){
    		$window.location.href = "toLogin";
    	}
    });
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
    $scope.getMenus = function () {
        //var resource = $resource("./menus.json");
        var resource = $resource("../data/w/authorization/myAuthorizedMenus.json");
        return resource.get();
    };

    $scope.getMenus().$promise.then(function (result) {
        $scope.menus = result.data;
        $http({url:"findUser",method:"post"}).success(function(res){
        	if(res.user.level==3){
        		$scope.menus.splice(4,1);
        	}else if(res.user.level==2){
        		$scope.menus.splice(1,4);
        	}else if(res.user.level==1){
        		$scope.menus.splice(1,4);
        	}
        	
        });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.isEmptySubMenus = function (subMenus) {
        if (subMenus) {
            if (subMenus.length) {
                return true;
            }
        }
        return false;
    };
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        setTimeout(function () {
            QuickSidebar.init(); // init quick sidebar
        }, 2000);
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);


/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);
