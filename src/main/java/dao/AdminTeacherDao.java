package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;



import dto.Teacher;

@Repository
public class AdminTeacherDao {
	@Autowired
	private JdbcTemplate jdbcTemlate;
   public List<Teacher> seacrchAll(){
	   String sql="select * from t_teacher";
	   return this.jdbcTemlate.query(sql, new RowMapper<Teacher>(){

		@Override
		public Teacher mapRow(ResultSet rs, int arg1) throws SQLException {
			Teacher teacher=new Teacher();
			teacher.setId(rs.getInt("tea_id"));
			teacher.setName(rs.getString("tea_name"));
			return teacher;
		}});
   }
}
