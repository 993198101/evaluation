MetronicApp.filter('tableCountInfo', function() {
    return function(pageable) {
        return pageable === undefined || pageable.rows == undefined || pageable.rows === 0 || pageable.rows === ''?
            "共0条记录" :
        "当前显示第" + ((Number(pageable.page)) * Number(pageable.size) + 1) + "到" + ((Number(pageable.page)) * Number(pageable.size) + Number(pageable.rows)) + "条，共" + pageable.total + "条";
    }
}).filter("timestampToDate", ["$filter", function ($filter) {
    return function (value) {
        var filter = $filter("date");
        return filter(value, "yyyy-MM-dd");
    }
}]).filter("commonFilter", ['$filter', '$sce', function ($filter, $sce) {
    return function (val, filter) {
        return $filter(filter)(val);
    }
}]).filter("timestampToLocalDate", ["$filter", function ($filter) {
    return function (value) {
        var filter = $filter("date");
        return filter(value, "yyyy年MM月dd日");
    }
}]).filter("timestampToTime", ["$filter", function ($filter) {
    return function (value) {
        var filter = $filter("date");
        return filter(value, "yyyy-MM-dd HH:mm:ss");
    }
}]).filter("dateInterval", ["$filter", function ($filter) {
    return function (value) {
        var result;
        if (value.getTime() - new Date() > 0) {
            result = "距今天还有" + value.getDateDiff(new Date()) + "天";
        } else if (value.getDateDiff(new Date()) === 0) {
            result = "今天";
        } else {
            result = "已过" + value.getDateDiff(new Date()) + "天";
        }
        return result;
    }
}]);