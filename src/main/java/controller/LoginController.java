package controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.alibaba.fastjson.JSONObject;

import dto.Student;
import dto.Supervisor;
import service.LoginService;


@Controller
public class LoginController {
	
	@Autowired
      private LoginService loginService;
	/**
	 * 登录
	 * @param username
	 *           
	 * @param password
	 *            
	 *  @param session
	 *           
	 * @return result=1账号不存在，2正确，3密码错误
	 */
	@RequestMapping(value="/logincontroller", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String checkLogin(String username,String password,HttpSession session){
		Map<String,Object> result=this.loginService.validate(username, password);
		int userType=0;
		if(result.get("result").equals(2)){
			Student student=(Student) result.get("student");
			if(student!=null){
				userType=1;
				session.setAttribute("user", student);
			}else{
				userType=2;
				session.setAttribute("user", result.get("supervisor"));
			}
			
		}
		session.setAttribute("userType", userType);
		JSONObject json = new JSONObject();
		json.put("result", result);
		return json.toJSONString();
	}
	/**
	 *  找到用户信息
	 * 
	 * @param session
	 *            
	 * @return result   0不存在，1成功找到
	 */
	@RequestMapping(value="/finduser", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String findUser(HttpSession session){
		JSONObject json = new JSONObject();
		Integer userType=(Integer) session.getAttribute("userType");
		if(userType==null){
			userType=0;
			json.put("message", "未登陆");
		}else if(userType==1){
			Student student=(Student) session.getAttribute("user");
			if(student!=null){
				json.put("user", student);
			}
		}else if(userType==2){
			Supervisor supervisor=(Supervisor) session.getAttribute("user");
			if(supervisor!=null){
				json.put("user", supervisor);
			}
		}
		json.put("userType", userType);
		return json.toJSONString();
	}
	@RequestMapping("/main")
	public String main(String url){
		String link="main";
		if(url!=null){
			link+=url;
		}
		return link;
	}
	@RequestMapping("/index")
	public String gotoIndex(){
		return "index";
	}
	@RequestMapping("/curriculum")
	public String gotoCurriculum(){
		return "curriculum";
	}
	@RequestMapping("/userInformation")
	public String gotoUserInformation(){
		return "userInformation";
	}
	/**
	 * 修改密码
	 *           
	 * @return result=1原密码错误，2正确，0session失效
	 */
	@RequestMapping(value="/editPassword", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String editPassword(String nPassword,String oPassword,HttpSession session){
		JSONObject json=new JSONObject();
		Integer type=(Integer) session.getAttribute("userType");
		int result=1;   //原密码错误
		if(type!=null){
			if(type==1){
				Student student=(Student) session.getAttribute("user");
				boolean rs=this.loginService.editStuPassword(student, oPassword, nPassword);
				if(rs){
					result=2; //修改成功
				}
			}
			if(type==2){
				Supervisor sup=(Supervisor) session.getAttribute("user");
				boolean rs=this.loginService.editSupPassword(sup, oPassword, nPassword);
				if(rs){
					result=2; //修改成功
				}
			}
		}else{
			result=0;    //session失效
		}
		json.put("result", result);
		return json.toJSONString();
	}
	@RequestMapping(value="/editTel", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String editTel(HttpSession session,String tel){
		JSONObject json=new JSONObject();
		Integer type=(Integer) session.getAttribute("userType");
		int result=1;
		if(type!=null){
			if(type==1){
				Student student=(Student) session.getAttribute("user");
				boolean rs=this.loginService.editStuTel(student, tel);
				if(rs){
					result=2; //修改成功
				}
			}
			if(type==2){
				Supervisor sup=(Supervisor) session.getAttribute("user");
				boolean rs=this.loginService.editSupTel(sup, tel);
				if(rs){
					result=2; //修改成功
				}
			}
		}else{
			result=0;    //session失效
		}
		json.put("result", result);
		return json.toJSONString();
	}
	@RequestMapping(value="/editImage", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String editImage(HttpSession session,String image){
		JSONObject json=new JSONObject();
		Integer type=(Integer) session.getAttribute("userType");
		int result=1;
		if(type!=null){
			if(type==1){
				Student student=(Student) session.getAttribute("user");
				boolean rs=this.loginService.editStuImage(student, image);
				if(rs){
					result=2; //修改成功
				}
			}
			if(type==2){
				Supervisor sup=(Supervisor) session.getAttribute("user");
				boolean rs=this.loginService.editSupImage(sup, image);
				if(rs){
					result=2; //修改成功
				}
			}
		}else{
			result=0;    //session失效
		}
		json.put("result", result);
		return json.toJSONString();
	}
	@RequestMapping("/about")
	public String gotoAbout(){
		return "about";
	}
	@RequestMapping("invalidate")
	public void invalidate(HttpSession session){
		session.invalidate();
	}
	
}
