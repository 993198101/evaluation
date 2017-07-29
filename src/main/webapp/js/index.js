var myApp=angular.module("myApp",[]);
myApp.controller("myController",function($scope,$http){
	$scope.goto=function(i){
		if(i==0){
			location.href="userInformation";
		}else if(i==1){
			location.href="curriculum";
		}else if(i==2){
			location.href="about";
		}
		else if(i==3){
			$http({
			 	method : 'get',
			 	url : 'invalidate'
			}).success(function(data){
				alert("退出成功");
			})
			
			location.href="login.html";
		}
	}
	$http({
	 	method : 'get',
	 	url : 'finduser'
	}).success(function(data){
		$scope.userType=data.userType;
		console.log(data)
		if($scope.userType==0){
			$scope.message=data.message;
			$scope.login=false;
			
		}else if($scope.userType==1){
			$scope.user={
					name:data.user.stuRealName,
					image:data.user.stuImage,
					id:data.user.stuStuId,
					tel:data.user.stuTel,
			}
			$scope.login=true;
		}else if($scope.userType==2){
			$scope.user={
					name:data.user.supervisorName,
					image:data.user.supervisorImage,
					groupId:data.user.supervisorGroupId,
					tel:data.user.supervisorPhoneNubmer,
					id:data.user.supervisorId
					
			}
			$scope.login=true;
		}
		
	 });
})