package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import dto.Teacher;
import service.AdminTeacherService;

@Controller
public class AdminTeacherController {
  @Autowired
  private AdminTeacherService adminTeacherService;
  @RequestMapping(value = "/admin/getAllTeacher", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String findAll(){
	  JSONObject json=new JSONObject();
	  List<Teacher> teachers=this.adminTeacherService.findAll();
	  json.put("teachers", teachers);
	  return json.toJSONString();
  }
}
