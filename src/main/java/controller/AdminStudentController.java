package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import service.AdminStudentService;

@Controller
public class AdminStudentController {
  @Autowired
  private AdminStudentService adminStudentService;
  @RequestMapping(value = "/admin/getAllStudents", produces = "text/html;charset=UTF-8")
	@ResponseBody
  public String getAllStudent(){
	  JSONObject json=new JSONObject();
	  json.put("students", this.adminStudentService.findAll());
	  return json.toJSONString();
  }
}
