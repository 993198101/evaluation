package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.ExamPaper;

@Repository
public class AdminExamPaperDao {
   @Autowired
   private JdbcTemplate jdbcTemplate;
   public List<ExamPaper> searchAll(){
	   String sql="select * from t_exam_paper";
	   return this.jdbcTemplate.query(sql, new RowMapper<ExamPaper>(){

		@Override
		public ExamPaper mapRow(ResultSet rs, int arg1) throws SQLException {
			ExamPaper examPaper=new ExamPaper();
			examPaper.setExamId(rs.getInt("exam_id"));
			examPaper.setExamName(rs.getString("exam_name"));
			examPaper.setExamQuestion(rs.getString("exam_question"));
			return examPaper;
		}});
   }
   
   public List<ExamPaper> searchPage(String examName,int[] examQuestions,int startRow,int size){
	   StringBuffer sql=new StringBuffer("select * from t_exam_paper where 1=1");
	   if(examName!=null&&examName.trim().length()>0){
		   sql.append(" and exam_name like ").append("'%").append(examName).append("%'");
	   }
	   if(examQuestions[0]!=0){
		   for(int examQuestion:examQuestions){
			  sql.append(" and exam_question like").append("'%").append(examQuestion).append("%'");
			  
		   }
	   }
	   if(startRow>=0&&size>0){
		   sql.append(" limit ").append(startRow).append(",").append(size);
	   }
	   return this.jdbcTemplate.query(sql.toString(), new RowMapper<ExamPaper>(){

		@Override
		public ExamPaper mapRow(ResultSet rs, int arg1) throws SQLException {
			ExamPaper examPaper=new ExamPaper();
			examPaper.setExamId(rs.getInt("exam_id"));
			examPaper.setExamName(rs.getString("exam_name"));
			examPaper.setExamQuestion(rs.getString("exam_question"));
			return examPaper;
		}});
   }
   public Long count(String examName,int[] examQuestions){
	   StringBuffer sql=new StringBuffer("select count(*) count from t_exam_paper where 1=1");
	   if(examName!=null&&examName.trim().length()>0){
		   sql.append(" and exam_name like ").append("'%").append(examName).append("%'");
	   }
	   if(examQuestions[0]!=0){
		   for(int examQuestion:examQuestions){
			  sql.append(" and exam_question like").append("'%").append(examQuestion).append("%'");
			  
		   }
	   }
	   return this.jdbcTemplate.queryForObject(sql.toString(), Long.class);
   }
   public boolean insert(String examName,String examQuestions){
	   String sql="insert into t_exam_paper values(null,?,?)";
	   return this.jdbcTemplate.update(sql, examName,examQuestions)>0;
   }
   public ExamPaper search(int examId,String examName,String examQuestions){
	   StringBuffer sql=new StringBuffer("select * from t_exam_paper where 1=1");
	   if(examId!=0){
		   sql.append(" and exam_id=").append(examId);
	   }
	   if(examName!=null&&examName.trim().length()>0){
		   sql.append(" and exam_name=").append("'").append(examName).append("'");
	   }
	   if(examQuestions!=null&&examQuestions.trim().length()>0){
		   sql.append(" and exam_question=").append("'").append(examQuestions).append("'");
	   }
	   List<ExamPaper> examPapers=this.jdbcTemplate.query(sql.toString(), new RowMapper<ExamPaper>(){

		@Override
		public ExamPaper mapRow(ResultSet rs, int arg1) throws SQLException {
			ExamPaper examPaper=new ExamPaper();
			examPaper.setExamId(rs.getInt("exam_id"));
			examPaper.setExamName(rs.getString("exam_name"));
			examPaper.setExamQuestion(rs.getString("exam_question"));
			return examPaper;
		}});
	   if(examPapers.size()!=0){
		   return examPapers.get(0);
	   }else{
		   return null;
	   }
   }
   public boolean update(int examId,String examName,String examQuestion){
	   String sql="update t_exam_paper set exam_name=?,exam_question=? where exam_id=?";
	   return this.jdbcTemplate.update(sql, examName,examQuestion,examId)>0;
   }
   public boolean delete(int examId){
	   String sql="delete from t_exam_paper where exam_id="+examId;
	   return this.jdbcTemplate.update(sql)>0;
   }
}
