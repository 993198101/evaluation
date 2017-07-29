package dto;

/**
 * Created by 陈帅 on 2016/11/23.
 */
public class PaperAnswer {
    private int id;
    private int evaId;
    private  int stuId;
  private  int qId;
    private int ansId;
    public PaperAnswer(int id, int evaId, int stuId, int qId, int ansId) {
        this.id = id;
        this.evaId = evaId;
        this.stuId = stuId;
        this.qId = qId;
        this.ansId=ansId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEvaId() {
        return evaId;
    }

    public void setEvaId(int evaId) {
        this.evaId = evaId;
    }

    public int getStuId() {
        return stuId;
    }

    public void setStuId(int stuId) {
        this.stuId = stuId;
    }

    public int getqId() {
        return qId;
    }

    public void setqId(int qId) {
        this.qId = qId;
    }

    public int getAnsId() {
        return ansId;
    }

    public void setAnsId(int ansId) {
        this.ansId = ansId;
    }
}
