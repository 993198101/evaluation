package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Student;
import dto.Supervisor;

@Repository
public class LoginDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public Student studentLogin(String username){
    	String sql="select * from t_student where stu_user_name='"+username+"'";
    	List<Student> students=this.jdbcTemplate.query(sql, new RowMapper<Student>(){

			@Override
			public Student mapRow(ResultSet rs, int arg1) throws SQLException {
				Student student=new Student();
				student.setStuId(rs.getInt("stu_id"));
				student.setStuPassword(rs.getString("stu_password"));
				student.setStuRealName(rs.getString("stu_real_name"));
				student.setStuImage(rs.getString("stu_image"));
				student.setStuStuId(rs.getInt("stu_stuId"));
				student.setStuTel(rs.getString("stu_tel"));
				return student;
			}});
    	if(students.size()!=0){
    		return students.get(0);
    	}else{
    		return null;
    	}
    }
    public Supervisor supervisorLogin(String username){
    	String sql="select * from t_supervisor where supervisor_username='"+username+"'";
    	List<Supervisor> supervisors=this.jdbcTemplate.query(sql, new RowMapper<Supervisor>(){

			@Override
			public Supervisor mapRow(ResultSet rs, int arg1) throws SQLException {
				Supervisor supervisor=new Supervisor();
				supervisor.setSupervisorId(rs.getInt("supervisor_id"));
				supervisor.setSupervisorName(rs.getString("supervisor_name"));
				supervisor.setSupervisorUsername(rs.getString("supervisor_username"));
				supervisor.setSupervisorPassword(rs.getString("supervisor_password"));
				supervisor.setSupervisorGroupId(rs.getInt("supervisor_of_group"));
				supervisor.setSupervisorImage(rs.getString("supervisor_image"));
				supervisor.setSupervisorPhoneNumber(rs.getString("supervisor_phone_number"));
				return supervisor;
			}});
    	if(supervisors.size()!=0){
    		return supervisors.get(0);
    	}else{
    		return null;
    	}
    }
    public boolean updateStuPassword(int stuId,String password){
    	String sql="update t_student set stu_password=? where stu_id=?";
    	return this.jdbcTemplate.update(sql, password,stuId)>0;
    }
    public boolean updateSupercisorPassword(int supId,String password){
    	String sql="update t_supervisor set supervisor_password=? where supervisor_id=?";
    	return this.jdbcTemplate.update(sql, password,supId)>0;
    }
    public boolean updateStuTel(int stuId,String tel){
    	String sql="update t_student set stu_tel=? where stu_id=?";
    	return this.jdbcTemplate.update(sql, tel,stuId)>0;
    }
    public boolean updateSupercisorTel(int supId,String tel){
    	String sql="update t_supervisor set supervisor_phone_number=? where supervisor_id=?";
    	return this.jdbcTemplate.update(sql, tel,supId)>0;
    }
    public boolean updateStuImage(int stuId,String image){
    	String sql="update t_student set stu_image=? where stu_id=?";
    	return this.jdbcTemplate.update(sql, image,stuId)>0;
    }
    public boolean updateSupercisorImage(int supId,String image){
    	String sql="update t_supervisor set supervisor_image=? where supervisor_id=?";
    	return this.jdbcTemplate.update(sql, image,supId)>0;
    }
}
