(function (angular) {
    function AnswerManageService($resource, $q, $http, UrlConfigService) {
        var _schema = [
             {name: 'aId', label: '序号', type: 'seq'},
            {name: 'aContent', label: '内容', sortable: false},
            {name:'aQid',label: '题号', sortable: false},
            {name:'aScore',label: '分数', sortable: false},
            {name:'aOrder',label: 'order', sortable: false},
            {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];
        //获取班级
      //获取题目
        this._getQuestionUrl = UrlConfigService.urlConfig.answer.getQuestionUrl;
        this.getQuestions = function () {
        	 return $resource(this._getQuestionUrl).get();
        	
        };
      //删除测评
        this._deleteAnswerUrl = UrlConfigService.urlConfig.answer.deleteAnswerUrl;
        this.deleteAnswer = function (id) {
        	
            return $resource(this._deleteAnswerUrl+"?id="+id).delete();
        };
        this.url = UrlConfigService.urlConfig.answer.list;
        BaseListService.call(this, UrlConfigService.urlConfig.answer.list, $resource, $q, $http, _schema,this.url);

       
      


    }

    AnswerManageService.prototype = Object.create(BaseListService.prototype);
    AnswerManageService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('AnswerManageService', AnswerManageService);
})(angular);


