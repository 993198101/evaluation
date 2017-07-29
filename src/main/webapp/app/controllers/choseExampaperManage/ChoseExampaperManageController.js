/**
 * Created by 陈帅 on 2017/2/15.
 */

MetronicApp.controller("ChoseExampaperManageController", ['$rootScope', '$scope','$uibModal', '$location', 'EnumService', 'ChoseExampaperManageService','toastr',
    function ($rootScope, $scope,$uibModal, $location, EnumService, ChoseExampaperManageService,toastr) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initAjax();
            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        $scope.columns = ChoseExampaperManageService.getSchema();
        
        $scope.pageable = ChoseExampaperManageService.getPageable();
        $scope.selectable = true;
        $scope.$watch('pageable.size', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            $scope.search();
            ChoseExampaperManageService.setSize(newVal);
            
        });
        $scope.$watch('pageable.number', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            ChoseExampaperManageService.setStoredPage(newVal);
            $scope.search();
        });
        
      // ----------------获取下拉信息结束
        $scope.list = function () {
            ChoseExampaperManageService.list(function (res) {
            	console.log(res);
            	if ('success' == res.status) {
                	$scope.rows = res.projects;
                }else {
                 toastr.error("", "无数据!");
                }
            });
        };
       
        var gotoFirstPage = function () {
            ChoseExampaperManageService.setStoredPage(0);
            $scope.list();
        };
       
      
        // 跳转到新增页面
        $scope.create = function () {
            $location.path("/choseExampaperManage/add.html").search({});
        };
        // 跳转到编辑页面
        $scope.edit = function (id) {
        	$location.path("/choseExampaperManage/edit.html").search({id:id});
        };
        $scope.resetSearchable=function(){
        	$scope.searchable={
            		curName:null
            }
        }
        // 查询
        // 查询条件初始化
        $scope.searchable={
        		curName:null
        }
        $scope.search = function () {
        	ChoseExampaperManageService.putSearchParams($scope.searchable);
            $scope.list();
            ChoseExampaperManageService.setStoredPage(0);
            ChoseExampaperManageService.clearSearchParams();
        };
        $scope.search();
        // 删除
        $scope.delete = function (row) {
        	var modalInstance = $uibModal.open({
                templateUrl: 'confirm.html',
                controller: ["$scope", "$uibModalInstance", function (scope, $uibModalInstance) {
                    scope.confirmContent = '确定删除此安排吗？';
                    scope.btn_ok = function () {
                        $uibModalInstance.close(row);
                    };
                    scope.btn_cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }]
            });
            modalInstance.result.then(function (id) {
                ChoseExampaperManageService.deleteProject(id).$promise.then(function (result) {
                    if (true == result.result) {
                        toastr.success("", "学科删除成功");
                        $location.path('/choseExampaperManage/list.html').search({});
                    } else {
                       toastr.error("", result.message);
                    }
                    $scope.search();
                });
            });
        };



    }])


    .controller('ChoseExampaperManageCreateController',
        ['$rootScope','$scope','$location','$uibModal','toastr','ChoseExampaperManageCreateService','EnumService',"$filter",
            function($rootScope,$scope,$location,$uibModal,toastr,ChoseExampaperManageCreateService,EnumService,$filter){
                $scope.$on('$viewContentLoaded', function () {
                    // initialize core components
                    Metronic.initAjax();
                });
                
                $scope.model={};
                ChoseExampaperManageCreateService.getExamPapers().$promise.then(function (res) {
                  
                	$scope.examPapers=res.examPapers;
               
                });
              // ----------------获取下拉信息结束
                var id=$location.search().id;
                if(id!=null){
                	 // 从数据库找对象...........
                	 ChoseExampaperManageCreateService.findEditProject(id).$promise.then(function (result) {
                		 $scope.model=result.project;
                        console.log(result)
                      });
                }else{
                    $scope.model={
                        curId:0,
                    }
                }
              
                // 提交
                $scope.submit = function (form) {
                	form.$submitted = true;
                    // 如果表单都校验通过，则发送请求
                	if (form.$valid) {
                		ChoseExampaperManageCreateService.addProject($scope.model).$promise.then(function (result) {
                              if (true == result.result) {
                              toastr.success("", "保存成功！");
                              $location.path("/choseExampaperManage/list.html").search({});
                              }else{
                              if(result.message==null){
                            	  toastr.error("", "内容重复");
                                  
                              }else{
                            	  toastr.error("", result.message);
                              }
                              }
                              
                             
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
                    $location.path("/choseExamPaperManage/list.html").search({});
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
