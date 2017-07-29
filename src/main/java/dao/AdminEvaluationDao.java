package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.github.pagehelper.Page;

import dto.Evaluation;
import dto.StuScore;
import dto.SupScore;
import dto.Teacher;
import model.EvaluationModel;

@Repository
public class AdminEvaluationDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Evaluation> searchPage(int startRow,int size,String term, int teaId, String curName,int stuId,int groupId) {
		StringBuffer sql = new StringBuffer(
				"select * from t_curriculum_schedule e inner join t_curriculum on c_curriculum_id=cur_id inner join t_teacher on tea_id=c_tea_id   where 1=1");
		if (term != null && term.trim().length() > 0) {
			sql.append(" and term='").append(term).append("'");
		}
		if (teaId != 0) {
			sql.append(" and c_tea_id=").append(teaId);
		}
		if (curName != null && curName.trim().length() > 0) {
			sql.append(" and cur_name like'%").append(curName).append("%'");
		}
		if(stuId!=0){
			sql.append(" and c_student_id=").append(stuId);
		}
		if(groupId!=0){
			sql.append(" and c_group_id=").append(groupId);
		}
		List<Evaluation> evaluations=new ArrayList<Evaluation>(); 
		this.jdbcTemplate.query(sql.toString(), new RowMapper<Evaluation>() {

			@Override
			public Evaluation mapRow(ResultSet rs, int arg1) throws SQLException {
				String term=rs.getString("term");
				String teaName=rs.getString("tea_name");
				int groupId=rs.getInt("c_group_id");
				String curName=rs.getString("cur_name");
				Evaluation evaluation=null;
				for(Evaluation e:evaluations){
					if(term.equals(e.getTerm())&&teaName.equals(e.getTeaName())&&groupId==e.getGroupId()&&curName.equals(e.getCurName())){
						evaluation=e;
						evaluation.getcIds().add(rs.getInt("c_id"));
					}
				}
				if(evaluation==null){
					evaluation=new Evaluation();
					evaluation.setCurName(curName);
					evaluation.setGroupId(groupId);
					evaluation.setTeaName(teaName);
					evaluation.setTerm(term);
					List<Integer> cIds=new ArrayList<Integer>();
					cIds.add(rs.getInt("c_id"));
					evaluation.setcIds(cIds);
					evaluations.add(evaluation);
				}
				return evaluation;
			}
		});
		List<Evaluation> save=new ArrayList<Evaluation>();
		for(int i=startRow;i<startRow+size;i++){
			if(i<=evaluations.size()-1)
			save.add(evaluations.get(i));
		}
		return save;
	}
	public int count(String term,int teaId,String curName,int stuId,int groupId){
		StringBuffer sql = new StringBuffer(
				"select * from t_curriculum_schedule e inner join t_curriculum on c_curriculum_id=cur_id inner join t_teacher on tea_id=c_tea_id   where 1=1");
		if (term != null && term.trim().length() > 0) {
			sql.append(" and term='").append(term).append("'");
		}
		if (teaId != 0) {
			sql.append(" and c_tea_id=").append(teaId);
		}
		if (curName != null && curName.trim().length() > 0) {
			sql.append(" and cur_name like'%").append(curName).append("%'");
		}
		if(stuId!=0){
			sql.append(" and c_student_id=").append(stuId);
		}
		if(groupId!=0){
			sql.append(" and c_group_id=").append(groupId);
		}
		List<Evaluation> evaluations=new ArrayList<Evaluation>(); 
		this.jdbcTemplate.query(sql.toString(), new RowMapper<Evaluation>() {

			@Override
			public Evaluation mapRow(ResultSet rs, int arg1) throws SQLException {
				String term=rs.getString("term");
				String teaName=rs.getString("tea_name");
				int groupId=rs.getInt("c_group_id");
				String curName=rs.getString("cur_name");
				Evaluation evaluation=null;
				for(Evaluation e:evaluations){
					if(term.equals(e.getTerm())&&teaName.equals(e.getTeaName())&&groupId==e.getGroupId()&&curName.equals(e.getCurName())){
						evaluation=e;
						evaluation.getcIds().add(rs.getInt("c_id"));
					}
				}
				if(evaluation==null){
					evaluation=new Evaluation();
					evaluation.setCurName(curName);
					evaluation.setGroupId(groupId);
					evaluation.setTeaName(teaName);
					evaluation.setTerm(term);
					List<Integer> cIds=new ArrayList<Integer>();
					cIds.add(rs.getInt("c_id"));
					evaluation.setcIds(cIds);
					evaluations.add(evaluation);
				}
				return evaluation;
			}
		});
    	return evaluations.size();
	}

	public int selectStuScoreBycId(List<Integer> cIds) {
		StringBuffer sql = new StringBuffer("select score from t_stu_score where 1=1");
		int sum = 0;
		int average=0;
		if(cIds.size()>0){
			sql.append(" and c_id in (");
			for(int i=0;i<cIds.size();i++){
				sql.append(cIds.get(i));
				if(i!=cIds.size()-1){
					sql.append(",");
				}
			}
			sql.append(")");
		}
		List<Integer> adds = this.jdbcTemplate.query(sql.toString(), new RowMapper<Integer>() {

			@Override
			public Integer mapRow(ResultSet rs, int arg1) throws SQLException {
				int score = rs.getInt("score");
				return score;
			}
		});
		if (adds.size() != 0) {
			for (int i = 0; i < adds.size(); i++) {
				sum += adds.get(i);
			}
			average=sum/adds.size();
		}
		return average;
	}
	public int selectSupScoreBycId(List<Integer> cIds) {
		StringBuffer sql = new StringBuffer("select score from t_sup_score where 1=1");
		int sum = 0;
		int average=0;
		if(cIds.size()>0){
			sql.append(" and c_id in (");
			for(int i=0;i<cIds.size();i++){
				sql.append(cIds.get(i));
				if(i!=cIds.size()-1){
					sql.append(",");
				}
			}
			sql.append(")");
		}
		List<Integer> adds = this.jdbcTemplate.query(sql.toString(), new RowMapper<Integer>() {

			@Override
			public Integer mapRow(ResultSet rs, int arg1) throws SQLException {
				int score = rs.getInt("score");
				return score;
			}
		});
		if (adds.size() != 0) {
			for (int i = 0; i < adds.size(); i++) {
				sum += adds.get(i);
			}
			average=sum/adds.size();
		}
		return average;
	}
	public List<StuScore> selectStuDetail(String str){
		String sql="select * from t_stu_score e left join t_student t on e.stu_id=t.stu_id where c_id in ("+str+")";
		return this.jdbcTemplate.query(sql, new RowMapper<StuScore>(){

			@Override
			public StuScore mapRow(ResultSet rs, int rowNum) throws SQLException {
				StuScore stuScore=new StuScore();
				stuScore.setScore(rs.getInt("score"));
				stuScore.setStuName(rs.getString("stu_real_name"));
				return stuScore;
			}});
	}
	public List<SupScore> selectSupDetail(String str){
		String sql="select * from t_sup_score e left join t_supervisor t on e.sup_id=t.supervisor_id where c_id in ("+str+")";
        return this.jdbcTemplate.query(sql, new RowMapper<SupScore>(){

			@Override
			public SupScore mapRow(ResultSet rs, int rowNum) throws SQLException {
				SupScore sup=new SupScore();
				sup.setGroupId(rs.getInt("group_id"));
				sup.setScore(rs.getInt("score"));
				sup.setSupName(rs.getString("supervisor_name"));
				return sup;
			}});		
	}

}
