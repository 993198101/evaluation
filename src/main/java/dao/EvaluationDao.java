package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Answer;
import dto.Curriculum;
import dto.Evaluation;
import dto.ExamPaper;
import dto.Question;
import dto.Teacher;

@Repository
public class EvaluationDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	public ExamPaper searchStuByCurId(int curId){
		   String sql="select * from t_curriculum left join t_exam_paper on cur_sexam_id=exam_id where cur_id="+curId;
		   return this.jdbcTemplate.queryForObject(sql.toString(), new RowMapper<ExamPaper>(){

			@Override
			public ExamPaper mapRow(ResultSet rs, int arg1) throws SQLException {
				ExamPaper examPaper=new ExamPaper();
				examPaper.setExamId(rs.getInt("exam_id"));
				examPaper.setExamName(rs.getString("exam_name"));
				examPaper.setExamQuestion(rs.getString("exam_question"));
				return examPaper;
			}});
	   }
	
     public List<Question> searchExamQa(int examId){
    	
		 String sql = "select q.*,a.* from t_question q left join t_answer a on a.a_q_id=q.q_id where " +
	                "find_in_set(q.q_id,(select exam_question from t_exam_paper exam where exam.exam_id="+examId+"))";
		 List<Question> questions=new ArrayList<Question>();
		this.jdbcTemplate.query(sql, new RowMapper<Question>(){

			@Override
			public Question mapRow(ResultSet resultSet, int arg1) throws SQLException {
				int questionId=resultSet.getInt("q_id");
                Question question=null;
                for(Question q:questions){
                    if(q.getqId()==questionId){
                        question=q;
                        
                        break;
                    }
                }
                if(question==null){
                    question=new Question();
                    question.setqId(questionId);
                    questions.add(question);
                    
                }
                question.setqContent(resultSet.getString("q_content"));
                if(question.getAnswers()==null){
                    question.setAnswers(new ArrayList<Answer>());
                }
                Answer answer=new Answer();
                answer.setaId(resultSet.getInt("a_id"));
                answer.setaContent(resultSet.getString("a_content"));
                answer.setaOrder(resultSet.getString("a_order"));
                answer.setaQid(resultSet.getInt("a_q_id"));
                answer.setaScore(resultSet.getInt("a_score"));
                question.getAnswers().add(answer);
              
				return question;
			}});
	
		return questions;
	}
     public boolean insertStuScore(int stuId,int cId,int score){
    	 String sql="insert into t_stu_score values(?,?,?)";
    	 return this.jdbcTemplate.update(sql, stuId,score,cId)>0;
     }
     public boolean insertSupScore(int supId,int cId,int score,int groupId){
    	 String sql="insert into t_sup_score values(?,?,?,?)";
    	 return this.jdbcTemplate.update(sql, supId,score,groupId,cId)>0;
     }
}
