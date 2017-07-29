package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminExamPaperDao;
import dto.ExamPaper;
import dto.Pageable;
import util.MyPage;

@Service
public class AdminExamPaperService {
	@Autowired
	private AdminExamPaperDao adminExamPaperDao;

	public List<ExamPaper> findAll() {
		return this.adminExamPaperDao.searchAll();
	}

	public Map<String, Object> searchPage(String examName, int[] examQuestions, int pageNumber, int size) {

		Long count = this.adminExamPaperDao.count(examName, examQuestions);
		Pageable pageable = MyPage.pagenation(pageNumber, count, size);
		List<ExamPaper> examPapers = this.adminExamPaperDao.searchPage(examName, examQuestions, pageNumber, size);
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("examPapers", examPapers);
		map.put("pageable", pageable);
		map.put("status", "success");
		return map;
	}
	
	public boolean addExamPaper(String examName,String examQuestions){
		boolean result=false;
		ExamPaper examPaper=this.getExamPaper(0, null, examQuestions);
		if(examPaper==null)
			result=this.adminExamPaperDao.insert(examName, examQuestions);
		return result;
	}
	public ExamPaper getExamPaper(int examId,String examName,String examQuestions){
		return this.adminExamPaperDao.search(examId, examName, examQuestions);
	}
	public Map<String,Object> editExamPaper(int examId,String examName,String examQuestion){
		Map<String,Object> map=new HashMap<String,Object>();
		boolean result=false;
		ExamPaper same=this.getExamPaper(0, null, examQuestion);
		ExamPaper examPaper=this.getExamPaper(examId, null, null);
		if(examPaper!=null){
			if(examPaper.getExamName().equals(examName)&&examPaper.getExamQuestion().equals(examQuestion)){
				map.put("message", "修改内容无变化");
			}else{
				if(same==null){
					result=this.adminExamPaperDao.update(examId, examName, examQuestion);
				}else{
					map.put("message", "数据重复");
				}
				
			}
		}else{
			map.put("message", "该数据不存在");
		}
		map.put("result", result);
		return map;
	}
	public Map<String,Object> deleteExamPaper(int examId){
		boolean result=false;
		Map<String,Object> map=new HashMap<String,Object>();
		ExamPaper examPaper=this.getExamPaper(examId, null, null);
	    if(examPaper==null){
	    	map.put("message", "该数据不存在");
	    }else{
	    	result=this.adminExamPaperDao.delete(examId);
	    }
	    map.put("result", result);
		return map;
	}
}
