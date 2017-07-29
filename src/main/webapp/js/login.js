angular.module('myApp',['ui.bootstrap','ngSanitize','ngAnimate']).controller('modalDemo',function($scope,$uibModal,$http){
    var $ctrl = this;
    $scope.username="";
    $scope.psd="";
    $scope.open=function (size) {                     //点击退出，打开模态
        $ctrl.open = function () {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModelContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                backdrop: 'static',
                keyboard: false,
                size:size
            });
        };
        $ctrl.open();
    }
    $scope.login=function(){                     //点击登录传入账号密码
    	$http({method:'post',params:{username:$scope.username,password:$scope.psd},url:'logincontroller'})
    	.success(function(data){
    		  var result=data.result.result;             
    		 $scope.message=data.result.message;      //对结果进行显示如果密码错误，显示错误。
    		  if(result==2){                                   //result==2时账号密码都正确，进行跳转
    			  location.href="index";
    		  }
    	});
    }
});
//退出的模态控制器
angular.module('myApp').controller('ModalInstanceCtrl', function ($scope,$uibModalInstance) {
   var $ctrl=this;
    $ctrl.ok = function () {                                           
            $uibModalInstance.close('cancel');       //确定则退出到百度
            location.href="http://www.baidu.com";
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');      
    };
});
