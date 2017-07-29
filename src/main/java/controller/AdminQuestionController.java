package controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import dto.Question;
import service.AdminQuestionService;

@Controller
public class AdminQuestionController {
	@Autowired
	private AdminQuestionService adminQuestionService;

	@RequestMapping(value = "/admin/getAllQuestion", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String findAllQuestion(int s_qId, String s_qContent, int page, int size) {
		JSONObject json = new JSONObject();
		Map<String, Object> map = this.adminQuestionService.searchPage(s_qId, s_qContent, page, size);
		json.putAll(map);
		return json.toJSONString();
	}

	@RequestMapping(value = "/admin/addQuestion", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String addQuestion(String qContent) {
		JSONObject json = new JSONObject();
		boolean result = this.adminQuestionService.addQuestion(qContent);
		json.put("result", result);
		return json.toJSONString();
	}
	@RequestMapping(value = "/admin/findQuestion", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String addQuestion(int qId) {
		JSONObject json = new JSONObject();
		Question question=this.adminQuestionService.findQuestion(qId);
		json.put("question", question);
		return json.toJSONString();
	}
	@RequestMapping(value = "/admin/deleteQuestion", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String deleteQuestion(int id) {
		JSONObject json = new JSONObject();
		boolean result=this.adminQuestionService.deleteQuestion(id);
		json.put("status", result);
		if(result==false){
			json.put("message", "该数据已被他人删除");
		}
		return json.toJSONString();
	}
	@RequestMapping(value = "/admin/editQuestion", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String editQuestion(int qId,String qContent) {
		JSONObject json = new JSONObject();
		Map<String,Object> map=this.adminQuestionService.editQuestion(qContent, qId);
		json.putAll(map);
     	return json.toJSONString();
	}
	
}
