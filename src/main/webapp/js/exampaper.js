/**
 * Created by 陈帅 on 2016/10/20.
 */
function checkTime(i) {// 加少0时间

    if (i < 10) {
        i = "0" + i;
    }
    return i;

}
function GetQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  }

var examId=GetQueryString("examId");
var cId=GetQueryString("cId");
angular.module('myApp', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']).controller('paperController', function ($scope, $modal, $log, $interval, $http,$location) {
	
	$http({
	 	method : 'get',
	 	url : 'examQaShow',
	    params:{"examId":examId}
	 }).success(function(data){
		$scope.questions=data.questions;
	 });
    $scope.currentIdx = 0;
    $scope.h="0"+1;
    $scope.min=0+"0";
    $scope.sec=0+"0";
    var timer = $interval(function () {
        $scope.sec -= 1;
        if ($scope.sec == -1) {
            $scope.sec = 59;
            $scope.min = $scope.min - 1;
            if ($scope.min >= 0)
                $scope.min = checkTime($scope.min);
            if ($scope.min == -1) {
                $scope.min = 59;
                $scope.h = $scope.h - 1;
                if($scope.h>=0){
                	$scope.h=checkTime($scope.h);
                }else{
                	location.href="main";
                }
            }
        }
        $scope.sec = checkTime($scope.sec);
    }, 1000);      // 倒计时
    $scope.wait = false;
    var check = $interval(function () {
        if ($scope.wait) {                // 点击ok后重起计数器并关闭检查;
            $interval(function () {
                $scope.sec -= 1;
                if ($scope.sec == -1) {
                    $scope.sec = 59;
                    $scope.min = $scope.min - 1;
                    if ($scope.min >= 0)
                        $scope.min = checkTime($scope.min);
                    if ($scope.min == -1) {
                        $scope.min = 59;
                        $scope.h = $scope.h - 1;
                        if ($scope.h == -1)
                            return;
                    }
                }
                $scope.sec = checkTime($scope.sec);
            }, 1000);
            $interval.cancel(check);
        }
    }, 1000);
    $scope.open = function (size) {
        $interval.cancel(timer);
        var modalInstance = $modal.open({
            templateUrl: 'myModelContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                scope: function () {
                    return $scope;
                }
            }
        });
        modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date())
        })
    }        // 暂停按钮模态
    $scope.formData = {
    		
       ans:[]
    };
    $scope.sameLine=function (index,a) {  // 点击一行选择按钮
        $scope.formData.ans[index]=a;
    };
    $scope.process = function () {                     // 答题时进度条增加
        var count = 0;
        var leg = 0;
        angular.forEach($scope.questions, function (data, index) {
            if ($scope.formData.ans == null) {
                count = 0;
            }
            else if ($scope.formData.ans[index] != null && $scope.formData.ans[index] != " ") {
                count++;                           // 这道题答了进度加+
            }
            leg = index + 1;                    // 题长
        });
        if (count == leg) {
            $scope.complete = {                   // 此时为全答ng-typle={{complete}}
                "width": "100%"
            };
            $scope.completeTip = 100 + "%";
        }
        else {
            b = (count / leg).toFixed(2);
            c = b.slice(2, 4) + "%";
            $scope.completeTip = c;            // 转换成分数进度

            $scope.complete = {
                "width": c
            };
        }


    };

    $scope.on = function (index) {// 题号被点击
        $scope.currentIdx = index;
    };
    $scope.showtihao=function (index) {          // 每页显示10个题号，当点击最后一个的时候，换下一组
        if(index<=$scope.currentIdx-4||index>=$scope.currentIdx+4)
            return false;
        else
            return true;
    };
    $scope.notthis = function (index) {            // 给是当前题号的li加active
        if (index != $scope.currentIdx)
            return true;

    };
    $scope.next = function () {
        if ($scope.currentIdx < $scope.questions.length - 1)
            $scope.currentIdx += 1;

    };
    $scope.pre = function () {
        if ($scope.currentIdx > 0)
            $scope.currentIdx -= 1;
    };
    $scope.goto1;                       // goto那道题
    $scope.goto = function () {
        if ($scope.goto1 >= 0 && $scope.goto1 <= $scope.questions.length){
        	$scope.currentIdx = $scope.goto1-1;
        }
    };
    $scope.open1 = function (size) {               // 交卷记录未完成的题目
        $scope.arr = new Array();
        $scope.aQidarr=new Array();
       for(var i=0;i<$scope.questions.length;i++){
    	   if($scope.aQidarr.length!=$scope.questions.length){
    		   $scope.aQidarr.push($scope.questions[i].qId);
    	   }
    	    if ($scope.formData.ans == null) {
                $scope.arr.push(i)
            }
            else if ($scope.formData.ans[i] == null || $scope.formData.ans[i] == " "||$scope.formData.ans[i]=="0") {
            	$scope.formData.ans[i]="0";
                $scope.arr.push(i);
            }
       }

        var modalInstance = $modal.open({
            templateUrl: '1.html',
            controller: 'ModalInstanceCtrl1',
            size: size,
            resolve: {
                arr: function () {
                    return $scope.arr;
                },
               formdata:function () {
                   return $scope.formData;
               },
               aQidarr:function(){
            	   return $scope.aQidarr;
               }
            }
        });
        modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date())
        })
    };


});
angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, scope) {


    $scope.ok = function () {
        scope.wait = true;      // timers为上面的$scope

        $modalInstance.close($scope);


    };

})
angular.module('myApp').controller('ModalInstanceCtrl1', function ($scope, $modalInstance, arr,formdata,$http,aQidarr) {
  $scope.arr = arr;
  $scope.formData=formdata;
  $scope.aQidarr=aQidarr;
  for(var i=0;i<$scope.arr.length;i++){
        $scope.arr[i]+=1;
   }
  if($scope.arr.length==0){
	  $scope.notNull=false;
	  
  }else{
	  $scope.notNull=true;
  }
  if ($scope.arr.length == 0)
    	$scope.arr.push("null");
  var score=0;
  for(var i=0;i<formdata.ans.length;i++){
    	score+=parseInt(formdata.ans[i]);
    }
    $scope.ok = function () {
    	 $http({
    			method : 'post',
    			url : 'submitExamPaper',
    			params:{cId,cId,score:score}
    		}).success(function(data){
    	        if(data.result!=0){
    	        	location.href="curriculum";
    	        }
    		
    		});
        $modalInstance.close($scope.arr);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});


