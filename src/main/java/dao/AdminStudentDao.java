package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Student;

@Repository
public class AdminStudentDao {
  @Autowired
  private JdbcTemplate jdbcTemplate;
  public List<Student> getAll(){
	  String sql="select * from t_student";
	  return this.jdbcTemplate.query(sql, new RowMapper<Student>(){

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
  }
}
