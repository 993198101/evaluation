var MetronicApp = angular.module("MetronicApp");
MetronicApp.filter('OnlineStatus', function () {
    return function (status) {
        switch (status) {
            case 0:
                return '离线';
            case 1:
                return '在线';
            default :
                return '未知状态';
        }
    };
}).filter('IP', function () {
    return function (ip) {
        var re = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
        return re.test(ip) || ip === '' ? ip : 'an error occurred when obtaining ip address';
    };
}).filter('ToString', function () {
    return function (arr) {
        if (arr === undefined) return '';
        var str = '';
        for (var key in arr) {
            str += ',' + (arr[key].text === undefined ? ' ' : arr[key].text);
        }
        return str.length > 0 ? str.substring(1) : str;
    };
});