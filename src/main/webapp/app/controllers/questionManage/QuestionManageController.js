/**
 * Created by 陈帅 on 2017/2/15.
 */

MetronicApp.controller("QuestionManageController", ['$rootScope', '$scope','$uibModal', '$location', 'EnumService', 'QuestionManageService','toastr',
    function ($rootScope, $scope,$uibModal, $location, EnumService, QuestionManageService,toastr) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initAjax();
            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        $scope.columns = QuestionManageService.getSchema();
        
        $scope.pageable = QuestionManageService.getPageable();
        $scope.selectable = true;
        $scope.$watch('pageable.size', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            $scope.search();
            QuestionManageService.setSize(newVal);
            
        });
        $scope.$watch('pageable.number', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            QuestionManageService.setStoredPage(newVal);
            $scope.search();
        });
        
        QuestionManageService.getQuestions().$promise.then(function (res) {
          	$scope.questions=res.data;
       
          });
      // ----------------获取下拉信息结束
        $scope.list = function () {
            QuestionManageService.list(function (res) {
            	if ('success' == res.status) {
                	$scope.rows = res.data;
                }else {
                 toastr.error("", "数据获取失败!");
                }
            });
        };
       
        var gotoFirstPage = function () {
            QuestionManageService.setStoredPage(0);
            $scope.list();
        };
       
      
        // 跳转到新增页面
        $scope.create = function () {
            $location.path("/questionManage/add.html").search({});
        };
        // 跳转到编辑页面
        $scope.edit = function (id) {
        	$location.path("/questionManage/edit.html").search({id:id});
        };
        $scope.resetSearchable=function(){
        	$scope.searchable={
            		qId:0
            }
        }
        // 查询
        // 查询条件初始化
        $scope.searchable={
        		qId:0
        		
        		
        }
        $scope.search = function () {
        	QuestionManageService.putSearchParams($scope.searchable);
        	$scope.list();
        	QuestionManageService.setStoredPage(0);
            
            QuestionManageService.clearSearchParams();
        };
        $scope.search();
        // 删除
        $scope.delete = function (row) {
        	var modalInstance = $uibModal.open({
                templateUrl: 'confirm.html',
                controller: ["$scope", "$uibModalInstance", function (scope, $uibModalInstance) {
                    scope.confirmContent = '确定删除此问题吗？';
                    scope.btn_ok = function () {
                        $uibModalInstance.close(row);
                    };
                    scope.btn_cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }]
            });
            modalInstance.result.then(function (id) {
                QuestionManageService.deleteQuestion(id).$promise.then(function (result) {
                    if (true == result.status) {
                        toastr.success("", "问题删除成功");
                        $location.path('/questionManage/list.html').search({});
                    } else {
                       toastr.error("", "问题删除失败,此问题已被他人删除");
                    }
                    $scope.search();
                });
            });
        };



    }])


    .controller('QuestionManageCreateController',
        ['$rootScope','$scope','$location','$uibModal','toastr','QuestionManageCreateService','EnumService',"$filter",
            function($rootScope,$scope,$location,$uibModal,toastr,QuestionManageCreateService,EnumService,$filter){
                $scope.$on('$viewContentLoaded', function () {
                    // initialize core components
                    Metronic.initAjax();
                });
                
                $scope.model={};
                QuestionManageCreateService.getQuestions().$promise.then(function (res) {
                  	$scope.questions=res.data;
               
                  });
              // ----------------获取下拉信息结束
                var id=$location.search().id;
                if(id!=null){
                	 // 从数据库找对象...........
                	
                	 QuestionManageCreateService.findEditQuestion(id).$promise.then(function (result) {
                         $scope.model=result.question;
                        
                      });
                }else{
                    $scope.model={
                        id:0,
                    }
                }
              
                // 提交
                $scope.submit = function (form) {
                	form.$submitted = true;
                    // 如果表单都校验通过，则发送请求
                	if (form.$valid) {
                		if($scope.model.id==0){         //新增
                			 QuestionManageCreateService.addQuestion($scope.model.qContent).$promise.then(function (result) {
                          
                              if (true == result.result) {
                              toastr.success("", "保存成功！");
                              $location.path("/questionManage/list.html").search({});
                              }else{
                           
                              toastr.error("", "内容重复");
                             
                              }
                             
                              });
                		}else{               //编辑
                			QuestionManageCreateService.editQuestion($scope.model.qContent,$scope.model.qId).$promise.then(function (result) {
                              if (true == result.result) {
                              toastr.success("", "保存成功！");
                              if(result.message!=null)
                              toastr.success("", result.message);
                              $location.path("/questionManage/list.html").search({});
                              }else{
                           
                              toastr.error("", result.message);
                             
                              }
                             
                              });
                		}
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
                    $location.path("/questionManage/list.html").search({});
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
