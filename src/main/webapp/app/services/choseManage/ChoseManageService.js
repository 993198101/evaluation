(function (angular) {
    function ChoseManageService($resource, $q, $http, UrlConfigService) {
        var _schema = [
             {name: 'cId', label: '序号', type: 'seq'},
            {name: 'cName', label: '课程名', sortable: false},
            {name: 'term', label: '学期', sortable: false},
            {name: 'stuNameAndId', label: '学生名(学号)', sortable: false},
            {name: 'teaNameAndId', label: '老师名(编号)', sortable: false},
            {name: 'groupId', label: '督导组', sortable: false},
            {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];
       
      //获取学生
        this._getStudentUrl = UrlConfigService.urlConfig.evaArrange.getAllStudents;
        this.getStudents = function () {
        	 return $resource(this._getStudentUrl).get();
        	
        };
      //获取老师
        this._getTeacherUrl = UrlConfigService.urlConfig.evaluation.getTeacherUrl;
        this.getTeachers = function () {
        	 return $resource(this._getTeacherUrl).get();
        	
        };
      //获取课程
        this._getCurriculumUrl = UrlConfigService.urlConfig.evaArrange.getAllCurs;
        this.getCurriculums = function () {
        	 return $resource(this._getCurriculumUrl).get();
        	
        };
      //删除测评
        this._deleteArrangeUrl = UrlConfigService.urlConfig.evaArrange.deleteArrangeUrl;
        this.deleteArrange= function (id) {
        	
        	return $resource(this._deleteArrangeUrl+"?cId="+id).delete();
        };
        this.url = UrlConfigService.urlConfig.evaArrange.list;
        BaseListService.call(this, UrlConfigService.urlConfig.evaArrange.list, $resource, $q, $http, _schema,this.url);

       
      


    }

    ChoseManageService.prototype = Object.create(BaseListService.prototype);
    ChoseManageService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('ChoseManageService', ChoseManageService);
})(angular);


