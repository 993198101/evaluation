package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminClassDao;
import dto.MyClass;

@Service
public class AdminClassService {
   @Autowired
   private AdminClassDao adminClassDao;
   public List<MyClass> findAll(){
	   return this.adminClassDao.searchAll();
   }
}
