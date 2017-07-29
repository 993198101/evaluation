package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.alibaba.fastjson.JSONObject;

import dto.Curriculum;
import dto.Evaluation;
import dto.ExamPaper;
import dto.Question;
import dto.Student;
import dto.Supervisor;
import service.EvaluationService;

@Controller
public class EvaluationController {
	@Autowired
	private EvaluationService evaluationService;

	@RequestMapping(value = "/getExamPaper", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getExamPaper(int curId) {
		JSONObject json = new JSONObject();
		ExamPaper examPaper = this.evaluationService.findStuBycurId(curId);
		json.put("data", examPaper);
		return json.toJSONString();
	}

	@RequestMapping("/examPaper")
	public String goPaper(HttpSession session) {
		return "exampaper";
	}

	@RequestMapping(value = "/examQaShow", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String findExamQaShow(int examId) {

		List<Question> questions = evaluationService.findExamQa(examId);
		Map<String, Object> map = new HashMap<String, Object>();
		if (questions.size() == 0) {
			map.put("questions", null);
		} else {
			map.put("questions", questions);
		}
		JSONObject json = new JSONObject();
		json.fluentPutAll(map);
		return json.toJSONString();
	}

	@RequestMapping(value = "/submitExamPaper", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String submit(int cId, int score, HttpSession session) {
		JSONObject json = new JSONObject();
		int result = 0;
		Integer type = (Integer) session.getAttribute("userType");
		if (type != null) {
			if (type == 1) {
				Student student = (Student) session.getAttribute("user");
				boolean temp = this.evaluationService.submitStuScore(student.getStuId(), cId, score);
				if (temp) {
					result = 1;
				}
			}
			if (type == 2) {
				Supervisor sup = (Supervisor) session.getAttribute("user");
				boolean temp = this.evaluationService.submitSupScore(sup.getSupervisorId(), cId, score,
						sup.getSupervisorGroupId());
				if (temp) {
					result = 1;
				}
			}
		} else {
			result = 0;
		}
		json.put("result", result);
		return json.toJSONString();
	}

	@RequestMapping("/sessionclose")
	public ModelAndView ModelAndView(HttpSession session) {
		session.invalidate();
		return new ModelAndView("redirect:login.html");
	}

}
