package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.EvaArrangeModel;
import dto.Project;

@Repository
public class ProjectDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Project> findPage(int startRow, int size, String curName) {
		StringBuffer sql = new StringBuffer("select * from t_curriculum where 1=1");
		if (curName != null && curName.trim().length() > 0) {
			sql.append(" and cur_name='").append(curName).append("'");
		}
		sql.append(" limit ").append(startRow).append(",").append(size);
		List<Project> projects = this.jdbcTemplate.query(sql.toString(), new RowMapper<Project>() {

			@Override
			public Project mapRow(ResultSet rs, int arg1) throws SQLException {
				// TODO Auto-generated method stub
				Project project = new Project();
				project.setCurId(rs.getInt("cur_id"));
				project.setCurName(rs.getString("cur_name"));
				project.setCurSexamId(rs.getInt("cur_sexam_id"));
				project.setCurGexamId(rs.getInt("cur_gexam_id"));
				return project;
			}
		});
		if (projects.size() > 0) {
			return projects;
		} else {
			return null;
		}
	}
	public int count(String curName) {
		StringBuffer sql = new StringBuffer("select count(*) from t_curriculum where 1=1");
		if (curName != null && curName.trim().length() > 0) {
			sql.append(" and cur_name='").append(curName).append("'");
		}
		return this.jdbcTemplate.queryForObject(sql.toString(), Integer.class);
	}
	public boolean insert(String curName,int curSexamId,int curGexamId){
    	String sql="insert into t_curriculum values(null,?,?,?)";
    	return this.jdbcTemplate.update(sql, curName,curSexamId,curGexamId)>0;
    }
    public boolean update(int curId,String curName,int curSexamId,int curGexamId){
    	String sql="update t_curriculum set cur_name=?,cur_sexam_id=?,cur_gexam_id=? where cur_id=?";
    	return this.jdbcTemplate.update(sql, curName,curSexamId,curGexamId,curId)>0;
    }
    public boolean delete(int curId){
    	String sql="delete from t_curriculum where cur_id=?";
    	return this.jdbcTemplate.update(sql,curId)>0;
    }
    public Project searchModel(String curName,int curId){
    	StringBuffer sql=new StringBuffer("select * from t_curriculum where 1=1");
    	if(curId!=0){
    		sql.append(" and cur_id=").append(curId);
    	}
    	
    	if(curName!=null&&curName.trim().length()>0){
    		sql.append(" and cur_name='").append(curName).append("'");
    	}
    	System.out.println(sql.toString());
    	
    	List<Project> list=this.jdbcTemplate.query(sql.toString(), new RowMapper<Project>(){

    		@Override
			public Project mapRow(ResultSet rs, int arg1) throws SQLException {
				// TODO Auto-generated method stub
				Project project = new Project();
				project.setCurId(rs.getInt("cur_id"));
				project.setCurName(rs.getString("cur_name"));
				project.setCurSexamId(rs.getInt("cur_sexam_id"));
				project.setCurGexamId(rs.getInt("cur_gexam_id"));
				return project;
			}});
    	if(list.size()!=0){
    		return list.get(0);
    	}else{
    		return null;
    	}
    }
}
