/**
 * Created by 陈帅 on 2017/2/15.
 */

MetronicApp.controller("ChoseManageController", ['$rootScope', '$scope','$uibModal', '$location', 'EnumService', 'ChoseManageService','toastr',
    function ($rootScope, $scope,$uibModal, $location, EnumService, ChoseManageService,toastr) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initAjax();
            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        $scope.columns = ChoseManageService.getSchema();
        
        $scope.pageable = ChoseManageService.getPageable();
        $scope.selectable = true;
        $scope.$watch('pageable.size', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            $scope.search();
            ChoseManageService.setSize(newVal);
            
        });
        $scope.$watch('pageable.number', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            ChoseManageService.setStoredPage(newVal);
            $scope.search();
        });
        
        ChoseManageService.getStudents().$promise.then(function (res) {
          	$scope.students=res.students;
       
        });
        ChoseManageService.getTeachers().$promise.then(function (res) {
          	$scope.teachers=res.teachers;
       
        });
        ChoseManageService.getCurriculums().$promise.then(function (res) {
          	$scope.curs=res.curs;
       
        });
      // ----------------获取下拉信息结束
        $scope.list = function () {
            ChoseManageService.list(function (res) {
            	if ('success' == res.status) {
                	$scope.rows = res.evaArranges;
                }else {
                 toastr.error("", "数据获取失败!");
                }
            });
        };
       
        var gotoFirstPage = function () {
            ChoseManageService.setStoredPage(0);
            $scope.list();
        };
       
      
        // 跳转到新增页面
        $scope.create = function () {
            $location.path("/choseManage/add.html").search({});
        };
        // 跳转到编辑页面
        $scope.edit = function (id) {
        	$location.path("/choseManage/edit.html").search({id:id});
        };
        $scope.resetSearchable=function(){
        	$scope.searchable={
            		stuId:0,
            		groupId:0
            		
            		
            }
        }
        // 查询
        // 查询条件初始化
        $scope.searchable={
        		stuId:0,
        		groupId:0
        		
        		
        }
        $scope.search = function () {
        	ChoseManageService.putSearchParams($scope.searchable);
            $scope.list();
            ChoseManageService.setStoredPage(0);
            ChoseManageService.clearSearchParams();
        };
        $scope.search();
        // 删除
        $scope.delete = function (row) {
        	var modalInstance = $uibModal.open({
                templateUrl: 'confirm.html',
                controller: ["$scope", "$uibModalInstance", function (scope, $uibModalInstance) {
                    scope.confirmContent = '确定删除此评教安排吗？';
                    scope.btn_ok = function () {
                        $uibModalInstance.close(row);
                    };
                    scope.btn_cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }]
            });
            modalInstance.result.then(function (id) {
                ChoseManageService.deleteArrange(id).$promise.then(function (result) {
                    if (true == result.result) {
                        toastr.success("", "问题删除成功");
                        $location.path('/choseManage/list.html').search({});
                    } else {
                       toastr.error("", result.message);
                    }
                    $scope.search();
                });
            });
        };



    }])


    .controller('ChoseManageCreateController',
        ['$rootScope','$scope','$location','$uibModal','toastr','ChoseManageCreateService','EnumService',"$filter",
            function($rootScope,$scope,$location,$uibModal,toastr,ChoseManageCreateService,EnumService,$filter){
                $scope.$on('$viewContentLoaded', function () {
                    // initialize core components
                    Metronic.initAjax();
                });
                
                $scope.model={};
                ChoseManageCreateService.getStudents().$promise.then(function (res) {
                  	$scope.students=res.students;
               
                });
                ChoseManageCreateService.getTeachers().$promise.then(function (res) {
                  	$scope.teachers=res.teachers;
               
                });
                ChoseManageCreateService.getCurriculums().$promise.then(function (res) {
                  	$scope.curs=res.curs;
               
                });
              // ----------------获取下拉信息结束
                var id=$location.search().id;
                if(id!=null){
                	 // 从数据库找对象...........
                	
                	 ChoseManageCreateService.findEditArrange(id).$promise.then(function (result) {
                		 $scope.model=result.arrange;
                        
                      });
                }else{
                    $scope.model={
                        cId:0,
                    }
                }
              
                // 提交
                $scope.submit = function (form) {
                	form.$submitted = true;
                    // 如果表单都校验通过，则发送请求
                	if (form.$valid) {
                		ChoseManageCreateService.addArrange($scope.model).$promise.then(function (result) {
                              if (true == result.result) {
                              toastr.success("", "保存成功！");
                              $location.path("/choseManage/list.html").search({});
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
                    $location.path("/choseManage/list.html").search({});
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
