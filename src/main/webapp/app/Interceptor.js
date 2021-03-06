angular.module("MetronicApp")
    .config(['$httpProvider', function ($httpProvider) {

        var _requestQueue = [];
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


        $httpProvider.interceptors.push(['$rootScope', '$q', '$window', 'toastr', function ($rootScope, $q, $window, toastr) {
            return {
                'request': function (config) {
                    if (config.url.indexOf('/w/') >= 0) {
                        _requestQueue.push(config.url);
                        $rootScope.$broadcast("dataRequestStart", true);
                    }
                    return config || $q.when(config);
                },
                'requestError': function (rejection) {
                    return rejection;
                },
                //success -> don't intercept
                'response': function (response) {
                    if (response.config.url.indexOf('/w/') >= 0) {
                        var idx = _requestQueue.indexOf(response.config.url);
                        if (idx >= 0) {
                            _requestQueue.splice(idx, 1);
                        }

                        if (_requestQueue.length == 0) {
                            $rootScope.$broadcast("dataRequestEnd", true);
                        }
                    }

                    return response || $q.when(response);
                },
                //error -> if 401 save the request and broadcast an event
                'responseError': function (response) {
                    if (response.config.url.indexOf('/w/') >= 0) {
                        var idx = _requestQueue.indexOf(response.config.url);
                        if (idx >= 0) {
                            _requestQueue.splice(idx, 1);
                        }
                        if (_requestQueue.length == 0) {
                            $rootScope.$broadcast("dataRequestEnd", true);
                        }
                    }
                    if (response.status === 400) {
                        toastr.error("", "请求传递参数不正确！");
                    } else if (response.status === 401) {
                        $window.location.href = "/login.html";
                    } else if (response.status === 403) {
                        $window.location.href = "/login.html";
                    } else if (response.status === 404) {
                        //  $window.location.href = "./404.html";
                    } else if (response.status === 500) {
                        //$window.location.href = "./500.html";
                    } else {
                        toastr.error(response.status, "其他异常！");
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]);
