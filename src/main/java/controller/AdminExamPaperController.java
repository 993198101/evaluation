package controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import dto.ExamPaper;
import service.AdminExamPaperService;

@Controller
public class AdminExamPaperController {
  @Autowired
  private AdminExamPaperService adminExamPaperService;
  @RequestMapping(value = "/admin/getAllExamPaper", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String getAllExamPaper(){
		JSONObject json=new JSONObject();
		List<ExamPaper> examPapers=this.adminExamPaperService.findAll();
		json.put("examPapers", examPapers);
		return json.toJSONString();
  }
  @RequestMapping(value = "/admin/searchPageExamPaper", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String searchPageExamPaper(String s_examName,int[] s_examQuestions,int page,int size){
		JSONObject json=new JSONObject();
		Map<String,Object> map= this.adminExamPaperService.searchPage(s_examName, s_examQuestions, page, size);
		json.putAll(map);
		return json.toJSONString();
  }
  @RequestMapping(value = "/admin/addExamPaper", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String addExamPaper(String examName,String examQuestions){
		JSONObject json=new JSONObject();
		boolean result=this.adminExamPaperService.addExamPaper(examName, examQuestions);
		json.put("result", result);
		if(result==false){
			json.put("message", "名字,题目不能同时重复");
		}
		return json.toJSONString();
  }
  @RequestMapping(value = "/admin/getExamPaper", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String getExamPaper(int id){
		JSONObject json=new JSONObject();
		ExamPaper examPaper=this.adminExamPaperService.getExamPaper(id, null, null);
		json.put("examPaper", examPaper);
		if(examPaper!=null){
			json.put("status", "success");
		}else{
			json.put("message", "该数据不存在或已被删除");
		}
		return json.toJSONString();
  }
  @RequestMapping(value = "/admin/editExamPaper", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String editExamPaper(int examId,String examName,String examQuestion){
		JSONObject json=new JSONObject();
		Map<String,Object> map=this.adminExamPaperService.editExamPaper(examId, examName, examQuestion);
		json.putAll(map);
		return json.toJSONString();
  }
  @RequestMapping(value = "/admin/deleteExamPaper", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String deleteExamPaper(int id){
		JSONObject json=new JSONObject();
		Map<String,Object> map=this.adminExamPaperService.deleteExamPaper(id);
		json.putAll(map);
		return json.toJSONString();
  }
  
}
