package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.AdminStudentDao;
import dto.Student;

@Service
public class AdminStudentService {
  @Autowired
  private AdminStudentDao adminStudentDao;
  public List<Student> findAll(){
	  return this.adminStudentDao.getAll();
  }
  
}
