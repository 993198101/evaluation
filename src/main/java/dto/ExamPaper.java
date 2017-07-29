package dto;

/**
 * Created by 陈帅 on 2016/11/19.
 */
public class ExamPaper {
    private int examId;
    private String examName;
    private String examQuestion;



    public int getExamId() {
        return examId;
    }

    public void setExamId(int examId) {
        this.examId = examId;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public String getExamQuestion() {
        return examQuestion;
    }

    public void setExamQuestion(String examQuestion) {
        this.examQuestion = examQuestion;
    }
}
