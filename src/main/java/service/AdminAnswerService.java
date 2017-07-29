package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminAnswerDao;
import dto.Answer;
import dto.Evaluation;
import dto.Pageable;
import util.MyPage;

@Service
public class AdminAnswerService {
	@Autowired
	private AdminAnswerDao adminAnswerDao;

	public Map<String, Object> searchPage(int aQid, int aScore, String aOrder, int pageNumber, int size) {
		Map<String, Object> map = new HashMap<String, Object>();
		Long count = this.adminAnswerDao.countAnswer(aQid, aScore, aOrder);
		Pageable pageable = MyPage.pagenation(pageNumber, count, size);
		List<Answer> answers = this.adminAnswerDao.searchPage(aQid, aScore, aOrder, pageable.getFromNumber() - 1, size);
		map.put("pageable", pageable);
		map.put("data", answers);
		map.put("status", "success");
		return map;

	}

	public Map<String, Object> addAnswer(Answer answer) {
		Map<String, Object> map = new HashMap<String, Object>();
		boolean status = false;
		boolean result = true;
		Long count = this.adminAnswerDao.countAnswer(answer.getaQid(), answer.getaScore(), null);// 用来判断分数是否重复
		Long countOrder = this.adminAnswerDao.countAnswer(answer.getaQid(), 0, null); // 找到此题有几个答案好设置order
		if (countOrder == 0) {
			answer.setaOrder("A");
		} else if (countOrder == 1) {
			answer.setaOrder("B");
		} else if (countOrder == 2) {
			answer.setaOrder("C");
		} else if (countOrder == 3) {
			answer.setaOrder("D");
		} else {
			result = false;
			map.put("message", "一道题最多4个答案");
		}
		if (count > 0) {
			result = false;
			map.put("message", "分数不能重复");
		}
		if (result)
			status = this.adminAnswerDao.addAnswer(answer);
		map.put("status", status);
		return map;
	}

	public Map<String, Object> editAnswer(Answer answer) {    //修改答案只能修改此答案的分数和内容                             要修改成的分数在本题下有与之相同的则交换分数，不能改abc
		Map<String, Object> map = new HashMap<String, Object>();
		int result = 0;
		int aQid = answer.getaQid();
		int aScore = answer.getaScore();
		boolean status=false;
		boolean judge=false;
		List<Answer> sameScoreAnswers = this.adminAnswerDao.searchPage(aQid, aScore, null, 0, -1);// 找到与改变相同score的answer
		List<Answer> findAnswers=this.adminAnswerDao.searchPage(aQid, 0, null, 0, -1);
		if(findAnswers.size()!=0){
			Answer sameAnswer = findAnswers.get(0);
			if(sameAnswer.getaContent().equals(answer.getaContent())&&sameAnswer.getaScore()==answer.getaScore()){
				map.put("message", "内容未变化");
			}else{
				judge=true;
			}
		}else{
			map.put("message", "改数据已不存在");
		}
		if (sameScoreAnswers.size() != 0) {
			Answer sameScoreAnswer = sameScoreAnswers.get(0);
			if(sameScoreAnswer.getaId()!=answer.getaId()){              //不是自己或者说没有修改分数，又有相同的
				int oldScore = this.adminAnswerDao.getAnswer(answer.getaId()).getaScore();
				sameScoreAnswer.setaScore(oldScore);
				this.adminAnswerDao.editAnswer(sameScoreAnswer);
				map.put("message", "交换了答案的相同分数");
			}
		}
		if(judge)
		status = this.adminAnswerDao.editAnswer(answer);
		map.put("status", status);
		return map;
	}
	public Answer getAnswer(int id){
		return this.adminAnswerDao.getAnswer(id);
	}
	public boolean deleteAnswer(int id){
		return this.adminAnswerDao.deleteAnswer(id);
	}

}
