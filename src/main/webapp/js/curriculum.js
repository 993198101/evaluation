document.getElementById("promptBtn").addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['确定', '取消'];
				mui.prompt('请输入对系统的评语：', '性能好', 'Hello', btnArray, function(e) {
					if (e.index == 0) {
//						info.innerText = '谢谢你的评语：' + e.value;
					} else {
//						info.innerText = '你点了取消按钮';
					}
				})
			});
mui.init({
	swipeBack:true //启用右滑关闭功能
});
var menuWrapper = document.getElementById("menu-wrapper");
var menu = document.getElementById("menu");
var menuWrapperClassList = menuWrapper.classList;
var backdrop = document.getElementById("menu-backdrop");
var info = document.getElementById("info");
var term="2015-2016第一学期";
backdrop.addEventListener('tap', toggleMenu);
document.getElementById("menu-btn").addEventListener('tap', toggleMenu);
document.getElementById("icon-menu").addEventListener('tap',toggleMenu)
//下沉菜单中的点击事件
mui('#menu').on('tap', 'a', function() {
	toggleMenu();
	term =this.innerHTML;
	document.getElementById("term").innerHTML=this.innerHTML;
	var $scope = angular.element(document.getElementById('app')).scope();
	$scope.$apply();
	$scope.search();
	
});
var busying = false;

function toggleMenu() {
	if (busying) {
		return;
	}
	busying = true;
	if (menuWrapperClassList.contains('mui-active')) {
		document.body.classList.remove('menu-open');
		menuWrapper.className = 'menu-wrapper fade-out-up animated';
		menu.className = 'menu bounce-out-up animated';
		setTimeout(function() {
			backdrop.style.opacity = 0;
			menuWrapper.classList.add('hidden');
		}, 500);
	} else {
		document.body.classList.add('menu-open');
		menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
		menu.className = 'menu bounce-in-down animated';
		backdrop.style.opacity = 1;
	}
	setTimeout(function() {
		busying = false;
	}, 500);
}
var myApp=angular.module("myApp",['ui.bootstrap']);
myApp.controller("myController",function($scope,$http,$uibModal){
	
	$scope.content=true;
	$scope.search=function(){
		
		$http({
		 	method : 'get',
		 	url : 'getAllCurriculum',
		 	params:{"stuId":1,"term":term}
		}).success(function(data){
			$scope.curriculums=data.curriculums;
			$scope.content=false;
			$scope.curriculums.forEach(function(i,index){
				$http({
				 	method : 'get',
				 	url : 'getExamPaper',
				 	params:{"curId":i.curId}
				}).success(function(data){
					i.examPaper=data.data;
				});
			});
		});
		
	}
	$scope.search();
	$scope.goto=function(examId,cId){
		location.href="examPaper?examId="+examId+"&cId="+cId;
	}
	
	
});

	
	