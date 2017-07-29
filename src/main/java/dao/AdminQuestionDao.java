package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Question;

@Repository
public class AdminQuestionDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	public List<Question> searchPage(int qId,String qContent,int startRow,int size){
    	StringBuffer sql=new StringBuffer("select * from t_question where 1=1");
    	if(qId!=0){
    		sql.append(" and q_id=").append(qId);
    	}
    	if(qContent!=null){
    		sql.append(" and q_content like").append("'%").append(qContent).append("%'");
    	}
    	if(startRow>=0&&size>0){
    		sql.append(" limit ").append(startRow).append(",").append(size);
    	}
    	return this.jdbcTemplate.query(sql.toString(), new RowMapper<Question>(){

			@Override
			public Question mapRow(ResultSet rs, int arg1) throws SQLException {
				Question question=new Question();
				question.setqId(rs.getInt("q_id"));
				question.setqContent(rs.getString("q_content"));
				return question;
			}});
    }
	public int count(int qId,String qContent){
		StringBuffer sql=new StringBuffer("select count(*) count from t_question where 1=1");
		if(qId!=0){
    		sql.append(" and q_id=").append(qId);
    	}
    	if(qContent!=null){
    		sql.append(" and q_content=").append("'").append(qContent).append("'");
    	}
    	return this.jdbcTemplate.queryForObject(sql.toString(), Integer.class);
	}
	public boolean insert(String qContent){
		String sql="insert into t_question values (null,?)";
		return this.jdbcTemplate.update(sql, qContent)>0;
	}
	public Question searchQuestion(int id,String qContent){
		StringBuffer sql=new StringBuffer("select * from t_question where 1=1");
		if(id!=0){
			sql.append(" and q_id=").append(id);
		}
		if(qContent!=null&&qContent.length()>0){
			sql.append(" and q_content=").append("'").append(qContent).append("'");
		}
		List<Question> questions=this.jdbcTemplate.query(sql.toString(),new RowMapper<Question>(){

			@Override
			public Question mapRow(ResultSet rs, int arg1) throws SQLException {
				Question question=new Question();
				question.setqId(rs.getInt("q_id"));
				question.setqContent(rs.getString("q_content"));
				return question;
			}});
		if(questions.size()!=0){
			return questions.get(0);
		}else{
			return null;
		}
	}
	public boolean delete(int id){
		String sql="delete from t_question where q_id="+id;
		return this.jdbcTemplate.update(sql)>0;
	}
	public boolean update(String qContent,int qId){
		String sql="update t_question set q_content=? where q_id=?";
		return this.jdbcTemplate.update(sql,qContent,qId)>0;
	}
	
}
