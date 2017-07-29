(function (global) {
    function BaseListService(listUrl, $resource, $q, $http, schema, url) {
        this.listUrl = listUrl;
        this.$resource = $resource;
        this.$q = $q;
        this.$http = $http;
        this.url = url;

        this._storedPage = 0;
        this._s_search = {};
        this._sort = 'id';
        this._order = 'desc';
        this._schema = schema;

        this._pageable = {
            "totalElements": 0,
            "numberOfElements": 0,
            "totalPages": 0,
            "first": true,
            "last": true,
            "size": 10,
            "number": 0,
            "fromNumber": 0,
            "toNumber": 0
        };

        //查询Schema定义
        this.getSchema = function () {
            return this._schema;
        };

        this.getStoredPage = function () {
            return this._storedPage;
        };

        this.setStoredPage = function (page) {
            this._storedPage = page;
        };

        this.putSearchParams = function (params) {
            for (var k in params) {
                if (params.hasOwnProperty(k))
                    this._s_search[k] = params[k];
            }
        };

        this.clearSearchParams = function () {
            this._s_search = {}
        };

        this.getSort = function () {
            return this._sort;
        };

        this.setSort = function (sort) {
            this._sort = sort;
        };

        this.getSize = function () {
            return this._pageable.size;
        };

        this.setSize = function (size) {
            this._pageable.size = size;
        };

        this.getOrder = function () {
            return this._order;
        };

        this.setOrder = function (order) {
            this._order = order;
        };

        this.getPageable = function () {
            return this._pageable;
        };

        this.getSortAndOrder = function () {
            if (this._sort && this._order) {
                return this._sort + "," + this._order;
            } else {
                return "";
            }
        };

        this.get = function (id) {
            return this.$resource(this.url).get({id: id});
        };

        this._encodeUrl = function (key, value) {
            if (key && value != undefined && value !== "") {
                return key + '=' + encodeURIComponent(value === null ? '' : String(value)).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+').replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g);
            } else {
                return "";
            }
        };

        this._urlParamEncode = function (param) {
            var service = this;
            var urlParam = [];
            for (var key in param) {
                key = encodeURIComponent(key);
                var values = param[key];
                if (values != undefined && values.constructor == Array) {//数组
                    var queryValues = [];
                    for (var i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(service._encodeUrl(key, value));
                    }
                    urlParam = urlParam.concat(queryValues);
                } else { //字符串
                    urlParam.push(service._encodeUrl(key, values));
                }
            }
            return urlParam.join('&');
        };

        this.list = function (placeholder, cb) {
            var service = this;
            var url = this.listUrl;
            if (typeof placeholder === 'function') {
                cb = placeholder;
                placeholder = undefined;
            }
            var queryMap = {page: this.getStoredPage(), size: this._pageable.size};
            if (this._s_search) {
                for (var k in this._s_search) {
                    if (this._s_search.hasOwnProperty(k) && this._s_search[k] != undefined && this._s_search[k] !== "")
                        queryMap['s_' + k] = this._s_search[k];
                }
            }
            queryMap.sort = service.getSortAndOrder();
            var urlParamEncodeStr = service._urlParamEncode(queryMap);
            if (urlParamEncodeStr) {
                url = url + "?" + service._urlParamEncode(queryMap);
            }
            var resource = this.$resource(url, !!placeholder ? placeholder : {}, {"searchList": {"method": "POST"}});
            if (cb) {
                resource.searchList().$promise.then(function (res) {
                    for (var key in res.pageable) {
                        service._pageable[key] = res.pageable[key];
                    }
                    cb(res);
                });
            }
            else {
                return resource.searchList();
            }
        };

        this.delete = function (id) {
            var resource = this.$resource(this.url, {id: id});
            return resource.delete();
        };

        //新建或更新
        this.save = function (model) {
            if (undefined !== model.id) {
                return this.$resource(this.url, {id: model.id}, {
                    'update': {method: 'PUT'}
                }).update({id: model.id}, model);
            } else {
                return this.$resource(this.url).save(model);
            }

        };

        this.update = function (id, model) {
            return $resource(this.url, {id: id}, {
                'update': {method: 'PUT'}
            }).update({id: id}, model);
        };
    }

    global.BaseListService = BaseListService;
})(window, angular);
