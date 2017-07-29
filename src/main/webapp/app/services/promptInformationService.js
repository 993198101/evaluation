/**
 * Created by wangsy on 2017/2/14.
 */
MetronicApp.service('promptInformationService', ['$resource', function ($resource) {

    //{type:"success", msg:"操作成功", icon:"check-circle"}
    this.oprSuccessResult = function(msg){
        Metronic.alert({
            container: "",//container === undefined? "": container,
            place: "prepend",
            type: 'success',
            message: msg,//option.rs? '操作成功':'操作失败',
            close: true, // make alert closable
            reset: true, // close all previouse alerts first
            focus: true, // auto scroll to the alert after shown
            closeInSeconds: 5,
            icon: "check-circle"//rs? 'check-circle':'times-circle'
        });
    }
    this.oprFailResult = function(msg){
        Metronic.alert({
            container: "",//container === undefined? "": container,
            place: "prepend",
            type : 'danger', // alert's type
            message: msg,//option.rs? '操作成功':'操作失败',
            close: true, // make alert closable
            reset: true, // close all previouse alerts first
            focus: true, // auto scroll to the alert after shown
            closeInSeconds: 5,
            icon: "times-circle" //rs? 'check-circle':'times-circle'
        });
    }

}])

