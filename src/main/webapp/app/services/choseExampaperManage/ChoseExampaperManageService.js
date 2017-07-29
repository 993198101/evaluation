(function (angular) {
    function ChoseExampaperManageService($resource, $q, $http, UrlConfigService) {
        var _schema = [
             {name: 'curId', label: '序号', type: 'seq'},
             {name: 'curName', label: '课程名', sortable: false},
             {name: 'curSexamId', label: '学生评教卷子号', sortable: false},
             {name: 'curGexamId', label: '督导组评教卷子号', sortable: false},
             {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
        ];

      //删除测评
        this._deleteProjectUrl = UrlConfigService.urlConfig.project.deleteProjectUrl;
        this.deleteProject= function (id) {
        	
        	return $resource(this._deleteProjectUrl+"?curId="+id).delete();
        };
        this.url = UrlConfigService.urlConfig.project.list;
        BaseListService.call(this, UrlConfigService.urlConfig.project.list, $resource, $q, $http, _schema,this.url);
        
       
      


    }

    ChoseExampaperManageService.prototype = Object.create(BaseListService.prototype);
    ChoseExampaperManageService.$inject = ['$resource', '$q', '$http', 'UrlConfigService'];
    angular.module('MetronicApp').service('ChoseExampaperManageService', ChoseExampaperManageService);
})(angular);


