package controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import dto.Curriculum;
import dto.Student;
import dto.Supervisor;
import service.CurriculumService;

@Controller
public class CurriculumController {
  @Autowired
  private CurriculumService curriculumService;
  @RequestMapping(value = "/getAllCurriculum", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getAllCurriculum(HttpSession session,String term){
	  JSONObject json=new JSONObject();
	  Integer type=(Integer) session.getAttribute("userType");
	  if(type!=null){
			if(type==1){
				Student student=(Student) session.getAttribute("user");
				List<Curriculum> curriculums=this.curriculumService.findStudentCur(term, student.getStuId());
				 json.put("curriculums",curriculums);
			}
			if(type==2){
				Supervisor sup=(Supervisor) session.getAttribute("user");
				List<Curriculum> curriculums=this.curriculumService.findSupCur(term, sup.getSupervisorId(), sup.getSupervisorGroupId());
				json.put("curriculums",curriculums);
			}
		}
	 
	  return json.toJSONString();
	  
  }
}
