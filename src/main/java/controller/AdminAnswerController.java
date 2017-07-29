package controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import dto.Answer;
import model.EvaluationModel;
import service.AdminAnswerService;

@Controller
public class AdminAnswerController {
	@Autowired
	private AdminAnswerService adminAnswerService;

	@RequestMapping(value = "/admin/getAllAnswer", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getPageAnswer(int page, int size, int s_aQid, int s_aScore, String s_aOrder) {
		JSONObject json = new JSONObject();
		Map<String, Object> map = this.adminAnswerService.searchPage(s_aQid, s_aScore, s_aOrder, page, size);
		json.putAll(map);
		return json.toJSONString();
	}

	@RequestMapping(value = "/admin/addAnswer", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String addAnswer(@RequestBody Answer answer) {
		JSONObject json = new JSONObject();
		Map<String, Object> map = new HashMap<String, Object>();
		if (answer.getaId() == 0) {
			map = this.adminAnswerService.addAnswer(answer);
		}
		json.putAll(map);
		return json.toJSONString();
	}

	@RequestMapping(value = "/admin/editAnswer", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String editAnswer(@RequestBody Answer answer) {
		JSONObject json = new JSONObject();
		Map<String, Object> map = new HashMap<String, Object>();
		map = this.adminAnswerService.editAnswer(answer);
		json.putAll(map);
		return json.toJSONString();
	}
	@RequestMapping(value = "/admin/getEditAnswer", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getEditAnswer(int aId) {
		JSONObject json = new JSONObject();
		Answer answer=this.adminAnswerService.getAnswer(aId);
		json.put("answer",answer);
		return json.toJSONString();
	}
	@RequestMapping(value = "/admin/deleteAnswer", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String deleteAnswer(int id) {
		JSONObject json = new JSONObject();
		boolean status=this.adminAnswerService.deleteAnswer(id);
		json.put("status",status);
		if(status==false){
			json.put("message", "该数据已被他人删除");
		}
		return json.toJSONString();
	}
	

}
