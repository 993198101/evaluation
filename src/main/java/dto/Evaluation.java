package dto;

import java.util.List;

/**
 * Created by 陈帅 on 2016/11/18.
 */
public class Evaluation {
    private int id;
    private String term;
    public String getTerm() {
		return term;
	}
	public void setTerm(String term) {
		this.term = term;
	}
	private List<Integer> cIds;
	private String teaName;
    private String curName;
    private int stuScore;
    private int supScore;
    private int total;
    private int groupId;
    
	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	public int getId() {
		return id;
	}
	public List<Integer> getcIds() {
		return cIds;
	}
	public void setcIds(List<Integer> cIds) {
		this.cIds = cIds;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTeaName() {
		return teaName;
	}
	public void setTeaName(String teaName) {
		this.teaName = teaName;
	}
	public String getCurName() {
		return curName;
	}
	public void setCurName(String curName) {
		this.curName = curName;
	}
	public int getStuScore() {
		return stuScore;
	}
	public void setStuScore(int stuScore) {
		this.stuScore = stuScore;
	}
	
	public int getSupScore() {
		return supScore;
	}
	public void setSupScore(int supScore) {
		this.supScore = supScore;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
    
}
