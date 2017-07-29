package controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import dto.Admin;
import service.AdminLoginService;


@Controller
public class AdminLoginController {
	@Autowired
	private AdminLoginService adminLoginService;
    /**
	* 找到后台登录页
	* 
	* 
	* @return
	*/
    @RequestMapping(value={"/admin/","/admin/toLogin"})
    public String login(){
    	return "admin/login_2";
    }
    /**
	 * 找到后台主页
	 * 
	 * @param url
	 ** @return 
	 */
    @RequestMapping(value="/admin/main")
    public String go(String date){
    	return "admin/main";
    }
    @RequestMapping(value="/admin/logout")
    public String go(HttpSession session){
    	session.invalidate();
    	return null;
    }
    /**
	 * 登录
	 * 
	 * @param name
	 *            账号
	 * @param password
	 *            密码
	 * @param session
	 *           
	 * @return
	 */
	@RequestMapping(value = "/admin/login", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String login(String name, String password, HttpSession session) {
		JSONObject json = new JSONObject();
		Map<String, Object> map = this.adminLoginService.validate(name, password);
		int result = (Integer) map.get("result");
		if(result==2){
			Admin admin = (Admin) map.get("admin");
			session.setAttribute("adminUser", admin);
		}
		json.putAll(map);
		return json.toJSONString();
	}
	/**
	 * 重置密码
	 * 
	 * @param username
	 *           账号
	 * @param resCode
	 *            重置码
	 *
	 ** @return result=-1账号不存在，0resetcode错误 1成功
	 */
	@RequestMapping(value = "/admin/resetPassword", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String resetPassword(String username, String resetCode) {
		JSONObject json = new JSONObject();
		int result=adminLoginService.resetPassword(username, resetCode);
		json.put("result", result);
		return json.toJSONString();
	}
	/**
	 * 注册账号
	 * 
	 * @param newUsername newPassword ueserRealName inviteCode
	 *           新账号              新密码                    用户真实姓名         邀请码
	 *
	 ** @return result=0账号重复，-1邀请码错误，1成功
	 */
	@RequestMapping(value = "/admin/register", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String register(String newUsername, String newPassword,String userRealName,String inviteCode) {
		JSONObject json = new JSONObject();
		int result=adminLoginService.register(newUsername, newPassword, userRealName, inviteCode);
		json.put("result", result);
		return json.toJSONString();
	}
	@RequestMapping(value = "/admin/findUser", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String findUser(HttpSession session){
		JSONObject json=new JSONObject();
		Admin admin=(Admin) session.getAttribute("adminUser");
		if(admin!=null){
			json.put("user", admin);
		}
		return json.toJSONString();
	}

}
