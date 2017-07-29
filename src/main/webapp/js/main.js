/**
 * Created by 陈帅 on 2016/10/20.
 */
var myapp = angular.module('myApp', ['ui.bootstrap', 'ngSanitize', 'ngAnimate','ionic']);
myapp.run(function($ionicPlatform) {                          //滑动事件的触发前要
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
var show = false;
//全部的控制器，数据类型为树形，测评中带着老师。获取到的数据根据下拉老师，和日期的变化而变化. 下拉老师只有在刚进入或日期变化时，下拉进行变化
//$rootScope.teaId = 0;  //用来找到选择的老师的id做访问数据库用，初始为0表示全部的老师
//$rootScope.chosedDate = $filter('date')(new Date(), "yyyy-MM-dd"); //用来找到当前日期做访问数据库用
//$scope.teaShow=[];     //所有老师在页面上的绑定
// $scope.finished = []; // 已完成的测评
//$scope.unfinished = []; // 未完成的测评
myapp.controller('mainController', function ($scope, $rootScope, $http,$filter) {
	$scope.dataPage={               //做成对象是为了2控制器一同变化
			itemsPerPage:2,              //每页的数量          
			bigCurrentPage:1,            //第几页
			unFinishTotalPage:1000,      //未完成的有几页
			finishTotalPage:1000,         //完成的有几页
			showTotal:1000                //决定那个页显示
	}
	$scope.reDataPage=function(){               //这个方法在每次load数据时使用，获得当前数据总页（根据点击是否完成）
		$scope.dataPage.bigCurrentPage=1;
		$scope.dataPage.unFinishTotalPage=Math.ceil($scope.unfinished.length/$scope.dataPage.itemsPerPage);
		$scope.dataPage.finishTotalPage=Math.ceil($scope.finished.length/$scope.dataPage.itemsPerPage);
		if($rootScope.chooseUn){                               //根据选择完成还是未完成，决定显示的总页数
			$scope.dataPage.showTotal=$scope.dataPage.unFinishTotalPage==0?1:$scope.dataPage.unFinishTotalPage;
		}
		else{
			$scope.dataPage.showTotal=$scope.dataPage.finishTotalPage==0?1:$scope.dataPage.finishTotalPage;
		}
	}
	
    // 老师下拉的初始
    $rootScope.teaId = 0;  //用来找到选择的老师的id做访问数据库用，初始为0表示全部的老师
    $scope.teaShow=[];     //所有老师在页面上的绑定
    $scope.finished = []; // 已完成的测评
    $scope.unfinished = []; // 未完成的测评
    $rootScope.chosedDate = $filter('date')(new Date(), "yyyy-MM-dd"); //用来找到当前日期做访问数据库用
    $http({                                        //判断是否登录
        method: 'get', 
        url: 'finduser' // 找到登陆用户
    }).success(function (data) {
        var result = data.result;
        if (result == 1) {
            $scope.thisuser = data.user;
        }
    });
    $rootScope.changes = function () { // 选择的日期或老师改变调用这个方法（改变在日历控制器所以rootSCope）
    	$http({ // 初始化显示数据,树形包含老师，测评
            method: 'get',
            url: 'searchEvaluation', // 找到当前日期的所有的测评
            params: {
                date: $rootScope.chosedDate,
                teacherId: $rootScope.teaId
            }
        }).success(function (data) {
                var result = data.result;
                if (result == 0) {
                    $scope.message = "用户未登陆或会话失效";
                } else { // 成功获得了数据
                    $scope.evaluations = data.evaluations; // 所有的测评
                    $scope.finished = []; // 已完成的测评
                    $scope.unfinished = []; // 未完成的测评
                    $rootScope.teachers=[];
                    angular.forEach($scope.evaluations, function (a) { // 对测评进行已完成未完成分类，和找到老师
                        if (a.finished == true) { // 根据是否在数据库有答案
                            $scope.finished.push(angular.copy(a));
                        } else {
                            $scope.unfinished.push(angular.copy(a));
                        }
                        // ------------测评分类的结束，找到不同老师
                        if ($rootScope.teachers.length == 0) { // 第一个老师加入￥scope.teachers
                                $rootScope.teachers.push(a.teacher);
                                
                            } else { // 其余老师
                                var sameTeacher = 0; // sameTeacher=1时是相同的老师，不加入￥scope。teachers
                                for (var i = 0; i < $rootScope.teachers.length; i++) {
                                    if ($rootScope.teachers[i].id == a.teaId) {
                                        sameTeacher = 1;
                                    }
                                }
                                // 循环完了进行判断是否相同老师
                                if (sameTeacher == 0) {
                                    $rootScope.teachers.push(a.teacher);
                                }
                             } // else其余老师的结束
                    }); // angular。forEach的结束
                   if(!$rootScope.teaHaveChange){                              //判断是否给显示老师进行变化，只有在刚进入或日期变化时，下拉进行变化
                	   $scope.teaShow=angular.copy($rootScope.teachers);  
                	  
                	}
                   $scope.reDataPage();
                } // 成功获得所有数据的结束
            }); // ajax。success访问的结束
    };// 选择的日期或老师改变 函数的结束
    $rootScope.changes(); // 获得初始数据



  

});

// 日历的控制器
myapp.controller('DatepickerCtrl', function ($scope, $filter, $rootScope) {
    $scope.dat = new Date(); // 当前时间
    $scope.format = "yyyy-MM-dd"; // 时间格式化
    $scope.altInputFormats = ['yyyy-M!-d!']; // 可以接受的输入时间
    $scope.popup1 = { // 是否显示日期栏
        opened: false
    };
    $scope.open1 = function () { // 点击图标显示日历栏
        $scope.popup1.opened = true;
    };
    $rootScope.chosedDate = $filter('date')($scope.dat, "yyyy-MM-dd");
    $scope.dateChange = function () { // 日期的变化,调用load数据
        $rootScope.chosedDate = $filter('date')($scope.dat, "yyyy-MM-dd");
        $scope.teacher = "-1";
        $scope.teaId = 0;
        $rootScope.teaHaveChange = false; //日期变化，认作刚进入，下拉老师重新赋值
        $rootScope.changes();
    };
    $scope.teacher = "-1";
    $rootScope.teaHaveChange = false;              //判断老师是否经过修改，修改过不重新加载下拉，老师应当还是刚进入的全部数据
    $scope.teacherChange = function () { // 老师的变化,调用load数据
        $rootScope.teaId = $scope.teacher;
        if ($scope.teacher == "-1")               //选择全部时
            $rootScope.teaId = 0;
        $rootScope.teaHaveChange = true;
        $rootScope.changes();
    }
});
// 分页内容的控制器
myapp.controller('TabsCtrl', function ($scope,$rootScope,$uibModal) {
	
	$rootScope.chooseUn=true;          //默认选择的是未完成的分页
	$scope.selectUn=function(){
		        //点击未完成时初始化，下同
		$rootScope.chooseUn=true;
		$scope.reDataPage();
	}
	$scope.select=function(){
		
		$rootScope.chooseUn=false;
		$scope.reDataPage();
	}
//	选择做卷
  $scope.doThisPaper=function(x){
	  var evaId=x.id;
	  $scope.open = function (size, index, id, username) {
	        var modalInstance = $uibModal.open({
	            templateUrl: 'myModelContent.html',
	            controller: 'ModalInstanceCtrl',
	            size: size,
	            resolve:{
	            	examId:function(){
	            		return evaId;
	            	},
	            	eva:function(){
	            		return x;
	            	}
	            }

	        });
	       
	       

	    };// 模态
	    $scope.open();
	 

  }
  $scope.onSwipeLeft=function(){                        //左划下一页，$scope.dataPage.showTotal总页数应当是，选择日期，选择老师，以及完成与否
	if($scope.dataPage.bigCurrentPage<$scope.dataPage.showTotal){   //的综合结果，故在mainController设方法换数据时，调用
		$scope.dataPage.bigCurrentPage+=1;                                     //默认选择未完成的，点击变化，用rootScope传到那个
	}else{
		alert("没有下一页了")                                                         //下同
	}
	
}

$scope.onSwipeRight=function(){
	if($scope.dataPage.bigCurrentPage>1){
		$scope.dataPage.bigCurrentPage-=1;
	}else{
		alert("已经到第一页了")
	}
}
});
myapp.controller('ModalInstanceCtrl',function($scope,$uibModalInstance,eva,examId,$http){
	$scope.eva=eva;
	$scope.ok = function () {
		 $http({                                        
		        method: 'post', 
		        url: 'examPaper', // 把选择的试卷存进session
		        params:{'evaId':$scope.eva.examId,'teacherName':$scope.eva.teacher.name,'limit':$scope.eva.limit}
		    }).success(function (data) {
		        var result=data.result;
		        if(result==1){
		        	location.href="exampaper";
		        }
		    });
		$uibModalInstance.close();
   };
   $scope.cancel = function () {
	   $uibModalInstance.dismiss('cancel');
   };

});
