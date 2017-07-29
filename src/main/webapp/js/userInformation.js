var myApp=angular.module("myApp",['ui.bootstrap','ngFileUpload',]);

myApp.factory('fileReader', ["$q", "$log", function ($q) {

	var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };
    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };
    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };
    return {
        readAsDataUrl: readAsDataURL
    };
}]);
// define file-model
myApp.directive('fileModel', ['$parse', function ($parse) {return {
    restrict: 'A',
    link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind( 'change',function (event) { scope.$apply(function () {
                            modelSetter(
                                scope,
                                element[0].files[0]);
                        });
                    // preview
                    scope.file = (event.srcElement || event.target).files[0];
                    scope.getFile();
                });
    }
};
}]);
myApp.controller("myController",function($scope,$http,$uibModal,$rootScope){
	$http({
	 	method : 'get',
	 	url : 'finduser'
	}).success(function(data){
		$scope.userType=data.userType;
		console.log(data)
		if($scope.userType==1){
			$rootScope.user={
					name:data.user.stuRealName,
					image:data.user.stuImage,
					id:data.user.stuStuId,
					tel:data.user.stuTel,
			}
			
		}else if($scope.userType==2){
			$rootScope.user={
					name:data.user.supervisorName,
					image:data.user.supervisorImage,
					groupId:data.user.supervisorGroupId,
					tel:data.user.supervisorPhoneNumber,
					id:data.user.supervisorId
					
			}
		
		}
		
	 });
	var $ctrl = this;
    $scope.editPassword=function () {      //打开修改密码的模态框
    	$ctrl.open = function () {
            $uibModal.open({
                templateUrl: 'editPassword.html',
                controller: 'ModalInstanceEditPassword',
                controllerAs: '$ctrl',
                backdrop: 'static',
                keyboard: false
            });
        };
        $ctrl.open();
    }
    $scope.updateTel=function(){
    	$ctrl.open = function () {
            $uibModal.open({
                templateUrl: 'editTel.html',
                controller: 'updateTel',
                controllerAs: '$ctrl',
                backdrop: 'static',
                keyboard: false
            });
        };
        $ctrl.open();
    }
});
myApp.controller('updateTel', function ($scope,$http,$uibModalInstance,$uibModal) {
	 var $ctrl = this;
	$ctrl.ok = function () {
	$http({
        url : 'editTel',
        method : 'GET',
        params:{tel:$scope.tel}
    }).success(function(data) {
         if(data.result==2){
        	 alert("phone number 修改成功");
        	 location.href="login.html";
         }else{
        	 alert("修改失败");
         } 
    })
    $uibModalInstance.dismiss('dismiss');
	}
	$ctrl.cancel = function () {              //取消更改密码，关闭模态
        $uibModalInstance.dismiss('cancel');
    };
})

