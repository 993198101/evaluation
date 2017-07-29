package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminQuestionDao;
import dto.Question;
import dto.Pageable;
import util.MyPage;

@Service
public class AdminQuestionService {
	@Autowired
	private AdminQuestionDao adminQuestionDao;

	public Map<String, Object> searchPage(int qId, String qContent, int pageNumber, int size) {
		Map<String, Object> map = new HashMap<String, Object>();
		Long count = (long) this.adminQuestionDao.count(qId, qContent);
		Pageable pageable = MyPage.pagenation(pageNumber, count, size);
		List<Question> questions = this.adminQuestionDao.searchPage(qId, qContent, pageable.getFromNumber() - 1, size);
		map.put("pageable", pageable);
		map.put("data", questions);
		map.put("status", "success");
		return map;

	}

	public boolean addQuestion(String qContent) {
		boolean result = false;
		Question question = this.adminQuestionDao.searchQuestion(0, qContent);
		if (question == null) {
			result = this.adminQuestionDao.insert(qContent);
		}
		return result;
	}

	public Question findQuestion(int id) {
		return this.adminQuestionDao.searchQuestion(id, null);
	}

	public boolean deleteQuestion(int id) {
		boolean result = false;
		Question question = this.adminQuestionDao.searchQuestion(id, null);
		if (question != null) {
			result = this.adminQuestionDao.delete(id);
		}
		return result;
	}

	public Map<String, Object> editQuestion(String qContent, int qId) {
		Map<String, Object> map = new HashMap<String, Object>();
		Question question = this.adminQuestionDao.searchQuestion(qId, null);
		Question same=this.adminQuestionDao.searchQuestion(0, qContent);
		boolean result = false;
		if (question == null) {
			map.put("message", "该数据不存在");
		} else {
			if (question.getqContent().equals(qContent)) {
				map.put("message", "数据未修改");
			}else{
				if(same==null){
					result = this.adminQuestionDao.update(qContent, qId);
				}else{
					map.put("message", "数据重复");
				}
				
			}
			
		}
		map.put("result", result);
		return map;
	}

}
