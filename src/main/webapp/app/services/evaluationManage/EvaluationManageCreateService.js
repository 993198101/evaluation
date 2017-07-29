(function(angular) {
	function EvaluationManageCreateService($resource, $q, $http,
			UrlConfigService) {
		 var _schema = [
		                {type:'checkbox', label:'checkbox', sortable: false},
		                {name: 'evaId', label: '序号', type: 'seq'},
		                {name: 'name', label: '测评名', sortable: false},
		                {name:'teacherName',label: '老师名', sortable: false},
		                {name:'date',label: '测试时间', sortable: false},
		                {name:'examId',label: '卷子id', sortable: false},
		                {name:'finishedStr',label: '是否完成', sortable: false},
		                {name: '操作', label: '操作', type: 'template', templateUrl: 'operation.html',width:'200px'}
		            ];
		this.url = UrlConfigService.urlConfig.evaluation.classes;
		BaseListService.call(this,
				UrlConfigService.urlConfig.evaluation.classes, $resource, $q,
				$http, _schema, this.url);
		 //获取班级
        this._findDetailUrl = UrlConfigService.urlConfig.evaluation.findDetailUrl;
        this.findDetail = function (cIds) {
            return $resource(this._findDetailUrl+"?cIdsStr="+cIds).save();
        };

	}
	EvaluationManageCreateService.prototype = Object
			.create(BaseListService.prototype);
	EvaluationManageCreateService.$inject = [ '$resource', '$q', '$http',
			'UrlConfigService' ];
	angular.module('MetronicApp').service('EvaluationManageCreateService',
			EvaluationManageCreateService);

})(angular);
