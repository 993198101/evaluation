package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminEvaArrangeDao;
import dto.Curriculum;
import dto.EvaArrange;
import dto.EvaArrangeModel;
import dto.Pageable;
import util.MyPage;

@Service
public class AdminEvaArrangeService {
   @Autowired
   private AdminEvaArrangeDao adminEvaArrangeDao;
   public Map<String,Object> searchPage(int page,int size,int stuId,int groupId,String term){
	   Map<String,Object> map=new HashMap<String,Object>();
	   Long count=(long) this.adminEvaArrangeDao.count(stuId, groupId, term);
	   Pageable pageable=MyPage.pagenation(page, count, size);
	   if(count!=0){
		   List<EvaArrange> evaArranges=this.adminEvaArrangeDao.searchPage(pageable.getFromNumber()-1, size,stuId,groupId,term);
		   map.put("evaArranges", evaArranges);
		   map.put("status", "success");
	   }
	   map.put("pageable", pageable);
	   return map;
   }
   public List<Curriculum> findAll(){
	   return this.adminEvaArrangeDao.searchAll();
   }
   public boolean add(int stuId,int curId,int teaId,String term,int groupId){
	   EvaArrangeModel model=this.adminEvaArrangeDao.searchModel(stuId, curId, teaId, term, groupId, 0);
	   boolean result=false;
	   if(model==null){
		   result=this.adminEvaArrangeDao.insert(stuId, curId, teaId, term, groupId);
	   }
	   return result;
   }
   public Map<String,Object> edit(int stuId,int curId,int teaId,String term,int groupId,int cId){
	   EvaArrangeModel model=this.adminEvaArrangeDao.searchModel(stuId, curId, teaId, term, groupId, 0);
	   EvaArrangeModel modelNow=this.adminEvaArrangeDao.searchModel(0, 0, 0, null, 0, cId);
	   boolean result=false;
	   Map<String,Object> map=new HashMap<String,Object>();
	   if(modelNow!=null){
		   if(model==null){
			   result=this.adminEvaArrangeDao.update(stuId, curId, teaId, term, groupId, cId);
		   }
	   }else{
		   map.put("message","要修改的已被他人删除");
	   }
	   map.put("result", result);
	   return map;
   }
   public Map<String,Object> delete(int cId){
	   EvaArrangeModel model=this.adminEvaArrangeDao.searchModel(0, 0, 0, null, 0, cId);
	   Map<String,Object> map=new HashMap<String,Object>();
	   boolean result=false;
	   if(model!=null){
		  result=this.adminEvaArrangeDao.delete(cId);
	   }else{
		   map.put("message","要删除的已被他人删除");
	   }
	   map.put("result",result);
	   return map;
   }
   public EvaArrangeModel get(int cId){
	   EvaArrangeModel e=this.adminEvaArrangeDao.searchModel(0, 0, 0, null, 0, cId);
	   return e;
   }
}
