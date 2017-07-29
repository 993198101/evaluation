/**
 * 文件上传，下载
 * Created by wangsy on 2017/2/14.
 */
angular.module("MetronicApp").service('FileStorageService',
    ['$resource', 'UrlConfigService', 'toastr',
        function ($resource, UrlConfigService, toastr) {
            this.downloadUrl = UrlConfigService.urlConfig.fileStorage.downloadUrl;
            this.deleteFileUrl = UrlConfigService.urlConfig.fileStorage.deleteFileUrl;

            this.clearFlowFile = function ($flow) {
                for (var i = $flow.files.length - 1; i >= 0; i--) {
                    $flow.removeFile($flow.files[i]);
                }
            };

            this.downloadFileByUrl = function (url, paramMap, fileName) {
                var flag = false;
                if (paramMap) {
                    angular.forEach(paramMap, function (value, key) {
                        if (!flag) {
                            url += ("?");
                            flag = true;
                        }
                        if (value) {
                            url += ("&" + key + "=" + encodeURIComponent(value));
                        }
                    });
                }
                var link = document.createElement('a');
                if ('download' in link) {
                    link.setAttribute("id", "download_link");
                    link.setAttribute('href', url);
                    if (fileName) {
                        link.setAttribute("download", fileName);
                    } else {
                        link.setAttribute("download", null);
                    }
                    link.click();
                } else {
                    var iframe = document.createElement("iframe");
                    iframe.setAttribute("id", "download_iframe");
                    iframe.style.display = "none";
                    iframe.src = url;
                    document.body.appendChild(iframe);
                }
            };

            this.validateFile = function (file, typePattern, typeErrorMsg) {
                var size = 100 * 1024 * 1024;
                var fileSize = file.file.size;
                if (fileSize > size) {
                    toastr.error("", "文件大小不能超过100M。");
                    return false;
                }
                var fileType = file.file.type.toLowerCase();
                var fileName = file.file.name;
                var postfix = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
                if (typePattern) {
                    if (!typeErrorMsg) {
                        typeErrorMsg = "文件格式不正确。";
                    }
                    if (!typePattern.test(fileType) && !typePattern.test(postfix)) {
                        toastr.error("", typeErrorMsg);
                        return false;
                    }
                }
                return true;
            };

            this.getFileDownloadUrl = function (id, type) {
                //standard | original | thumbnail 格式
                if (!type) {
                    type = "standard";
                }
                return this.downloadUrl + "/" + id + "?type=" + type;
            };

            this.deleteFile = function (id) {
                return $resource(this.deleteFileUrl, {"id": id}).delete();
            };
        }
    ]
);