//修改密码模态框控制器
myApp.controller('ModalInstanceEditPassword', function ($scope,$http,$uibModalInstance,$uibModal) {
    var $ctrl = this;
    $scope.oPassword="";         //原密码
    $scope.nPassword2="";      //新密码
    $scope.nPassword="";       //确认新密码
    $scope.isBegin=true;       //控制密码复杂度第一块的颜色     （未填写）
    $scope.isBegin1=true;       //控制密码复杂度第二块的颜色      （未填写）
    $scope.isBegin2=true;       //控制密码复杂度第三块的颜色      （未填写）
    $scope.isWarnning=false;   //低中高颜色
     $scope.isDanger=false;
    $scope.isSuccess=false;
    $scope.change=function () {
    	if($scope.nPassword==null){
        	$scope.nPassword="";
        }
        var outcome=0;                          //进度条判断有几种字符
        var result=$scope.nPassword.search("[a-zA-z]");
        if(result>=0)
            outcome++;
        result=$scope.nPassword.search("[0-9]");
        if(result>=0)
            outcome++;
        result=$scope.nPassword.search("((?=[\x21-\x7e]+)[^A-Za-z0-9])");
        if(result>=0)
            outcome++;
        if(outcome==1){                 //修改进度条长度以及颜色
            $scope.isWarnning=false;
            $scope.isBegin=false;
            $scope.isBegin1=true;
            $scope.isBegin2=true;
            $scope.isDanger=true;
            $scope.isSuccess=false;
        }else if(outcome==2){
            $scope.isWarnning=true;
            $scope.isBegin=false;
            $scope.isBegin1=false;
            $scope.isBegin2=true;
            $scope.isDanger=false;
            $scope.isSuccess=false;
        }else if(outcome==3) {
            $scope.isWarnning=false;
            $scope.isBegin=false;
            $scope.isBegin1=false;
            $scope.isBegin2=false;
            $scope.isDanger=false;
            $scope.isSuccess=true;
        }else if(outcome==0){
       	 $scope.isWarnning=false;
         $scope.isBegin=true;
         $scope.isBegin1=true;
         $scope.isBegin2=true;
         $scope.isDanger=false;
         $scope.isSuccess=false;
    }
    };
    $ctrl.ok = function () { $scope.message="";          //确定时密码验证
        if($scope.oPassword==$scope.nPassword){        
            $scope.message="不能与原密码相同！";
        }else if($scope.nPassword!=$scope.nPassword2) {
            $scope.message="两次密码输入不一致！";
        }else {                                                           //去更改密码
            $http({
                url : 'editPassword',
                method : 'GET',
                params:{oPassword:$scope.oPassword,nPassword:$scope.nPassword}
            }).success(function(data) {
                $scope.result = data.result;
                if($scope.result==2){
                    //更新成功，打开更新成功模态
                    $ctrl.open = function () {
                        $uibModal.open({
                             templateUrl: 'editok',
                            controller: 'editok',
                            controllerAs: '$ctrl',
                            backdrop: 'static',
                            keyboard: false,
                            size:'lg'
                        });
                    };
                    $ctrl.open();
                }else if($scope.result==1){
                    //旧密码失败，打开更新失败模态
                    $ctrl.open = function () {
                        $uibModal.open({
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'editfailed',
                            controller: 'editfailed',
                            controllerAs: '$ctrl',
                            backdrop: 'static',
                            keyboard: false,
                            size:'lg'
                        });
                    };
                    $ctrl.open();
                }else if($scope.result==0){
                    //会话失效  ，打开会话失效模态
                    $ctrl.open = function () {
                        $uibModal.open({
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'sessionmiss',
                            controller: 'sessionmiss',
                            controllerAs: '$ctrl',
                            backdrop: 'static',
                            keyboard: false,
                            size:'lg'
                        });
                    };
                    $ctrl.open();
                }
            });
            $uibModalInstance.close('cancel');//关闭更改密码模态
        }
    };
    $ctrl.cancel = function () {              //取消更改密码，关闭模态
        $uibModalInstance.dismiss('cancel');
    };
});
//修改成功模态框控制器
myApp.controller("editok",function($uibModalInstance){
    var $ctrl=this;
    $ctrl.ok=function(){
        location.href="login.html";
        $uibModalInstance.close('cancel');
    };
    $ctrl.cancel = function () {
    	 location.href="login.html";
        $uibModalInstance.dismiss('cancel');
    };
});
//修改密码，因为原密码错误失败模态框控制器
myApp.controller("editfailed",function($uibModalInstance){
    var $ctrl=this;
    $ctrl.ok=function(){
        $uibModalInstance.close('cancel');
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
//修改密码，因为会话失效失败模态框控制器
myApp.controller("sessionmiss",function($uibModalInstance){
    var $ctrl=this;
    $ctrl.ok=function(){
        location.href="login.html";
        $uibModalInstance.close('cancel');
    };
    $ctrl.cancel = function () {
        location.href="login.html";
        $uibModalInstance.dismiss('cancel');
    };
});
//图片的上传也预览
myApp.controller('categoryPic', function ($scope, $rootScope, fileReader, Upload,$http) {
    // 预览的回调
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.categoryPic, $scope).then(
            function (result) {
                Upload.upload({
                    url: 'upload',
                    file: $scope.categoryPic
                }).success(function (data) {
                    $rootScope.user.image = data.path;
                    $scope.categoryPicPath = result;              //回调成功更新数据库
                    $http({
                	 	method : 'get',
                	 	url : 'editImage',
                	    params:{image:$rootScope.user.image}
                	}).success(function(data){
                		$scope.result = data.result;
                        if($scope.result==2){
                		alert("更新图像成功")
                		
                        }
                	});
                });
            }
        );
    };
});
