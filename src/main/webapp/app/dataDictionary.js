/**
 * Created by wangsy on 2017/2/14.
 */

MetronicApp.service('DataDictionaryService', ['$resource', '$window', 'UrlConfigService', function ($resource, $window, UrlConfigService) {

    //this._apiUrl = UrlConfigService.urlConfig.dataDictionary.getDataDictionary;

    this._dataDictionary = new Map();

    this.get = function (key) {
        if (this._dataDictionary.isEmpty()) {
            this.loadDataDictionaryData();
        }
        return this._dataDictionary.get(key);
    };

    this.loadDataDictionaryData = function(){
        var service = this;
        var dataDictionaryData = JSON.parse($window.localStorage.getItem("dataDictionaryData"));
        //for (var name in dataDictionaryData.data) {
        //    service._dataDictionary.put(name, dataDictionaryData.data[name]);
        //}
    };

    this.loadDictionary = function () {
        var service = this;
        var url = service._apiUrl;
        var data = $window.localStorage.getItem("dataDictionaryData");
        if (data && data.length != 0) {
            var timestamp = JSON.parse(data).timestamp;
            url = url + "?t=" + timestamp;
        }
        $.ajax({
            url: url,
            type: "GET",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                if (result.status === 'success') {
                    if (typeof result.data === "object" && !(result.data instanceof Array)){
                        var hasProp = false;
                        for (var prop in result.data){
                            hasProp = true;
                            break;
                        }
                        if (hasProp){
                            var dataDictionaryData = {
                                "timestamp":result.timestamp,
                                "data":result.data
                            };
                            $window.localStorage.setItem("dataDictionaryData", JSON.stringify(dataDictionaryData));
                            service.loadDataDictionaryData();
                        }
                    }else{
                        console.log("获取数据字典格式错误");
                    }
                }
            },
            error: function () {

            }
        });
    };
}]);