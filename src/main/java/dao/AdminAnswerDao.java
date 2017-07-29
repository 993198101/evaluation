package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Answer;

@Repository
public class AdminAnswerDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
    public List<Answer> searchPage(int aQid,int aScore,String aOrder,int startRow,int size){
    	StringBuffer sql=new StringBuffer("select * from t_answer where 1=1");
    	if(aQid!=0){
    		sql.append(" and a_q_id=").append(aQid);
    	}
    	if(aScore!=0){
    		sql.append(" and a_score=").append(aScore);
    	}
    	if(aOrder!=null){
    		sql.append(" and a_order=").append("'").append(aOrder).append("'");
    	}
    	if(startRow>=0&&size>0){
    		sql.append(" limit ").append(startRow).append(",").append(size);
    	}
        return this.jdbcTemplate.query(sql.toString(), new RowMapper<Answer>(){

			@Override
			public Answer mapRow(ResultSet rs, int arg1) throws SQLException {
				Answer answer=new Answer();
				answer.setaId(rs.getInt("a_id"));
				answer.setaContent(rs.getString("a_content"));
				answer.setaQid(rs.getInt("a_q_id"));
				answer.setaScore(rs.getInt("a_score"));
				answer.setaOrder(rs.getString("a_order"));
				return answer;
			}});
    }
    public Long countAnswer(int aQid,int aScore,String aOrder){
    	StringBuffer sql=new StringBuffer("select count(*) count from t_answer where 1=1");
    	if(aQid!=0){
    		sql.append(" and a_q_id=").append(aQid);
    	}
    	if(aScore!=0){
    		sql.append(" and a_score=").append(aScore);
    	}
    	if(aOrder!=null){
    		sql.append(" and a_order=").append("'").append(aOrder).append("'");
    	}
    	return this.jdbcTemplate.queryForObject(sql.toString(), Long.class);
    }
    public Answer getAnswer(int aId){
    	String sql="select * from t_answer where a_id="+aId;
    	
    	Answer answer=this.jdbcTemplate.queryForObject(sql, new RowMapper<Answer>(){

			@Override
			public Answer mapRow(ResultSet rs, int arg1) throws SQLException {
				Answer answer=new Answer();
				answer.setaId(rs.getInt("a_id"));
				answer.setaContent(rs.getString("a_content"));
				answer.setaQid(rs.getInt("a_q_id"));
				answer.setaScore(rs.getInt("a_score"));
				answer.setaOrder(rs.getString("a_order"));
				return answer;
			}});
    	return answer;
    }
    public boolean addAnswer(Answer answer){
    	String sql="insert into t_answer values(null,?,?,?,?)";
    	return this.jdbcTemplate.update(sql, answer.getaContent(),answer.getaScore(),answer.getaQid(),answer.getaOrder())>0;
    }
    public boolean editAnswer(Answer answer){
    	String sql="update t_answer set a_content=?,a_score=? where a_id=?";
    	return this.jdbcTemplate.update(sql, answer.getaContent(),answer.getaScore(),answer.getaId())>0;

    }
    public boolean deleteAnswer(int id){
    	String sql="delete from t_answer where a_id="+id;
    	return this.jdbcTemplate.update(sql)>0;
    }
}
