package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.MyClass;

@Repository
public class AdminClassDao {
   @Autowired
   private JdbcTemplate jdbcTemplate;
   public List<MyClass> searchAll(){
	   String sql="select * from t_class";
	   return this.jdbcTemplate.query(sql, new RowMapper<MyClass>(){

		@Override
		public MyClass mapRow(ResultSet rs, int arg1) throws SQLException {
			MyClass myClass=new MyClass();
			myClass.setId(rs.getInt("c_id"));
			myClass.setName(rs.getString("c_name"));
			return myClass;
		}});
	   
   }
}
