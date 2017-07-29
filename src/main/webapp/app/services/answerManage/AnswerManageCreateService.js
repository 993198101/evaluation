(function (angular) {
    function AnswerManageCreateService($resource, $q, $http, UrlConfigService) {
        var _schema = [
          
            {name: 'aId', label: '序号', type: 'seq'},
            {name: 'aContent', label: '内容', sortable: false},
            {name:'aQid',label: '题号', sortable: false},
            {name:'aScore',label: '分数', sortable: false},
            {name:'aOrder',label: 'order', sortable: false},
            {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];
      //获取编辑answer
        this._findEditAnswerUrl = UrlConfigService.urlConfig.answer.findEditAnswerUrl;
        this.findEditAnswer = function (id) {
        	 return $resource(this._findEditAnswerUrl,{"aId":id},{"getData": {"method": "GET"}}).getData();
        	
        };
        //提交请求，新增answer
        this._addAnswerUrl = UrlConfigService.urlConfig.answer.addAnswerUrl;
        this.addAnswer = function (object) {
        	 return $resource(this._addAnswerUrl).save(object);
        	
        };
      //提交请求，编辑answer
        this._editAnswerUrl = UrlConfigService.urlConfig.answer.editAnswerUrl;
        this.editAnswer = function (object) {
        	 return $resource(this._editAnswerUrl).save(object);
        	
        };
        //获取题目
        this._getQuestionUrl = UrlConfigService.urlConfig.answer.getQuestionUrl;
        this.getQuestions = function () {
        	 return $resource(this._getQuestionUrl).get();
        	
        };
        
        this.url = UrlConfigService.urlConfig.answer.list;
        BaseListService.call(this, UrlConfigService.urlConfig.answer.list, $resource, $q, $http, _schema,this.url);

       
      


    }

    AnswerManageCreateService.prototype = Object.create(BaseListService.prototype);
    AnswerManageCreateService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('AnswerManageCreateService', AnswerManageCreateService);
})(angular);


