package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ProjectDao;
import dto.EvaArrange;
import dto.EvaArrangeModel;
import dto.Pageable;
import dto.Project;
import util.MyPage;

@Service
public class ProjectService {
  @Autowired
  private ProjectDao projectDao;
  public Map<String,Object> searchPage(int page,int size,String curName){
	   Map<String,Object> map=new HashMap<String,Object>();
	   Long count=(long) this.projectDao.count(curName);
	   Pageable pageable=MyPage.pagenation(page, count, size);
	   if(count!=0){
		   List<Project> projects=this.projectDao.findPage(pageable.getFromNumber()-1, size,curName);
		   map.put("projects", projects);
		   map.put("status", "success");
	   }
	   map.put("pageable", pageable);
	   return map;
  }
  public boolean add(String curName,int curSexamId,int curGexamId){
	   Project project=this.projectDao.searchModel(curName, 0);
	   boolean result=false;
	   if(project==null){
		   result=this.projectDao.insert(curName, curSexamId, curGexamId);
	   }
	   return result;
  }
  public Map<String,Object> edit(int curId,String curName,int curSexamId,int curGexamId){
	  	Project project=this.projectDao.searchModel(null, curId);
	   boolean result=false;
	   Map<String,Object> map=new HashMap<String,Object>();
	   if(project!=null){
		   
			   result=this.projectDao.update(curId, curName, curSexamId, curGexamId);
		   
	   }else{
		   map.put("message","要修改的已被他人删除");
	   }
	   map.put("result", result);
	   return map;
  }
  public Map<String,Object> delete(int curId){
	   Project project=this.projectDao.searchModel(null, curId);
	   Map<String,Object> map=new HashMap<String,Object>();
	   boolean result=false;
	   if(project!=null){
		  result=this.projectDao.delete(curId);
	   }else{
		   map.put("message","要删除的已被他人删除");
	   }
	   map.put("result",result);
	   return map;
  }
  public Project get(int curId){
	   Project e=this.projectDao.searchModel(null, curId);
	   return e;
  }
}
