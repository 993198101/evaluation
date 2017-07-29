package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import dto.MyClass;
import service.AdminClassService;

@Controller
public class AdminClassController {
     @Autowired
     private AdminClassService adminClassService;
     @RequestMapping(value = "/admin/getAllClass", produces = "text/html;charset=UTF-8")
 	@ResponseBody
 	public String getAllClass(){
    	 JSONObject json=new JSONObject();
    	 List<MyClass> classes=this.adminClassService.findAll();
    	 json.put("classes", classes);
    	 return json.toJSONString();
     }
}
