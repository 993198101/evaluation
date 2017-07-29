package controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSONObject;

import dto.Evaluation;
import model.EvaluationModel;
import model.Test;
import service.AdminEvaluationService;
@Controller
public class AdminEvaluationController {
	@Autowired
	private AdminEvaluationService adminEvaluationService;
	@RequestMapping(value = "/admin/getAllEvaluation", produces = "text/html;charset=UTF-8")
	@ResponseBody
    public String getAllEvaluation(int page,int size,String s_term,int s_teaId,String s_curName,int s_stuId,int s_groupId){
		JSONObject json=new JSONObject();
		Map<String,Object> map=this.adminEvaluationService.searchPage(page, size, s_term, s_teaId, s_curName,s_stuId,s_groupId);
		json.putAll(map);
		return json.toJSONString();
	}
	@RequestMapping(value = "/admin/findDetail", produces = "text/html;charset=UTF-8")
	@ResponseBody
    public String findDetail(String cIdsStr){
		JSONObject json=new JSONObject();
		json.put("detail", this.adminEvaluationService.findDetail(cIdsStr));
		return json.toJSONString();
	}
//	@RequestMapping(value = "/admin/addEvaluation", produces = "text/html;charset=UTF-8")
//	@ResponseBody
//    public String addEvaluation(@RequestBody EvaluationModel evaluation){
//		JSONObject json=new JSONObject();
//		boolean result=false;
//		if(evaluation.getId()==0){
//			result=this.adminEvaluationService.addEvaluation(evaluation);
//		}else{
//			result=this.adminEvaluationService.updateEvaluation(evaluation);
//		}
//		
//		json.put("result", result);
//		return json.toJSONString();
//	}
//	
//	@RequestMapping(value = "/admin/findEvaluation",method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
//	@ResponseBody
//    public String fingEvaluation(int id){
//		JSONObject json=new JSONObject();
//		Evaluation evaluation=this.adminEvaluationService.findById(id);
//		if(evaluation==null){
//			json.put("message", "该数据不存在,或已被删除");
//		}else{
//			json.put("evaluation", evaluation);
//		}
//		
//		return json.toJSONString();
//	}
//	@RequestMapping(value = "/admin/deleteEvaluation", produces = "text/html;charset=UTF-8")
//	@ResponseBody
//    public String deleteEvaluation(int id){
//		JSONObject json=new JSONObject();
//		boolean status=this.adminEvaluationService.deleteEvaluation(id);
//		json.put("result", status);
//		return json.toJSONString();
//	}
    
}
