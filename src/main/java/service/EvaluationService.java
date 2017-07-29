package service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.EvaluationDao;
import dto.Curriculum;
import dto.Evaluation;
import dto.ExamPaper;
import dto.Question;

@Service
public class EvaluationService {
	@Autowired
	private EvaluationDao evaluationDao;

	public ExamPaper findStuBycurId(int curId) {
		return this.evaluationDao.searchStuByCurId(curId);
	}

	public List<Question> findExamQa(int examId) {
		List<Question> questions = evaluationDao.searchExamQa(examId);
		return questions;
	}

	public boolean submitStuScore(int stuId, int cId, int score) {
		return this.evaluationDao.insertStuScore(stuId, cId, score);
	}

	public boolean submitSupScore(int supId, int cId, int score, int groupId) {
		return this.evaluationDao.insertSupScore(supId, cId, score, groupId);
	}
}
