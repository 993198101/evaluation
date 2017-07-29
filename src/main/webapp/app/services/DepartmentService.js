/**
 * Created by leadingsoft on 2016/11/30.
 */
MetronicApp.service('DepartmentService', ['$resource', 'UrlConfigService', function ($resource, UrlConfigService) {
    this._checkNodes = UrlConfigService.urlConfig.departments.list;
    this._checkAll = UrlConfigService.urlConfig.departments.dUsers;
    //组织树
    this.getTreeData = function () {
        return $resource(this._checkNodes).get();
    };

    //获得成员
    this.checkUsers = function (id) {
        return $resource(this._checkAll,{id:id}).get();
    }

}]);