package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.CurriculumDao;
import dto.Curriculum;

@Service
public class CurriculumService {
  @Autowired
  private CurriculumDao curriculumDao;
  public List<Curriculum> findStudentCur(String term,int stuId){
	  List<Integer> cIds=this.curriculumDao.searchStuFinish(stuId);
	  return this.curriculumDao.searchStudentCur(term,cIds,stuId);
  }
  public List<Curriculum> findSupCur(String term,int supId,int groupId){
	  List<Integer> cIds=this.curriculumDao.searchSupFinish(supId);
	  return this.curriculumDao.searchSupCur(supId,groupId, term,cIds);
  }
}
