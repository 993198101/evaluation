(function (angular) {
    function EvaluationManageService($resource, $q, $http, UrlConfigService) {
        var _schema = [
            {name: 'id', label: '序号', type: 'seq'},
            {name: 'curName', label: '课程名', sortable: false},
            {name:'teaName',label: '老师名', sortable: false},
            {name:'term',label: '学期', sortable: false},
            {name:'supScore',label: '督导组评分（30%）', sortable: false},
            {name:'stuScore',label: '学生评分（70%）', sortable: false},
            {name:'total',label:"总评分", sortable: false}
            
        ];
        
        this.url = UrlConfigService.urlConfig.evaluation.list;
        BaseListService.call(this, UrlConfigService.urlConfig.evaluation.list, $resource, $q, $http, _schema,this.url);
      //获取老师
        this._getTeacherUrl = UrlConfigService.urlConfig.evaluation.getTeacherUrl;
        this.getTeachers = function () {
        	 return $resource(this._getTeacherUrl).get();
        }
      //获取登录用户
        this._getUserUrl = UrlConfigService.urlConfig.user.findUser;
        this.getUser = function () {
        	 return $resource(this._getUserUrl).get();
        }
    }

    EvaluationManageService.prototype = Object.create(BaseListService.prototype);
    EvaluationManageService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('EvaluationManageService', EvaluationManageService);
})(angular);


