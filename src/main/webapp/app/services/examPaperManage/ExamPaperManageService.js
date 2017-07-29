(function (angular) {
    function ExamPaperManageService($resource, $q, $http, UrlConfigService) {
        var _schema = [
             {name: 'examId', label: '序号', type: 'seq'},
            {name: 'examName', label: '内容', sortable: false},
            {name:'examQuestion',label: '题号', sortable: false},
            {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];
        //获取班级
      //获取题目
        this._getQuestionUrl = UrlConfigService.urlConfig.answer.getQuestionUrl;
        this.getQuestions = function () {
        	 return $resource(this._getQuestionUrl).get();
        	
        };
      //提交删除的请求
        this._deleteExamPaperUrl = UrlConfigService.urlConfig.examPaper.deleteExamPaperUrl;
        this.deleteExamPaper = function (examId) {
        	 return $resource(this._deleteExamPaperUrl+"?id="+examId).get();
        	
        };
        this.url = UrlConfigService.urlConfig.examPaper.list;
        BaseListService.call(this, UrlConfigService.urlConfig.examPaper.list, $resource, $q, $http, _schema,this.url);
    }

    ExamPaperManageService.prototype = Object.create(BaseListService.prototype);
    ExamPaperManageService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('ExamPaperManageService', ExamPaperManageService);
})(angular);


