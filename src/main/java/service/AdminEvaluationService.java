package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminEvaluationDao;
import dto.Detail;
import dto.Evaluation;
import dto.Pageable;
import dto.Question;
import dto.StuScore;
import dto.SupScore;
import model.EvaluationModel;
import util.MyPage;

@Service
public class AdminEvaluationService {
	@Autowired
	private AdminEvaluationDao adminEvaluationDao;
	public Map<String, Object> searchPage(int page,int size,String term,int teaId,String curName,int stuId,int groupId) {
		Map<String, Object> map = new HashMap<String, Object>();
		Long count = (long) this.adminEvaluationDao.count(term, teaId, curName,stuId,groupId);
		Pageable pageable = MyPage.pagenation(page, count, size);
		List<Evaluation> evaluations=this.adminEvaluationDao.searchPage(pageable.getFromNumber() - 1, size, term, teaId, curName,stuId,groupId);
		for(int i=0;i<evaluations.size();i++){
			evaluations.get(i).setStuScore(this.adminEvaluationDao.selectStuScoreBycId(evaluations.get(i).getcIds()));
			evaluations.get(i).setSupScore(this.adminEvaluationDao.selectSupScoreBycId(evaluations.get(i).getcIds()));
			evaluations.get(i).setTotal((int) (evaluations.get(i).getStuScore()*0.7+evaluations.get(i).getSupScore()*0.3));
		}
		map.put("pageable", pageable);
		map.put("data", evaluations);
		map.put("status", "success");
		return map;

	}
	public Detail findDetail(String str){
		List<StuScore> stuScores=this.adminEvaluationDao.selectStuDetail(str);
		List<SupScore> supScores=this.adminEvaluationDao.selectSupDetail(str);
		Detail detail=new Detail();
		detail.setStus(stuScores);
		detail.setSups(supScores);
		return detail;
	}

}
