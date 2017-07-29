package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminTeacherDao;
import dto.Teacher;

@Service
public class AdminTeacherService {
  @Autowired
  private AdminTeacherDao adminTeacherDao;
  public List<Teacher> findAll(){
	  return this.adminTeacherDao.seacrchAll();
  }
  
}
