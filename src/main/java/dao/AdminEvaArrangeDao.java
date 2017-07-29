package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Curriculum;
import dto.EvaArrange;
import dto.EvaArrangeModel;
import dto.Teacher;

@Repository
public class AdminEvaArrangeDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<EvaArrange> searchPage(int startRow,int size,int stuId,int groupId,String term){
    	StringBuffer sql=new StringBuffer("select * from t_curriculum_schedule left join t_teacher on c_tea_id=tea_id left join t_student on stu_id=c_student_id left join t_curriculum on c_curriculum_id=cur_id where 1=1");
    	if(stuId!=0){
    		sql.append(" and stu_id=").append(stuId);
    	}
    	if(groupId!=0){
    		sql.append(" and c_group_id=").append(groupId);
    	}
    	if(term!=null&&term.trim().length()>0){
    		sql.append(" and term='").append(term).append("'");
    	}
    	sql.append(" limit ").append(startRow).append(",").append(size);
    	return this.jdbcTemplate.query(sql.toString(), new RowMapper<EvaArrange>(){

			@Override
			public EvaArrange mapRow(ResultSet rs, int arg1) throws SQLException {
				EvaArrange arrange=new EvaArrange();
				arrange.setcId(rs.getInt("c_id"));
				arrange.setcName(rs.getString("cur_name"));
				arrange.setStuNameAndId(rs.getString("stu_real_name")+"("+rs.getInt("stu_stuId")+")");
				arrange.setTeaNameAndId(rs.getString("tea_name")+"("+rs.getInt("tea_id")+")");
				arrange.setGroupId(rs.getInt("c_group_id"));
				arrange.setTerm(rs.getString("term"));
				return arrange;
			}});
    }
    public int count(int stuId,int groupId,String term){
    	StringBuffer sql=new StringBuffer("select count(*) count from t_curriculum_schedule left join t_teacher on c_tea_id=tea_id left join t_student on stu_id=c_student_id left join t_curriculum on c_curriculum_id=cur_id where 1=1");
    	if(stuId!=0){
    		sql.append(" and stu_id=").append(stuId);
    	}
    	if(groupId!=0){
    		sql.append(" and c_group_id=").append(groupId);
    	}
    	if(term!=null&&term.trim().length()>0){
    		sql.append(" and term='").append(term).append("'");
    	}
    	return this.jdbcTemplate.queryForObject(sql.toString(), Integer.class);
    }
    public List<Curriculum> searchAll(){
    	String sql="select * from t_curriculum";
    	return this.jdbcTemplate.query(sql.toString(), new RowMapper<Curriculum>() {

			@Override
			public Curriculum mapRow(ResultSet rs, int arg1) throws SQLException {
				Curriculum curriculum = new Curriculum();
				curriculum.setCurId(rs.getInt("cur_id"));
				curriculum.setCurName(rs.getString("cur_name"));
				return curriculum;
			}
		});
    }
    public boolean insert(int stuId,int curId,int teaId,String term,int groupId){
    	String sql="insert into t_curriculum_schedule values(?,?,?,?,?,null)";
    	return this.jdbcTemplate.update(sql, stuId,curId,teaId,term,groupId)>0;
    }
    public boolean update(int stuId,int curId,int teaId,String term,int groupId,int cId){
    	String sql="update t_curriculum_schedule set c_student_id=?,c_curriculum_id=?,c_tea_id=?,term=?,c_group_id=? where c_id=?";
    	return this.jdbcTemplate.update(sql, stuId,curId,teaId,term,groupId,cId)>0;
    }
    public boolean delete(int cId){
    	String sql="delete from t_curriculum_schedule where c_id=?";
    	return this.jdbcTemplate.update(sql,cId)>0;
    }
    public EvaArrangeModel searchModel(int stuId,int curId,int teaId,String term,int groupId,int cId){
    	StringBuffer sql=new StringBuffer("select * from t_curriculum_schedule where 1=1");
    	if(stuId!=0){
    		sql.append(" and c_student_id=").append(stuId);
    	}
    	if(curId!=0){
    		sql.append(" and c_curriculum_id=").append(curId);
    	}
    	if(teaId!=0){
    		sql.append(" and c_tea_id=").append(teaId);
    	}
    	if(term!=null&&term.trim().length()>0){
    		sql.append(" and term='").append(term).append("'");
    	}
    	if(groupId!=0){
    		sql.append(" and c_group_id=").append(groupId);
    	}
    	if(cId!=0){
    		sql.append(" and c_id=").append(cId);
    	}
    	List<EvaArrangeModel> list=this.jdbcTemplate.query(sql.toString(), new RowMapper<EvaArrangeModel>(){

			@Override
			public EvaArrangeModel mapRow(ResultSet rs, int arg1) throws SQLException {
				EvaArrangeModel model=new EvaArrangeModel();
				model.setcId(rs.getInt("c_id"));
				model.setCurId(rs.getInt("c_curriculum_id"));
				model.setGroupId(rs.getInt("c_group_id"));
				model.setStuId(rs.getInt("c_student_id"));
				model.setTeaId(rs.getInt("c_tea_id"));
				model.setTerm(rs.getString("term"));
				return model;
			}});
    	if(list.size()!=0){
    		return list.get(0);
    	}else{
    		return null;
    	}
    }
}
