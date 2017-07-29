package service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;

import dao.AdminDao;
import dto.Admin;

@Service
public class AdminLoginService {
	@Autowired
	private AdminDao adminDao;
	 @Autowired
     private Md5PasswordEncoder md5PasswordEncoder;
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
	public Map<String,Object> validate(String username, String password) {
		Map<String,Object> map = new HashMap<String,Object>();
		int result = 0;
		Admin admin = adminDao.searchAdmin(username);
		if (admin != null) {
			if (admin.getPassword().equals(this.md5PasswordEncoder.encodePassword(password, null))) {
				result = 2;
				map.put("admin", admin);
			} else {
				result=1;
			}
		}
		map.put("result", result);
		return map;
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
	public int resetPassword(String username,String resetCode){
		int a=-1;
		Admin admin=adminDao.searchAdmin(username);
		if(admin!=null){
			a=0;
			if(this.md5PasswordEncoder.encodePassword(resetCode, null).equals("5daaed0050db42c3514ca27c9d4d6f2f")){
				a=1;
				adminDao.resetPassword(admin.getId(),this.md5PasswordEncoder.encodePassword("123456", null)); 
			}
		}
		return a;
	}
	/**
	 * 注册账号
	 * 
	 * @param newUsername newPassword ueserRealName inviteCode
	 *           新账号              新密码                    用户真实姓名         邀请码
	 *
	 ** @return result=0账号重复，-1邀请码错误，1成功
	 */
	public int register(String newUsername,String newPassword,String userRealName,String inviteCode){
		int a=-1;
		Admin admin=adminDao.searchAdmin(newUsername);
		if(admin!=null){
			a=0;
		}else
		if(this.md5PasswordEncoder.encodePassword(inviteCode, null).equals("5daaed0050db42c3514ca27c9d4d6f2f")){
			a=1;
			newPassword=this.md5PasswordEncoder.encodePassword(newPassword, null);
			adminDao.register(newUsername, newPassword, userRealName);
		}
		return a;
	}
}
