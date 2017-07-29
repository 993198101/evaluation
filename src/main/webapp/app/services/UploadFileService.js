/**
 * Created by wangsy on 2017/2/14.
 */
MetronicApp.service('UploadFileService', ['$resource', 'UrlConfigService', function ($resource, UrlConfigService) {
    this._getUploadUrl = UrlConfigService.urlConfig.uploadModule.getUploadUrl;
    this._getStorageRecordUrl = UrlConfigService.urlConfig.uploadModule.getStorageRecordUrl;
    this._getDownLoadUrl = UrlConfigService.urlConfig.uploadModule.getDownLoadUrl;
    this._getUploadFileNameUrl = UrlConfigService.urlConfig.uploadModule.getUploadFileNameUrl;


    this.getUploadUrl = function () {
        var resource = $resource(this._getUploadUrl);
        return resource.get();
    };

    this.getUploadFileNameUrl = function (id) {
        var resource = $resource(this._getUploadFileNameUrl, {id: id});
        return resource.get({type: 'original '});
    };

    this._storageRecord = function (storageRecordObj) {
        var resource = $resource(this._getStorageRecordUrl);
        return resource.save(storageRecordObj);
    };
    this.storageRecord = function ($file, $message, $flow, type) {
        var service = this;
        var result = $.parseJSON($message);
        if (result.status === "success") {
            var filePath = result.data.filePath;
            var fileName = $file.name;
            var storageRecordObj = {
                "fileName": fileName,
                "filePath": filePath,
                "normalization": type
            };
            return service._storageRecord(storageRecordObj);
        }
    };

    this.downLoadFile = function (fileId, type) {
        return this._getDownLoadUrl + fileId + (type ? '?type=' + type : '');
    };

    this.clearFlowFile = function ($flow) {
        for (var i = $flow.files.length - 1; i >= 0; i--) {
            $flow.files[i].cancel();
        }
    };

    this.fileNameNumberLimit = function (fileName, limit) {
        if(!limit){
            limit = 200;
        }
        if (fileName.length > limit) {
            var index = fileName.lastIndexOf(".");
            var prefix = fileName.substr(index);
            fileName = fileName.substr(0, limit - 1 - prefix.length) + prefix;
        } else {
            return fileName;
        }
    }
}]);