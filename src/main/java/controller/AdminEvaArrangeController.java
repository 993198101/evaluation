package controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import service.AdminEvaArrangeService;

@Controller
public class AdminEvaArrangeController {
  @Autowired
  private AdminEvaArrangeService adminEvaArrangeService;
  @RequestMapping(value="/admin/getAllEvaArranges",produces="text/html;charset=utf-8")
  @ResponseBody
  public String getAllEvaArranges(int page,int size,int s_stuId,int s_groupId,String s_term){
	  JSONObject json=new JSONObject();
	  Map<String,Object> map=this.adminEvaArrangeService.searchPage(page, size,s_stuId,s_groupId,s_term);
	  json.putAll(map);
	  return json.toJSONString();
  }
  @RequestMapping(value="/admin/getAllCurs",produces="text/html;charset=utf-8")
  @ResponseBody
  public String getAllCurs(){
	  JSONObject json=new JSONObject();
	  json.put("curs", this.adminEvaArrangeService.findAll());
	  return json.toJSONString();
  }
  @RequestMapping(value="/admin/addArrange",produces="text/html;charset=utf-8")
  @ResponseBody
  public String add(int stuId,int curId,int teaId,String term,int groupId,int cId){
	  JSONObject json=new JSONObject();
	  boolean result=false;
	  if(cId==0){
		   result=this.adminEvaArrangeService.add(stuId, curId, teaId, term, groupId);
		   json.put("result", result);
	  }else{
		  Map<String,Object> map=this.adminEvaArrangeService.edit(stuId, curId, teaId, term, groupId, cId);
		  json.putAll(map);
	  }
	  
	  
	  return json.toJSONString();
  }
  @RequestMapping(value="/admin/deleteArrange",produces="text/html;charset=utf-8")
  @ResponseBody
  public String delete(int cId){
	  JSONObject json=new JSONObject();
	  boolean result=false;
	  Map<String,Object> map=this.adminEvaArrangeService.delete(cId);
	  json.putAll(map);
	  return json.toJSONString();
  }
  @RequestMapping(value="/admin/getArrange",produces="text/html;charset=utf-8")
  @ResponseBody
  public String getEdit(int cId){
	  JSONObject json=new JSONObject();
	  
	  json.put("arrange", this.adminEvaArrangeService.get(cId));
	  return json.toJSONString();
  }
}
