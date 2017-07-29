/**
 * Created by 陈帅 on 2017/2/15.
 */

MetronicApp.controller("EvaluationManageController", ['$rootScope', '$scope','$uibModal', '$location', 'EnumService', 'EvaluationManageService','toastr',
    function ($rootScope, $scope,$uibModal, $location, EnumService, EvaluationManageService,toastr) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initAjax();
            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        $scope.columns = EvaluationManageService.getSchema();
        $scope.columnsBackUp=angular.copy($scope.columns);
        $scope.pageable = EvaluationManageService.getPageable();
        $scope.selectable = true;
        $scope.$watch('pageable.size', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            EvaluationManageService.setSize(newVal);
            $scope.search();
        });
        $scope.$watch('pageable.number', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            EvaluationManageService.setStoredPage(newVal);
            $scope.search();
        });
        EvaluationManageService.getTeachers().$promise.then(function (res) {
           	$scope.teachers=res.teachers;
         });
        EvaluationManageService.getUser().$promise.then(function (res) {
           	$scope.user=res.user;
           	if($scope.user!=null){
           		if($scope.user.level==1){       //学生
           			$scope.searchable={
                     		teaId:0,
                     		curName:"",
                     		term:"",
                     		stuId:$scope.user.userId,
                     		groupId:0
                     };
           		}else if($scope.user.level==0){       //admin
           			$scope.searchable={
                     		teaId:0,
                     		curName:"",
                     		term:"",
                     		stuId:0,
                     		groupId:0
                     };
           			$scope.columns=angular.copy($scope.columnsBackUp);
           			$scope.columns.push({name: '查看', label: '查看详细', type: 'template', templateUrl: 'operation.html',width:'100px'});
           		}else if($scope.user.level==2){     //老师
           			$scope.searchable={
                     		teaId:$scope.user.userId,
                     		curName:"",
                     		term:"",
                     		stuId:0,
                     		groupId:0
                     }; 
           		}else if($scope.user.level==3){     //督导组
           			$scope.searchable={
                     		teaId:0,
                     		curName:"",
                     		term:"",
                     		stuId:0,
                     		groupId:$scope.user.userId
                     };
           		}
           	 $scope.searchBackUp=angular.copy($scope.searchable);
           	 $scope.search();
           	}else{
           		location.href="toLogin"
           	}
         });
        $scope.list = function () {
            EvaluationManageService.list(function (res) {
                if ('success' == res.status) {
                	$scope.rows = res.data;
                }else {
                    toastr.error("", "数据获取失败!");
                }
            });
        };
       
        var gotoFirstPage = function () {
            EvaluationManageService.setStoredPage(0);
            $scope.list();
        };
        $scope.resetSearchable=function(){
        	$scope.searchable=angular.copy($scope.searchBackUp);
        }
     // 跳转到编辑页面
        $scope.edit = function (id) {
        	$location.path("/evaluation/edit.html").search({cIds:id});
        };
       
        // 查询
        $scope.search = function () {
        	EvaluationManageService.putSearchParams($scope.searchable);
            $scope.list();
            EvaluationManageService.setStoredPage(0);
            EvaluationManageService.clearSearchParams();
        };
       
        



    }])


    .controller('EvaluationManageCreateController',
        ['$rootScope','$scope','$location','$uibModal','toastr','EvaluationManageCreateService','EnumService','$http',"$filter",
            function($rootScope,$scope,$location,$uibModal,toastr,EvaluationManageCreateService,EnumService,$filter){
                $scope.$on('$viewContentLoaded', function () {
                    // initialize core components
                    Metronic.initAjax();
                });
                $scope.model={};
                
//               ----------------获取下拉信息结束
                var cIds=$location.search().cIds;
                var cIdsStr=""
                for(var i=0;i<cIds.length;i++){
                	cIdsStr+=cIds[i];
                	if(i!=cIds.length-1){
                		cIdsStr+=",";
                	}
                }
                EvaluationManageCreateService.findDetail(cIdsStr).$promise.then(function (res) {
                	$scope.stus=res.detail.stus;
                	$scope.sups=res.detail.sups;
                });
                $scope.submit = function (form) {
                	
                	form.$submitted = true;
                    // 如果表单都校验通过，则发送请求
                    if (form.$valid) {
                        toastr.success("", "保存成功！");
                        EvaluationManageCreateService.addEvaluation($scope.model).$promise.then(function (result) {
                         if ('success' == result.result) {
                         toastr.success("", "保存成功！");
                         }else{
                         
                         toastr.error("", "保存失败");
                         
                         }
                         $location.path("/evaluation/list.html").search({});
                         });
                       
                    }
                };

                // 重置
                
                $scope.reset = function () {
                    $scope.model = angular.copy($scope.authorityModel);
                    $scope.form.$submitted = false;
                    // angular.forEach($scope.model,function(data,index){
                    // $scope.model[index] = null;
                    // });

                    $scope.form.$setUntouched();// 清除表单touched事件
                };
                $scope.back = function(){
                    $location.path("/evaluation/list.html").search({});
                };

            }])
    .filter('nodeTypeFilter',["EnumService",function(EnumService){
        return function (value) {
            var formEnum = EnumService.get("nodesType");
            var type = _.find(formEnum,function(result){
                return result.key == value;
            });
            if(!type){
                return "未知";
            }else {
                return type.text;
            }
        }
    }]);
