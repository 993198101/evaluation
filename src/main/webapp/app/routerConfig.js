/**
 * Created by wangsy on 2017/2/14.
 */
/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url

    $urlRouterProvider
        .otherwise("/evaluationManage/list.html");

    $stateProvider
        .state('evaluationManage', {
            url: "/evaluationManage/list.html",
            templateUrl: "../views/evaluationManage/list.html",
            data: {pageTitle: '测评管理'},
            controller: "EvaluationManageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/evaluationManage/EvaluationManageController.js',
                            '../app/services/evaluationManage/EvaluationManageService.js'
                        ]
                    });
                }]
            }
        })
        .state('evaluationManageCreate', {
            url: "/evaluation/add.html",
            templateUrl: "../views/evaluationManage/create.html",
            data: {pageTitle: '测评管理-新增'},
            controller: "EvaluationManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/evaluationManage/EvaluationManageController.js',
                            '../app/services/evaluationManage/EvaluationManageService.js',
                            '../app/services/evaluationManage/EvaluationManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('evaluationManageEdit', {
            url: "/evaluation/edit.html",
            templateUrl: "../views/evaluationManage/create.html",
            data: {pageTitle: '测评管理-编辑'},
            controller: "EvaluationManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                                '../app/directives/ngTable/directive.js',
                                '../app/controllers/evaluationManage/EvaluationManageController.js',
                                '../app/services/evaluationManage/EvaluationManageService.js',
                                '../app/services/evaluationManage/EvaluationManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('examPaperManage', {
            url: "/examPaperManage/list.html",
            templateUrl: "../views/examPaperManage/list.html",
            data: {pageTitle: '卷子管理'},
            controller: "ExamPaperManageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/examPaperManage/ExamPaperManageController.js',
                            '../app/services/examPaperManage/ExamPaperManageService.js'
                        ]
                    });
                }]
            }
        })
        .state('examPaperManageCreate', {
            url: "/examPaperManage/add.html",
            templateUrl: "../views/examPaperManage/create.html",
            data: {pageTitle: '卷子管理-新增'},
            controller: "ExamPaperManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/examPaperManage/ExamPaperManageController.js',
                            
                            '../app/services/examPaperManage/ExamPaperManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('examPaperManageEdit', {
            url: "/examPaperManage/edit.html",
            templateUrl: "../views/examPaperManage/create.html",
            data: {pageTitle: '卷子管理-编辑'},
            controller: "ExamPaperManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                                '../app/directives/ngTable/directive.js',
                                '../app/controllers/examPaperManage/ExamPaperManageController.js',
                                '../app/services/examPaperManage/ExamPaperManageService.js',
                                '../app/services/examPaperManage/ExamPaperManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('questionManage', {
            url: "/questionManage/list.html",
            templateUrl: "../views/questionManage/list.html",
            data: {pageTitle: '题目管理'},
            controller: "QuestionManageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/questionManage/QuestionManageController.js',
                            '../app/services/questionManage/QuestionManageService.js'
                        ]
                    });
                }]
            }
        })
        .state('questionManageCreate', {
            url: "/questionManage/add.html",
            templateUrl: "../views/questionManage/create.html",
            data: {pageTitle: '题目管理-新增'},
            controller: "QuestionManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/questionManage/QuestionManageController.js',
                            '../app/services/questionManage/QuestionManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('questionManageEdit', {
            url: "/questionManage/edit.html",
            templateUrl: "../views/questionManage/create.html",
            data: {pageTitle: '题目管理-编辑'},
            controller: "QuestionManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                                '../app/directives/ngTable/directive.js',
                                '../app/controllers/questionManage/QuestionManageController.js',
                                '../app/services/questionManage/QuestionManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('answerManage', {
            url: "/answerManage/list.html",
            templateUrl: "../views/answerManage/list.html",
            data: {pageTitle: '答案管理'},
            controller: "AnswerManageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/answerManage/AnswerManageController.js',
                            '../app/services/answerManage/AnswerManageService.js'
                        ]
                    });
                }]
            }
        })
        .state('answerManageCreate', {
            url: "/answer/add.html",
            templateUrl: "../views/answerManage/create.html",
            data: {pageTitle: '答案管理-新增'},
            controller: "AnswerManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/answerManage/AnswerManageController.js',
                            
                            '../app/services/answerManage/AnswerManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('answerManageEdit', {
            url: "/answer/edit.html",
            templateUrl: "../views/answerManage/create.html",
            data: {pageTitle: '答案管理-编辑'},
            controller: "AnswerManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                                '../app/directives/ngTable/directive.js',
                                '../app/controllers/answerManage/AnswerManageController.js',
                                '../app/services/answerManage/AnswerManageService.js',
                                '../app/services/answerManage/AnswerManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('choseManage', {
            url: "/choseManage/list.html",
            templateUrl: "../views/choseManage/list.html",
            data: {pageTitle: '评教安排管理'},
            controller: "ChoseManageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/choseManage/ChoseManageController.js',
                            '../app/services/choseManage/ChoseManageService.js'
                        ]
                    });
                }]
            }
        })
        .state('choseManageCreate', {
            url: "/choseManage/add.html",
            templateUrl: "../views/choseManage/create.html",
            data: {pageTitle: '评教安排管理-新增'},
            controller: "ChoseManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/choseManage/ChoseManageController.js',
                            
                            '../app/services/choseManage/ChoseManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('choseManageEdit', {
            url: "/choseManage/edit.html",
            templateUrl: "../views/choseManage/create.html",
            data: {pageTitle: '评教安排管理-编辑'},
            controller: "ChoseManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                                '../app/directives/ngTable/directive.js',
                                '../app/controllers/choseManage/ChoseManageController.js',
                                '../app/services/choseManage/ChoseManageService.js',
                                '../app/services/choseManage/ChoseManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('choseExampaperManage', {
            url: "/choseExampaperManage/list.html",
            templateUrl: "../views/choseExampaperManage/list.html",
            data: {pageTitle: '评教安排管理'},
            controller: "ChoseExampaperManageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/choseExampaperManage/ChoseExampaperManageController.js',
                            '../app/services/choseExampaperManage/ChoseExampaperManageService.js'
                        ]
                    });
                }]
            }
        })
        .state('choseExampaperManageCreate', {
            url: "/choseExampaperManage/add.html",
            templateUrl: "../views/choseExampaperManage/create.html",
            data: {pageTitle: '评教安排管理-新增'},
            controller: "ChoseExampaperManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '../app/directives/ngTable/directive.js',
                            '../app/controllers/choseExampaperManage/ChoseExampaperManageController.js',
                            
                            '../app/services/choseExampaperManage/ChoseExampaperManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        .state('choseExampaperManageEdit', {
            url: "/choseExampaperManage/edit.html",
            templateUrl: "../views/choseExampaperManage/create.html",
            data: {pageTitle: '评教安排管理-编辑'},
            controller: "ChoseExampaperManageCreateController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                                '../app/directives/ngTable/directive.js',
                                '../app/controllers/choseExampaperManage/ChoseExampaperManageController.js',
                                '../app/services/choseExampaperManage/ChoseExampaperManageService.js',
                                '../app/services/choseExampaperManage/ChoseExampaperManageCreateService.js'
                        ]
                    });
                }]
            }
        })
        
        
       
}]);