(function (angular) {
    function QuestionManageService($resource, $q, $http, UrlConfigService) {
        var _schema = [
             {name: 'qId', label: '序号', type: 'seq'},
            {name: 'qContent', label: '内容', sortable: false},
            {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];
       
      //获取题目
        this._getQuestionUrl = UrlConfigService.urlConfig.answer.getQuestionUrl;
        this.getQuestions = function () {
        	 return $resource(this._getQuestionUrl).get();
        	
        };
      //删除测评
        this._deleteQuestionUrl = UrlConfigService.urlConfig.question.deleteQuestionUrl;
        this.deleteQuestion = function (id) {
        	
        	return $resource(this._deleteQuestionUrl+"?id="+id).delete();
        };
        this.url = UrlConfigService.urlConfig.question.list;
        BaseListService.call(this, UrlConfigService.urlConfig.question.list, $resource, $q, $http, _schema,this.url);

       
      


    }

    QuestionManageService.prototype = Object.create(BaseListService.prototype);
    QuestionManageService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('QuestionManageService', QuestionManageService);
})(angular);


