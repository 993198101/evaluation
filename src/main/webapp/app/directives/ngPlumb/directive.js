/**
 * Created by caoRN on 2016/11/27.
 */
'use strict';
angular.module("MetronicApp").directive('ngPlumb', ['$timeout',function ($timeout) {
    return {
        templateUrl:"app/directives/ngPlumb/template.html",
        restrict: 'E',
        scope: {
            plumbData: "="//数据源
        },
        replace: true,
        link: function ($scope, $element, $attrs) {
        },
        controller: ['$scope', function ($scope) {
            $scope.getDate = function () {
                if ($scope.plumbData) {
                    $scope.taskSummaryList = $scope.plumbData.task;//存储DOM节点
                    $scope.routerList =$scope.plumbData.router;//存储连线关系
                    if (!$scope.plumbData.task) {//如果数据为空那么可以直接实例化jsplumb
                        $scope.taskSummaryList = [];
                        $scope.routerList = [];
                        $scope.jsPlumbInit();
                        $scope._initConnection();
                        $scope._configContextMenu();
                    }
                    $scope.modelCopy = $scope.plumbData;//存储全部数据，重置使用
                    $scope.taskSummaryListType = [];//存储DOM类型的数组
                    for (var index in $scope.taskSummaryList) {
                        $scope.taskSummaryListType.push($scope.taskSummaryList[index].type);
                    }
                    $scope.cyclicStorage();
                }
            };
            //判断遍历存储函数
            $scope.cyclicStorage = function() {
                $scope.startList = [];
                $scope.taskList = [];
                $scope.endList = [];
                $scope.joinNodeList = [];//汇合节点数据
                $scope.branchNodeList = [];//分支节点数据
                $scope.parallelNodeList = [];//并行节点数据
                angular.forEach($scope.taskSummaryList,function(data) {
                    if (data.type == 'start' ) {
                        $scope.startList.push(data);
                    }else if(data.type == 'end') {
                        $scope.endList.push(data);
                    }else if (data.type == 'task') {
                        $scope.taskList.push(data);
                    }else if (data.type == 'joinNode') {
                        $scope.joinNodeList.push(data);
                    }else if (data.type == 'branchNode') {
                        $scope.branchNodeList.push(data);
                    }else if (data.type == 'parallelNode') {
                        $scope.parallelNodeList.push(data);
                    }
                })
            };
            $scope.count = 0;
            // 判断页面是否加载完毕
            $scope.repeatFinish = function(){
                $scope.count++;//动态获取存储DOM类型个数，判断是否实已经例化jsplumb
                if($scope.count >= $scope.taskSummaryListType.unique().length - 1){
                    //动态设置初始DOM的位置
                    angular.forEach($scope.taskSummaryList,function(data){
                        $('#'+ data.id).css('top',data.location.top).css('left',data.location.left);
                    });
                    $scope.jsPlumbInit();
                    $scope._initConnection();
                }
            };
            // jsplumb配置函数
            $scope.jsPlumbInit = function(){
                jsPlumb.ready(function(){
                    $scope.instance = jsPlumb.getInstance({
                        Connector:"Straight",
                        DragOptions:{cursor:'pointer'},
                        Endpoint:[ "Dot", { radius:0.001} ],
                        ConnectionOverlays: [
                            [ "Arrow", {
                                location: 1,
                                id: "arrow",
                                length: 14,
                                foldback: 0.8
                            } ],
                            [ "Label", { label: "", id: "label", cssClass: "aLabel" }]//这个是鼠标拉出来的线的属性
                        ],
                        Container:'Content-Main'
                    });
                    $scope.dom = angular.element(".item");//获取对象节点
                    //获取节点成功后需要调用的函数
                    if($scope.dom.length > 0){
                        $scope._makeSource($scope.dom);
                        $scope._makeTarget($scope.dom);
                    }
                    //连线成功的事件回调
                    $scope.instance.bind("connection", function(params,e){
                        angular.forEach($scope.taskSummaryList,function(res){
                            if (res.id == params.target.id && res.details.task) {
                                //当连接成功后，动态修改label
                                params.connection.getOverlay("label").setLabel(res.details.task);
                            }
                        })
                    });
                });
            };
            //初始化连接状态显示，初始的DOM显示
            $scope._initConnection = function(){
                angular.forEach($scope.routerList,function(data){
                    $scope.instance.connect({
                        source: data.source,
                        target: data.target
                    });
                });
            };
            // makeSource
            $scope._makeSource = function($el){
                angular.forEach($el,function(dom){
                    if ($(dom).attr('category') == 'branchNode' || $(dom).attr('category') == 'parallelNode') {
                        $scope.instance.makeSource(dom,{
                            filter:".ep",
                            anchor: "Continuous",
                            connectorStyle: { strokeStyle: "#DEDEDE", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                            maxConnections:5,
                            onMaxConnections:function() {
                                toastr.error('', "最大连接数！");
                            }
                        })
                    }else {
                        $scope.instance.makeSource(dom,{
                            filter:".ep",
                            anchor: "Continuous",
                            connectorStyle: { strokeStyle: "#DEDEDE", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                            maxConnections:1,
                            onMaxConnections:function() {
                                toastr.error('', "最大连接数！");
                            }
                        })
                    }
            
                })
            };
            // makeTarget
            $scope._makeTarget = function($el){
                angular.forEach($el,function(dom){
                    if ($(dom).attr('category') == 'joinNode'){
                        $scope.instance.makeTarget(dom, {
                            anchor: "Continuous",
                            paintStyle:{ fillStyle: "green" },
                            maxConnections:5,
                            onMaxConnections:function() {
                                toastr.error('', "最大连接数！");
                            }
                        })
                    }else {
                        $scope.instance.makeTarget(dom, {
                            anchor: "Continuous",
                            paintStyle:{ fillStyle: "green" },
                            maxConnections:1,
                            onMaxConnections:function() {
                                toastr.error('', "最大连接数！");
                            }
                        })
                    }
                })
            };

            //动态监听数据的变化
            $scope.$watch('plumbData', function (newVal, oldVal) {
                if (angular.equals(newVal,oldVal)) return;
                $scope.getDate();
            },true);
          
        }]
    };
}]);

