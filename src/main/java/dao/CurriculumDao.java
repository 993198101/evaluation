package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import dto.Curriculum;
import dto.Evaluation;
import dto.Teacher;

@Repository
public class CurriculumDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Curriculum> searchStudentCur(String term, List<Integer> cIds, int stuId) {
		StringBuffer sql = new StringBuffer(
				"select * from t_curriculum inner join t_curriculum_schedule on c_curriculum_id=cur_id left join t_teacher on c_tea_id=tea_id  where 1=1");
		if (term != null && term.trim().length() != 0) {
			sql.append(" and term='").append(term).append("'");
		}
		if (cIds.size() != 0) {
			StringBuffer cIdStr = new StringBuffer("");
			for (int i = 0; i < cIds.size(); i++) {
				cIdStr.append(cIds.get(i));
				if (i != cIds.size() - 1) {
					cIdStr.append(",");
				}
			}
			sql.append(" and c_id not in (").append(cIdStr).append(")");
		}
		sql.append(" and c_student_id=").append(stuId);
		return this.jdbcTemplate.query(sql.toString(), new RowMapper<Curriculum>() {

			@Override
			public Curriculum mapRow(ResultSet rs, int arg1) throws SQLException {
				Curriculum curriculum = new Curriculum();
				curriculum.setcId(rs.getInt("c_id"));
				curriculum.setCurId(rs.getInt("cur_id"));
				curriculum.setCurName(rs.getString("cur_name"));
				Teacher teacher = new Teacher();
				teacher.setId(rs.getInt("tea_id"));
				teacher.setName(rs.getString("tea_name"));
				curriculum.setTeacher(teacher);
				return curriculum;
			}
		});
	}

	public List<Integer> searchStuFinish(int stuId) {
		String sql = "select c_id from t_stu_score where stu_id=?";
		return this.jdbcTemplate.query(sql, new RowMapper<Integer>() {
			@Override
			public Integer mapRow(ResultSet rs, int arg1) throws SQLException {
				Integer cId = new Integer(rs.getInt("c_id"));
				return cId;
			}
		}, stuId);
	}

	public List<Curriculum> searchSupCur(int supId, int groupId, String term, List<Integer> cIds) {
		StringBuffer sql = new StringBuffer(
				"select * from t_curriculum inner join t_curriculum_schedule on c_curriculum_id=cur_id inner join t_teacher on tea_id=c_tea_id inner join t_supervisor on supervisor_of_group=c_group_id where c_group_id=? and term=?");
		sql.append(" and supervisor_id=").append(supId);
		List<Curriculum> curriculums = new ArrayList<Curriculum>();
		this.jdbcTemplate.query(sql.toString(), new RowMapper<Curriculum>() {

			@Override
			public Curriculum mapRow(ResultSet rs, int arg1) throws SQLException {
				String term = rs.getString("term");
				String teaName = rs.getString("tea_name");
				int cGroupId = rs.getInt("c_group_id");
				String curName = rs.getString("cur_name");
				Curriculum curriculum = null;
				for (Curriculum e : curriculums) {
					if (term.equals(term) && teaName.equals(e.getTeacher().getName()) && groupId == cGroupId
							&& curName.equals(e.getCurName())) {
						curriculum = e;
					}
				}
				if (curriculum == null) {
					curriculum = new Curriculum();
					curriculum.setcId(rs.getInt("c_id"));
					curriculum.setCurId(rs.getInt("cur_id"));
					curriculum.setCurName(rs.getString("cur_name"));
					Teacher teacher = new Teacher();
					teacher.setId(rs.getInt("tea_id"));
					teacher.setName(rs.getString("tea_name"));
					curriculum.setTeacher(teacher);
					curriculums.add(curriculum);
				}
				return curriculum;
			}
		}, groupId, term);
		if (cIds.size() != 0) {
			for (int i = 0; i < cIds.size(); i++) {
				for (int j = 0; j < curriculums.size(); j++) {
					if (curriculums.get(j).getcId() == cIds.get(i)) {
                           curriculums.remove(j);
					}
				}
			}
		}
		return curriculums;
	}

	public List<Integer> searchSupFinish(int supId) {
		String sql = "select c_id from t_sup_score where sup_id=?";
		return this.jdbcTemplate.query(sql, new RowMapper<Integer>() {
			@Override
			public Integer mapRow(ResultSet rs, int arg1) throws SQLException {
				Integer cId = new Integer(rs.getInt("c_id"));
				return cId;
			}
		}, supId);
	}

}
