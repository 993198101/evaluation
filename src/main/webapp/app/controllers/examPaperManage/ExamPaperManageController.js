/**
 * Created by 陈帅 on 2017/2/15.
 */
function arrSort(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			 if(arr[j] > arr[j + 1]){    //把小的值交换到后面
				var temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	return arr;
}
MetronicApp.controller("ExamPaperManageController", ['$rootScope', '$scope','$uibModal', '$location', 'EnumService', 'ExamPaperManageService','toastr',
    function ($rootScope, $scope,$uibModal, $location, EnumService, ExamPaperManageService,toastr) {
		$scope.$on('$viewContentLoaded', function () {
            Metronic.initAjax();
            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        $scope.columns = ExamPaperManageService.getSchema();
        
        $scope.pageable = ExamPaperManageService.getPageable();
        $scope.selectable = true;
        $scope.$watch('pageable.size', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            ExamPaperManageService.setSize(newVal);
            $scope.search();
        });
        $scope.$watch('pageable.number', function (newVal, oldVal) {
            if (newVal == oldVal) return;
            ExamPaperManageService.setStoredPage(newVal);
            $scope.search();
        });
        
        ExamPaperManageService.getQuestions().$promise.then(function (res) {
          	$scope.questions=res.data;
       
          });
      // ----------------获取下拉信息结束
        $scope.list = function () {
            ExamPaperManageService.list(function (res) {
            	if ('success' == res.status) {
                	$scope.rows = res.examPapers;
                }else {
                 toastr.error("", "数据获取失败!");
                }
            });
        };
       
        var gotoFirstPage = function () {
            ExamPaperManageService.setStoredPage(0);
            $scope.list();
        };
       
      
        // 跳转到新增页面
        $scope.create = function () {
            $location.path("/examPaperManage/add.html").search({});
        };
        // 跳转到编辑页面
        $scope.edit = function (id) {
            $location.path("/examPaperManage/edit.html").search({id:id});
        };
        $scope.resetSearchable=function(){
        	$scope.searchable={
        			examQuestions:[0]
            }
        	for(var i=0;i<$scope.check.length;i++){
        		$scope.check[i]=false;               // 所谓checkbox清空
        	}
        }
        // 查询
        // 查询条件初始化
        $scope.searchable={
        		examQuestions:[0]
        		
        }
        
        $scope.check=new Array();// check是否被选中
        $scope.chooseQuestion=function(id,check){
        	if(check==true){
        		$scope.searchable.examQuestions.push(id);
        	}else{
        		$scope.searchable.examQuestions.forEach(function(x,index){
        			if($scope.searchable.examQuestions[index]==id)
        			$scope.searchable.examQuestions.splice(index,1);
        		});
        	}
        	
        }
        $scope.search = function () {
        	if($scope.searchable.examQuestions.length>1){
        		$scope.searchable.examQuestions.splice(0,1);
        	}
        	ExamPaperManageService.putSearchParams($scope.searchable);
            $scope.list();
            ExamPaperManageService.setStoredPage(0);
            ExamPaperManageService.clearSearchParams();
        };
        $scope.search();
        // 删除
        $scope.delete = function (row) {
        	var modalInstance = $uibModal.open({
                templateUrl: 'confirm.html',
                controller: ["$scope", "$uibModalInstance", function (scope, $uibModalInstance) {
                    scope.confirmContent = '确定删除此卷子吗？';
                    scope.btn_ok = function () {
                        $uibModalInstance.close(row);
                    };
                    scope.btn_cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }]
            });
            modalInstance.result.then(function (id) {
                ExamPaperManageService.deleteExamPaper(id).$promise.then(function (result) {
                    if (true == result.result) {
                        toastr.success("", "卷子删除成功");
                        $location.path('/examPaperManage/list.html').search({});
                    } else {
                       toastr.error("", result.message);
                    }
                    $scope.search();
                });
            });
        };



    }])


    .controller('ExamPaperManageCreateController',
        ['$rootScope','$scope','$location','$uibModal','toastr','ExamPaperManageCreateService','EnumService',"$filter",
            function($rootScope,$scope,$location,$uibModal,toastr,ExamPaperManageCreateService,EnumService,$filter){
                $scope.$on('$viewContentLoaded', function () {
                    // initialize core components
                    Metronic.initAjax();
                });
                // 获取问题checkbox
                $scope.save=true;
                ExamPaperManageCreateService.getQuestions().$promise.then(function (res) {
                  	$scope.questions=res.data;
               
                  });
         
                var id=$location.search().id;
                if(id!=null){               // 是编辑不是新增
                	 // 从数据库找对象...........
                	 
                	 ExamPaperManageCreateService.getExamPaper(id).$promise.then(function (result) {
                         var examQuestionStr=result.examPaper.examQuestion;
                         var examQuestionArr=examQuestionStr.split(",");
                         var intArr=new Array();
                         for(var i=0;i<examQuestionArr.length;i++){    // 字符串转数字数组
                        	 intArr[i]=parseInt(examQuestionArr[i])
                         }
                         $scope.model={                              // 初始化
                        		 id:result.examPaper.examId,
                        		 examQuestions:intArr,
                        		 examName:result.examPaper.examName
                         }
                         $scope.authorityModel=angular.copy($scope.model);   // 做备份重置时使用,记录名字
                         $scope.intArrs=angular.copy(intArr);                // 和数组问题选择
                       // 画上对号
                        for(var j=0;j<intArr.length;j++){
                        		 
                        $scope.checked[(intArr[j])]=true;
                        		
                       }
                     
                      });
                }else{
                	
                    $scope.model={
                        id:0,
                        examQuestions:[0]
                    }
                }
                $scope.checked=new Array();
                $scope.check=new Array();// check是否被选中
                $scope.chooseQuestion=function(id,check){  // 选中的加入查询条件
                	if(check==true){
                		$scope.model.examQuestions.push(id);
                	}else{
                		$scope.model.examQuestions.forEach(function(x,index){
                			if($scope.model.examQuestions[index]==id)
                			$scope.model.examQuestions.splice(index,1);
                		});
                	}
                	if($scope.model.examQuestions.length==10){
                		$scope.save=false;
                	}else{
                		$scope.save=true;
                	}
                }
              
                // 提交
                $scope.submit = function (form) {
                	form.$submitted = true;
                    // 如果表单都校验通过，则发送请求
                	if (form.$valid) {
                		if($scope.model.id==0){         // 新增
                			var examQuestions="";
                			for(var i=0;i<$scope.model.examQuestions.length;i++){
                				if(i!=0){
                					examQuestions+=$scope.model.examQuestions[i];
                				}
                				if(i!=$scope.model.examQuestions.length-1&&i!=0){
                					examQuestions+=",";
                				}
                			}
                			
                			 ExamPaperManageCreateService.addExamPaper($scope.model.examName,examQuestions).$promise.then(function (result) {
                          
                              if (true == result.result) {
                              toastr.success("", "保存成功！");
                              $location.path("/examPaperManage/list.html").search({});
                              }else{
                           
                              toastr.error("", result.message);
                             
                              }
                             
                              });
                		}else{               // 编辑
                			var examQuestions="";
                			$scope.model.examQuestions=arrSort($scope.model.examQuestions);//对选择的checkbox[qId]排序
                			for(var i=0;i<$scope.model.examQuestions.length;i++){
                				examQuestions+=$scope.model.examQuestions[i];
                				if(i!=$scope.model.examQuestions.length-1){                  //字符串化发请求
                					examQuestions+=",";
                				}
                			}
                			ExamPaperManageCreateService.editExamPaper($scope.model.id,$scope.model.examName,examQuestions).$promise.then(function (result) {
                				
                              if (true == result.result) {
                              toastr.success("", "保存成功！");
                              if(result.message!=null)
                              toastr.success("", result.message);
                              $location.path("/examPaperManage/list.html").search({});
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
                    for(var i=0;i<$scope.check.length;i++){
                    	for(var j=0;j<$scope.questions.length;j++){
                    		$scope.check[$scope.questions[j].qId]=false;        //清空选项
                    	}
                   
                    	
                    }
                    for(var i=0;i<$scope.intArrs.length;i++){               //恢复原来选项
                    	$scope.check[$scope.intArrs[i]]=true;
                    }

                };
                $scope.back = function(){
                    $location.path("/examPaperManage/list.html").search({});
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
