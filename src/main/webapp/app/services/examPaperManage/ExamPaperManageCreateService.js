(function (angular) {
    function ExamPaperManageCreateService($resource, $q, $http, UrlConfigService) {
        var _schema = [
          
            {name: 'aId', label: '序号', type: 'seq'},
            {name: 'aContent', label: '内容', sortable: false},
            {name:'aQid',label: '题号', sortable: false},
            {name:'aScore',label: '分数', sortable: false},
            {name:'aOrder',label: 'order', sortable: false},
            {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];
    
        //提交请求，新增ExamPaper
        this._addExamPaperUrl = UrlConfigService.urlConfig.examPaper.addExamPaperUrl;
        this.addExamPaper = function (examName,examQuestions) {
        	console.log(examName)
        	 return $resource(this._addExamPaperUrl+"?examName="+examName+"&examQuestions="+examQuestions).save();
        	
        };
      //获得编辑answer
        this._getExamPaperUrl = UrlConfigService.urlConfig.examPaper.getExamPaperUrl;
        this.getExamPaper = function (id) {
        	 return $resource(this._getExamPaperUrl,{"id":"@id"}).get({"id":id});
        	
        };
        //获取题目
        this._getQuestionUrl = UrlConfigService.urlConfig.answer.getQuestionUrl;
        this.getQuestions = function () {
        	 return $resource(this._getQuestionUrl).get();
        	
        };
        //提交编辑的请求
        this._editExamPaperUrl = UrlConfigService.urlConfig.examPaper.editExamPaperUrl;
        this.editExamPaper = function (examId,examName,examQuestion) {
        	 return $resource(this._editExamPaperUrl+"?examId="+examId+"&examName="+examName+"&examQuestion="+examQuestion).get();
        	
        };
      
        
        this.url = UrlConfigService.urlConfig.answer.list;
        BaseListService.call(this, UrlConfigService.urlConfig.answer.list, $resource, $q, $http, _schema,this.url);

       
      


    }

    ExamPaperManageCreateService.prototype = Object.create(BaseListService.prototype);
    ExamPaperManageCreateService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('ExamPaperManageCreateService', ExamPaperManageCreateService);
})(angular);


