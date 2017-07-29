/**
 * Created by 陈帅 on 2016/12/9.
 */
angular.module('evaluation.admin', ['ui.bootstrap','ngCookies']);
angular.module('evaluation.admin').controller('logincontroller', function ($scope,$uibModal,$http,$cookieStore) {
   $scope.message="";      //错误提示
   $scope.isLogin=true;
   $scope.isReturn=true;
   var username=$cookieStore.get("username");  //获取cookie的密码
   if(username!=null){
	   $scope.username=username;         //账号
   }else{
	   $scope.username="";
   }
   $scope.password="";                 //密码
   $scope.close=function(type){   
	   if(type==0){
		   $scope.isLogin=true;    //错误提示栏的显示与否
		  
	   }
	   if(type==1){
		   $scope.isReturn=true;
	   }
   }
   $scope.login=function () {                  //登录
	   if($scope.username==""||$scope.password==""){    //验证是否可以提交
		   $scope.isLogin=false;
	   }else{
		   if($scope.remeberUsername==true){             //是否点击记住密码
				  $cookieStore.put("username",$scope.username);
			   }
		       $http({
		           method : 'get',
		           url : 'login',
		           params:{name:$scope.username,password:$scope.password}

		       }).success(function(data){
		    	   $scope.message="";
		           var result=data.result;
		           if(result==0){               //账号错误
		               $scope.message="账号不存在,请重新录入";

		           }else if(result==1){//密码错误
		               $scope.message="密码不正确，请重新输入";

		           }
		           else {
		               location.href="main";
		           }
		           $scope.isLogin=true;          //错误提示栏的显示与否
		           $scope.isReturn=false;

		       });
	   }
	   
   }
   $scope.resetPassword=function(){              //重置密码
	   if($scope.username==""||$scope.resetCode==""){
		   alert("请填满信息!!O(∩_∩)O~");
	   }else{
		   $http({
	           method : 'post',
	           url : 'resetPassword',
	           params:{username:$scope.username,resetCode:$scope.resetCode}

	       }).success(function(data){
	    	   var result=data.result;
	    	   if(result==-1){
	    		   alert("账号不存在");
	    	   }
	    	   if(result==0){
	    		   alert("重置码错误");
	    	   }
	    	   if(result==1){
	    		   alert("重置成功");
	    		   document.getElementById("back-btn").click();
	    	   }
	    	});
	   }
   }
   //注册
   $scope.newUsername="";
   $scope.newPassword="";
   $scope.userRealName="";
   $scope.inviteCode="";    //邀请码
   $scope.agree=false;     //是否同意协议
   $scope.register=function(){
	   $http({
           method : 'post',
           url : 'register',
           params:{newUsername:$scope.newUsername,newPassword:$scope.newPassword,userRealName:$scope.userRealName,inviteCode:$scope.inviteCode}

       }).success(function(data){
    	   var result=data.result;
    	   
    	   if(result==-1){
    		   $scope.messageR="邀请码错误";
    	   }
    	   if(result==0){
    		   $scope.messageR="账号重复";
    	   }
    	   if(result==1){
    		   alert("注册成功");
    		   document.getElementById("register-back-btn").click();
    	   }
    	});
   }

});