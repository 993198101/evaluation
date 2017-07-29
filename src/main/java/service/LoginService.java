package service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;

import dao.LoginDao;

import dto.Student;
import dto.Supervisor;

@Service
public class LoginService {
	@Autowired
	private LoginDao loginDao;
	@Autowired
	private Md5PasswordEncoder md5PasswordEncoder;

	/**
	 * 登录
	 * 
	 * @param username
	 * 
	 * @param password
	 * 
	 * 
	 * 
	 * @return result=1账号不存在，2正确，3密码错误
	 */
	public Map<String, Object> validate(String username, String password) {
		Student student = loginDao.studentLogin(username);
		Supervisor supervisor = loginDao.supervisorLogin(username);
		String message = null;
        System.out.println(this.md5PasswordEncoder.encodePassword(password, null));
		Map<String, Object> map = new HashMap<String, Object>();
		int result = 0;
		if (supervisor == null) {

			if (student == null) {
				message = "账号不存在";
				result = 1;
			} else if (student.getStuPassword().equals(this.md5PasswordEncoder.encodePassword(password, null))) {

				result = 2;
				map.put("student", student);
			} else {
				result = 3;
				message = "密码错误";
				
			}
		} else if(supervisor.getSupervisorPassword().equals(this.md5PasswordEncoder.encodePassword(password, null))){
			result = 2;
			map.put("supervisor", supervisor);
		} else {
			result = 3;
			message = "密码错误";
		
		}
		map.put("result", result);
		map.put("message", message);
		return map;
	}
	/**
	 *修改学生密码
	 * 
	 * 
	 * 
	 * @return result=false原密码错误，true成功
	 */
	public boolean editStuPassword(Student student,String oPassword,String nPassword){
		boolean result=false;
		if(student.getStuPassword().equals(this.md5PasswordEncoder.encodePassword(oPassword, null))){
			result= this.loginDao.updateStuPassword(student.getStuId(), this.md5PasswordEncoder.encodePassword(nPassword, null));
		}
		return result;
	}
	/**
	 *修改supvisor密码
	 * 
	 * 
	 * 
	 * @return result=false原密码错误，true成功
	 */
	public boolean editSupPassword(Supervisor sup,String oPassword,String nPassword){
		boolean result=false;
		if(sup.getSupervisorPassword().equals(this.md5PasswordEncoder.encodePassword(oPassword, null))){
			result= this.loginDao.updateSupercisorPassword(sup.getSupervisorId(), this.md5PasswordEncoder.encodePassword(nPassword, null));
		}
		
		return result;
	}
	/**
	 *修改学生tel
	 * 
	 * 
	 * 
	 * @return result=false，true成功
	 */
	public boolean editStuTel(Student student,String tel){
		boolean result=false;
		result= this.loginDao.updateStuTel(student.getStuId(), tel);
		
		return result;
	}
	/**
	 *修改supvisorTel
	 * 
	 * 
	 * 
	 * @return result=false，true成功
	 */
	public boolean editSupTel(Supervisor sup,String tel){
		boolean result=false;
		result= this.loginDao.updateSupercisorTel(sup.getSupervisorId(), tel);
		return result;
	}
	/**
	 *修改学生image
	 * 
	 * 
	 * 
	 * @return result=false，true成功
	 */
	public boolean editStuImage(Student student,String image){
		boolean result=false;
		result= this.loginDao.updateStuImage(student.getStuId(), image);
		
		return result;
	}
	/**
	 *修改supvisorImage
	 * 
	 * 
	 * 
	 * @return result=false，true成功
	 */
	public boolean editSupImage(Supervisor sup,String image){
		boolean result=false;
		result= this.loginDao.updateSupercisorImage(sup.getSupervisorId(), image);
		return result;
	}
	
}
