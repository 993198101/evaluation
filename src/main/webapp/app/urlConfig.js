/**
 * Created by 陈帅 on 2017/2/14.
 */
MetronicApp.service("UrlConfigService", function () {
    var adminHost = "";
    var oaRootPath = "";
    var adminRootPath = "";
    var openHost = "";
    var openRootPath = '';
    var uapHost = "";
    var uapRootPath = '';

    this.urlConfig = {
    	user:{
    		findUser:adminHost+oaRootPath+"findUser"
    	},
    	evaluation:{
    		 list:adminHost+oaRootPath+"getAllEvaluation",   //获取测评分页list pageable
             getTeacherUrl:adminHost+oaRootPath+"getAllTeacher", //获取老师下拉
             findDetailUrl:adminHost+oaRootPath+"findDetail"          //找到每个学生的，督导员的分数
             
        },
        examPaper:{
        	list:adminHost+oaRootPath+"searchPageExamPaper",
        	addExamPaperUrl:adminHost+oaRootPath+"addExamPaper",//新增ExamPaper
        	getExamPaperUrl:adminHost+oaRootPath+"getExamPaper",//获取编辑的ExamPaper
        	editExamPaperUrl:adminHost+oaRootPath+"editExamPaper",//提交编辑的ExamPaper
        	deleteExamPaperUrl:adminHost+oaRootPath+"deleteExamPaper"//删除
        },
        question:{
        	list:adminHost+oaRootPath+"getAllQuestion",   //获取测评分页list pageable
        	addQuestionUrl:adminHost+oaRootPath+"addQuestion",//新增question
        	findEditQuestionUrl:adminHost+oaRootPath+"findQuestion",//找到编辑的question
        	deleteQuestionUrl:adminHost+oaRootPath+"deleteQuestion",
        	editQuestionUrl:adminHost+oaRootPath+"editQuestion"
        },
    	answer:{
    		getQuestionUrl:adminHost+oaRootPath+"getAllQuestion?s_qId=0&page=0&size=-1",//获取问题下拉
    		addAnswerUrl:adminHost+oaRootPath+"addAnswer", //新增answer
            list:adminHost+oaRootPath+"getAllAnswer",
            findEditAnswerUrl:adminHost+oaRootPath+"getEditAnswer",//找到要修改的answer
            editAnswerUrl:adminHost+oaRootPath+"editAnswer", //answer的编辑
            deleteAnswerUrl:adminHost+oaRootPath+"deleteAnswer"//删除answer
        },
        evaArrange:{
        	list:adminHost+oaRootPath+"getAllEvaArranges",
        	getAllCurs:adminHost+oaRootPath+"getAllCurs",   //获取课程
        	getAllStudents:adminHost+oaRootPath+"getAllStudents",  //获取学生
        	addArrangeUrl:adminHost+oaRootPath+"addArrange",   //新增
        	findEditArrangeUrl:adminHost+oaRootPath+"getArrange",//获取编辑对象
        	deleteArrangeUrl:adminHost+oaRootPath+"deleteArrange",//删除
        },
        project:{
        	list:adminHost+oaRootPath+"getAllProjects",

        	addProjectUrl:adminHost+oaRootPath+"addProject",   //新增
        	findEditProjectUrl:adminHost+oaRootPath+"getProject",//获取编辑对象
        	deleteProjectUrl:adminHost+oaRootPath+"deleteProject",//删除
        }
    };
});

