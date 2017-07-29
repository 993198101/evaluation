(function (angular) {
    function ChoseExampaperManageCreateService($resource, $q, $http, UrlConfigService) {
        var _schema = [
          
            {name: 'aId', label: '序号', type: 'seq'},
            {name: 'aContent', label: '内容', sortable: false},
            {name:'aQid',label: '题号', sortable: false},
            {name:'aScore',label: '分数', sortable: false},
            {name:'aOrder',label: 'order', sortable: false},
            {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];
    
      //获取编辑Project
        this._findEditProjectUrl = UrlConfigService.urlConfig.project.findEditProjectUrl;
        this.findEditProject = function (id) {
        	
        	 return $resource(this._findEditProjectUrl,{"curId":id},{"getData": {"method": "GET"}}).getData();
        	
        };
        //提交请求，新增Project
        this._addProjectUrl = UrlConfigService.urlConfig.project.addProjectUrl;
        this.addProject = function (object) {
        	 return $resource(this._addProjectUrl+"?curId="+object.curId+"&curName="+object.curName+"&curSexamId="+object.curSexamId+"&curGexamId="+object.curSexamId).save();
        	
        };
       //获得所有卷子
        this._getExamPapersUrl = UrlConfigService.urlConfig.examPaper.list;
        this.getExamPapers=function(){
        	return $resource(this._getExamPapersUrl+"?page=-1&size=-1&s_examQuestions=0").get();
        }
        
        this.url = UrlConfigService.urlConfig.answer.list;
        BaseListService.call(this, UrlConfigService.urlConfig.answer.list, $resource, $q, $http, _schema,this.url);
    }

    ChoseExampaperManageCreateService.prototype = Object.create(BaseListService.prototype);
    ChoseExampaperManageCreateService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('ChoseExampaperManageCreateService', ChoseExampaperManageCreateService);
})(angular);


