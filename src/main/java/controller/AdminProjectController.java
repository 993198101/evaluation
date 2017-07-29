package controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import service.ProjectService;

@Controller
public class AdminProjectController {
   @Autowired
   private ProjectService projectService;
   @RequestMapping(value="/admin/getAllProjects",produces="text/html;charset=utf-8")
   @ResponseBody
   public String getAllProjects(int page,int size,String s_curName){
	   JSONObject json=new JSONObject();
		  Map<String,Object> map=this.projectService.searchPage(page, size, s_curName);
		  json.putAll(map);
		  return json.toJSONString();
   }
   @RequestMapping(value="/admin/addProject",produces="text/html;charset=utf-8")
   @ResponseBody
   public String add(String curName,int curSexamId,int curGexamId,int curId){
 	  JSONObject json=new JSONObject();
 	  boolean result=false;
 	  if(curId==0){
 		   result=this.projectService.add(curName, curSexamId, curGexamId);
 		   json.put("result", result);
 	  }else{
 		  Map<String,Object> map=this.projectService.edit(curId, curName, curSexamId, curGexamId);
 		  json.putAll(map);
 	  }
 	  
 	  
 	  return json.toJSONString();
   }
   @RequestMapping(value="/admin/deleteProject",produces="text/html;charset=utf-8")
   @ResponseBody
   public String delete(int curId){
 	  JSONObject json=new JSONObject();
 	  boolean result=false;
 	  Map<String,Object> map=this.projectService.delete(curId);
 	  json.putAll(map);
 	  return json.toJSONString();
   }
   @RequestMapping(value="/admin/getProject",produces="text/html;charset=utf-8")
   @ResponseBody
   public String getEdit(int curId){
 	  JSONObject json=new JSONObject();
 	  
 	  json.put("project", this.projectService.get(curId));
 	  return json.toJSONString();
   }
}
