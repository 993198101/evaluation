package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Admin;

@Repository
public class AdminDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
//	ͨ���û����ҵ��û�
   public Admin searchAdmin(String username){
	   String sql="select * from t_admin where user_name=?";
	   List<Admin> list=this.jdbcTemplate.query(sql, new RowMapper<Admin>(){
       @Override
		public Admin mapRow(ResultSet rs, int arg1) throws SQLException {
			// TODO Auto-generated method stub
			Admin admin=new Admin();
			admin.setId(rs.getInt("id"));
			admin.setUsername(rs.getString("user_name"));
			admin.setPassword(rs.getString("user_password"));;
			admin.setLevel(rs.getInt("user_level"));
			admin.setUserId(rs.getInt("user_id"));
			return admin;
		}

		},username);
	  if(list.size()==1){
		  return list.get(0);
	  }else{
		  return null;
	  }
   }
//   ��������
   public int resetPassword(int id,String password){
	   int result=-1;
	   String sql="update t_admin set user_password=? where id=?";
	   result=this.jdbcTemplate.update(sql,password, id);
	   return result;
   }
//   ע���˺�
   public boolean register(String newUsername,String newPassword,String userRealName){
	   String sql="insert into t_admin values(null,?,?,'1','1')";
	   return this.jdbcTemplate.update(sql, newUsername,newPassword,userRealName)>=0;
   }
}
