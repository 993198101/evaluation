/**
 * Created by wangsy on 2017/2/14.
 */
angular.module("MetronicApp").service("EnumService", function () {
    this._data = {
        //工作流管理 工作流分类
        workflowType: [
            {"key": 'outMessage', "text": "发文"},
            {"key": 'inMessage', "text": "收文"},
            {"key": 'efstr', "text": "签报"},
            {"key": 'opinion', "text": "征求意见"}
        ],
        //工作流管理 流程定义key
        processDefinition: [
            {"key": 'sign', "text": "签报sign"},
            {"key": 'dispatching', "text": "发文dispatching"},
            {"key": 'indispatching', "text": "收文indispatching"},
			{"key": 'holiday', "text": "请假holiday"},
			{"key": 'assets', "text": "资产申请assets"},
			{"key": 'meeting', "text": "普通会议meeting"},
			{"key": 'information', "text": "信息发布information"},
			{"key": 'topic_general', "text": "普通议题topic_general"},
			{"key": 'topic_personnel', "text": "人事议题topic_personnel"},
			{"key": 'topic_partybuild', "text": "党建议题topic_partybuild"},
			{"key": 'partymeeting', "text": "党组会议partymeeting"}
        ],
        //工作流，自动选人类型
        nodeProcessorType :[
            {"key": 'INVALID', "text": "不进行自动选人","selected":true},
            {"key": 'START_DEPT', "text": "按拟稿人所在部门选择"},
            {"key": 'PRE_NODE_DEPT', "text": "按前一节点人员所在部门选择"},
            {"key": 'STARTOR', "text": "自动选择流程发起人"},
            {"key": 'HOLIDAYFORM_MDEPT', "text": "按发起人设置的部门管理人列表"},
            {"key": 'START_MDEPT', "text": "按拟稿人所在部门管理人员列表"},
            {"key": 'PRE_NODE_MDEPT', "text": "按前一节点人员所在部门管理人员列表"}
        ],

        publishData: [
            {"key": 'office', "text": "办公室"}
        ],
        organization: [
            {"key": 'urban', "text": "市局"},
            {"key": 'leadingSoft', "text": "力鼎"}
        ],
        //会议管理-状态
        meetingStatus: [
            {"key": 'DRAFT', "text": "草稿"},
            {"key": 'PUBLISHED', "text": "已发布"},
            {"key": 'UPLOADED', "text": "已上传纪要"},

        ],
        //会议管理-召开部门
        meetingDepartment: [
            {"key": 'traditionPlace', "text": "信息中心"},
            {"key": 'tradition', "text": "文体中心"}
        ],
        //信息发布-信息发布者
        publishPerson: [
            {"key": 'four', "text": "李四"}
        ],
        //信息发布-信息审核者
        checkPerson: [
            {"key": 'five', "text": "王五"}
        ],
        //信息发布-状态
        status: [
            {"key": 'yes', "text": "有效"},
            {"key": 'no', "text": "无效"}
        ],
        //信息发布--信息类型
        informationType: [
            {"key": 'PHOTONEWS', "text": "图文"},
            {"key": 'LINKEDNEWS', "text": "链接"}
        ],
        //议题管理-我的发起
        issueList: [
            {"key": 'pending', "text": "待处理  "},
            {"key": 'myLaunch', "text": "我的发起"},
            {"key": 'myAgent', "text": "我的经办"},
            {"key": 'all', "text": "全部    "}
        ],
        //议题管理-议题类型
        topicType: [
            {"key": 'common', "text": "普通"},
            {"key": 'partyBuilding', "text": "党建"},
            {"key": 'humanAffairs', "text": "人事"}
        ],
        //议题管理-议题状态
        topicStatus: [
            {"key": 'fillIn', "text": "填制"},
            {"key": 'return', "text": "退回"},
            {"key": 'revoke', "text": "撤销"},
            {"key": 'auditing', "text": "审批中"},
            {"key": 'pass', "text": "通过"}
        ],
        //会议安排-会议列表
        meetingLists: [
            {"key": 'pending', "text": "待处理"},
            {"key": 'myLaunch', "text": "我的发起"},
            {"key": 'myAgent', "text": "我的经办"},
            {"key": 'all', "text": "全部"}
        ],
        //会议安排-操作
        stateType: [
            {"key": 'notAudit', "text": "未审核"},
            {"key": 'notPublish', "text": "未发布"},
            {"key": 'notArchiving', "text": "未归档"}
        ],
        //会议管理-会议室
        meetingOffice: [
            {"key": 'office1', "text": "会议室1"},
            {"key": 'office2', "text": "会议室2"},
            {"key": 'office3', "text": "会议室3"},
            {"key": 'office4', "text": "会议室4"},
            {"key": 'office5', "text": "会议室5"},
            {"key": 'office6', "text": "会议室6"},
            {"key": 'office7', "text": "会议室7"},
        ],
        //日程类型
        scheduleType: [
            {"key": 'COMMON', "text": "普通日程"},
            {"key": 'PARTY_MEETING', "text": "党组会议"},
            {"key": 'HOLIDAY', "text": "请假"},
            {"key": 'NOTE', "text": "记事"},
            {"key": 'BIRTHDAY', "text": "生日"},
            {"key": 'MEETING', "text": "聚会"}
        ],
        //日程背景颜色
        scheduleBgColor: {
            "HIGH": "rgba(243, 87, 93, 0.2)",
            "MIDDLE": "rgba(155, 89, 182, 0.2)",
            "LOW": "rgba(27, 188, 155, 0.2)"
        },
        //重要性
        scheduleLevelType: [
            {"key": 'HIGH', "text": "高"},
            {"key": 'MIDDLE', "text": "中"},
            {"key": 'LOW', "text": "低"}
        ],
        // 信息发布管理--提交种类
        submitType: [
            {"key": '审核', "text": "审核"},
            {"key": '发布', "text": "发布"},
            {"key": '退回', "text": "退回"},
            {"key": '撤回', "text": "撤回"}
        ],

        // 请销假--请假状态
        checkType: [
            {"key": 'EDIT', "text": "填制"},
            {"key": 'AUDIT', "text": "审核"},
            {"key": 'APPROVAL', "text": "批准"},
            {"key": 'CANCEL', "text": "销假"}
        ],
        // 请销假--请假种类
        holidayType: [
            {"key": 'BUSINESSLEAVE', "text": "出差"},
            {"key": 'PERSONALLEAVE', "text": "事假"},
            {"key": 'SICKLEAVE', "text": "病假"},
            {"key": 'ANNUALLEAVE', "text": "年假"}
        ],
        assetsType: [
            {"key": 'ElectronicProduct', "text": "电子产品"},
            {"key": 'OfficeSupplies', "text": "办公用品"},
            {"key": 'Others', "text": "其他"}
        ],
        assetsState: [
            {"key": 'ENABLE', "text": "在用"},
            {"key": 'DISABLE', "text": "停用"},
        ],
        fixedAssetsType: [
            {"key": 'electronics', "text": "电子产品"},
            {"key": 'officeSoftware', "text": "办公软件"}
        ],
        fixedAssetsDepartment: [
            {"key": 'all', "text": "全部"}
        ],
        changeStatus: [
            {"key": 'ENABLE', "text": "启用"},
            {"key": 'DISABLE', "text": "禁用"}
        ],
        changeRedStatus: [
            {"key": true, "text": "启用"},
            {"key": false, "text": "停用"}
        ],
        fileType: [
            {"key": 'picture', "text": "图片"},
            {"key": 'file', "text": "文件"}
        ],
        //    节点类型
        nodesType: [
            {"key": 'START', "text": "开始节点"},
            {"key": 'END', "text": "结束节点"},
            {"key": 'TASK', "text": "任务节点"},
            {"key": 'ORJOIN', "text": "汇合节点"},
            {"key": 'ORSPLIT', "text": "分支节点"},
            {"key": 'ANDJOIN', "text": "并行节点"}
        ],
        //所属机构
        org: [
            {"key": 'chengdu', "text": "成都市环保局"}
        ],
        //信息发布-栏目枚举
        columnType: [
            {"key": 'TABLOID', "text": "图片新闻"},
            {"key": 'NOTICE', "text": "通知公告"},
            {"key": 'DYNAMICS', "text": "工作动态"},
            {"key": 'BRIEFING', "text": "工作简报"},
            {"key": 'DCW', "text": "区县工作"},
            {"key": 'SPECIALW', "text": "专题工作"}
        ],
        //信息发布
        deployType: [
            {"key": 'SUBMIT', "text": "提交"},
            {"key": 'PUBLISH', "text": "发布"},
            {"key": 'CHECK', "text": "审核"},
            {"key": 'RETREAT', "text": "退回"},
            {"key": 'RECALL', "text": "回撤"},
            {"key": 'SAVE', "text": "草稿"}
        ],
        //党组会议-议题类型
        meetingType: [
            {"key": 'GENERAL', "text": "普通"},
            {"key": 'PARTY_BUILDING', "text": "党建"},
            {"key": 'PERSONNEL_MATTERS', "text": "人事"},
            {"key": 'MEETING', "text": "会议"}
        ],
        //议题职位类型
        topicPositionType: [
            {"key": 'HEAD_EMPLOYER', "text": "处室单位负责人"},
            {"key": 'HEAD_PARTY', "text": "机关党委负责人"},
            {"key": 'PERSONNEL_MATTERS', "text": "人事处处长"},
            {"key": 'OFFICE', "text": "办公室"},
            {"key": 'JUNIORLEADER', "text": "分管局领导"},
            {"key": 'BUREAULEADER', "text": "审核局领导"}
        ],
        tagSelect:[
            {"key": 'input',"text": 'input'},
            {"key": 'select',"text": 'select'},
            {"key": 'textarea',"text": 'textarea'},
        ],
        typeCode:[
            {"key": 1,"text": '20170206'},
            {"key": 2,"text": '20170207'},
        ],
        superior_equipment:[
            {"key": 1,"text": '上级1'},
            {"key": 2,"text": '上级2'}
        ],
        elec_status:[
            {"key": 1,"text": '启用'},
            {"key": 2,"text": '停用'}
        ],
        elec_type:[
            {"key": 1,"text": 'type1'},
            {"key": 2,"text": 'type2'}
        ],
        install_location:[
            {"key": 1,"text": 'location1'},
            {"key": 2,"text": 'location2'}
        ],
        //水表管理
        waterStatus:[
            {"key": 0,"text": '注销'},
            {"key": 1,"text": '启用'},
        ],
         waterDevice:[
            {"key": 1,"text": '设备1'},
            {"key": 2,"text": '设备2'},
             {"key":3,"text": '设备3'},
             {"key": 4,"text": '设备4'},

        ],
        waterType:[
            {"key": 1,"text": '干式水表'},
            {"key": 2,"text": '智能水表'},
            {"key": 2,"text": '直读式水表'},
            {"key": 2,"text": '立式水表'},
        ],
        waterPosition:[
            {"key": 1,"text": '位置1'},
            {"key": 2,"text": '位置2'},
            {"key": 2,"text": '位置3'},
            {"key": 2,"text": '位置4'},
        ],
        roomNumber:[
            {"key": 1,"text": '房间1'},
            {"key": 2,"text": '房间2'},
            {"key": 2,"text": '房间3'},
            {"key": 2,"text": '房间4'},
        ],
        roomStatus:[
            {"key": 1,"text": '是'},
            {"key": 2,"text": '否'},
        ],
        floor_id:[
            {"key": 1,"text": '1'},
            {"key": 2,"text": '2'},
            {"key": 1,"text": '3'},
            {"key": 2,"text": '4'},
        ]

    };
    this.get = function (key) {
        return this._data[key];
    }
});