(function (angular) {
    function ChoseManageCreateService($resource, $q, $http, UrlConfigService) {
        var _schema = [
          
            {name: 'aId', label: '序号', type: 'seq'},
            {name: 'aContent', label: '内容', sortable: false},
            {name:'aQid',label: '题号', sortable: false},
            {name:'aScore',label: '分数', sortable: false},
            {name:'aOrder',label: 'order', sortable: false},
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
      //获取编辑answer
        this._findEditArrangeUrl = UrlConfigService.urlConfig.evaArrange.findEditArrangeUrl;
        this.findEditArrange = function (id) {
        	 return $resource(this._findEditArrangeUrl,{"cId":id},{"getData": {"method": "GET"}}).getData();
        	
        };
        //提交请求，新增answer
        this._addArrangeUrl = UrlConfigService.urlConfig.evaArrange.addArrangeUrl;
        this.addArrange = function (object) {
        	 return $resource(this._addArrangeUrl+"?stuId="+object.stuId+"&curId="+object.curId+"&teaId="+object.teaId+"&term="+object.term+"&groupId="+object.groupId+"&cId="+object.cId).save();
        	
        };
      //提交请求，新增Question
        this._addQuestionUrl = UrlConfigService.urlConfig.question.addQuestionUrl;
        this.addQuestion = function (qContent) {
        	 return $resource(this._addQuestionUrl,{"qContent":"@qContent"}).get({"qContent":qContent});
        	
        };
        
      //提交请求，编辑question
        this._editQuestionUrl = UrlConfigService.urlConfig.question.editQuestionUrl;
        this.editQuestion = function (qContent,qId) {
        	 return $resource(this._editQuestionUrl+"?qContent="+qContent+"&qId="+qId).save();
        	
        };
        
        
        this.url = UrlConfigService.urlConfig.answer.list;
        BaseListService.call(this, UrlConfigService.urlConfig.answer.list, $resource, $q, $http, _schema,this.url);
    }

    ChoseManageCreateService.prototype = Object.create(BaseListService.prototype);
    ChoseManageCreateService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('ChoseManageCreateService', ChoseManageCreateService);
})(angular);


