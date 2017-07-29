/**
 * Created by 陈帅 on 2017/2/15.
 */
Date.prototype.Format = function (fmt) { // 时间格式化方法
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
MetronicApp.controller("AnswerManageController", ['$rootScope', '$scope','$uibModal', '$location', 'EnumService', 'AnswerManageService','toastr',
    function ($rootScope, $scope,$uibModal, $location, EnumService, AnswerManageService,toastr) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initAjax();
            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        $scope.columns = AnswerManageService.getSchema();
        
        $scope.pageable = AnswerManageService.getPageable();
        $scope.selectable = true;
        $scope.$watch('pageable.size', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            AnswerManageService.setSize(newVal);
            $scope.search();
        });
        $scope.$watch('pageable.number', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            AnswerManageService.setStoredPage(newVal);
            $scope.search();
        });
        
        AnswerManageService.getQuestions().$promise.then(function (res) {
          	$scope.questions=res.data;
       
          });
      // ----------------获取下拉信息结束
        $scope.list = function () {
            AnswerManageService.list(function (res) {
                if ('success' == res.status) {
                	$scope.rows = res.data;
                }else {
                 
                        toastr.error("", "数据获取失败!");
                   
                }
            });
        };
       
        var gotoFirstPage = function () {
            AnswerManageService.setStoredPage(0);
            $scope.list();
        };
       
      
        // 跳转到新增页面
        $scope.create = function () {
            $location.path("/answer/add.html").search({});
        };
        // 跳转到编辑页面
        $scope.edit = function (id) {
            $location.path("/answer/edit.html").search({id:id});
        };
        $scope.resetSearchable=function(){
        	$scope.searchable={
            		aQid:0,
            		aScore:0,
            }
        }
        // 查询
        // 查询条件初始化
        $scope.searchable={
        		aQid:0,
        		aScore:0,
        		
        }
        $scope.search = function () {
        	AnswerManageService.putSearchParams($scope.searchable);
            $scope.list();
            AnswerManageService.setStoredPage(0);
            AnswerManageService.clearSearchParams();
        };
        $scope.search();
        // 删除
        $scope.delete = function (row) {
        	var modalInstance = $uibModal.open({
                templateUrl: 'confirm.html',
                controller: ["$scope", "$uibModalInstance", function (scope, $uibModalInstance) {
                    scope.confirmContent = '确定删除此答案吗？';
                    scope.btn_ok = function () {
                        $uibModalInstance.close(row);
                    };
                    scope.btn_cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }]
            });
            modalInstance.result.then(function (id) {
                AnswerManageService.deleteAnswer(id).$promise.then(function (result) {
                    if (true == result.status) {
                        toastr.success("", "答案删除成功");
                        $location.path('/answerManage/list.html').search({});
                    } else {
                       toastr.error("", "转换器删除失败");
                    }
                    $scope.search();
                });
            });
        };



    }])


    .controller('AnswerManageCreateController',
        ['$rootScope','$scope','$location','$uibModal','toastr','AnswerManageCreateService','EnumService',"$filter",
            function($rootScope,$scope,$location,$uibModal,toastr,AnswerManageCreateService,EnumService,$filter){
                $scope.$on('$viewContentLoaded', function () {
                    // initialize core components
                    Metronic.initAjax();
                });
                
                
              // ----------------获取下拉信息结束
                var id=$location.search().id;
                if(id!=null){
                	 // 从数据库找对象...........
                	AnswerManageCreateService.getQuestions().$promise.then(function (res) {
                       	$scope.questions=res.data;
                        AnswerManageCreateService.findEditAnswer(id).$promise.then(function (result) {
                            $scope.model=result.answer;
                            
                         });
                     });
                	
                	
                }else{
                	AnswerManageCreateService.getQuestions().$promise.then(function (res) {
                       	$scope.questions=res.data;
                	 });
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
                			 AnswerManageCreateService.addAnswer($scope.model).$promise.then(function (result) {
                          
                              if (true == result.status) {
                              toastr.success("", "保存成功！");
                              $location.path("/answerManage/list.html").search({});
                              }else{
                           
                              toastr.error("", result.message);
                             
                              }
                             
                              });
                		}else{               //编辑
                			AnswerManageCreateService.editAnswer($scope.model).$promise.then(function (result) {
                             if (true == result.status) {
                              toastr.success("", "保存成功！");
                              if(result.message!=null)
                              toastr.success("", result.message);
                              $location.path("/answerManage/list.html").search({});
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
                    $location.path("/answerManage/list.html").search({});
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
