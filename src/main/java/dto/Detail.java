package dto;

import java.util.List;

public class Detail {
	List<StuScore> stus;
	List<SupScore> sups;

	public List<StuScore> getStus() {
		return stus;
	}

	public void setStus(List<StuScore> stus) {
		this.stus = stus;
	}

	public List<SupScore> getSups() {
		return sups;
	}

	public void setSups(List<SupScore> sups) {
		this.sups = sups;
	}

}
