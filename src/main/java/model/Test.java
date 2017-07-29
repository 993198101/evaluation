package model;

public class Test {
	private int id;
	String name;
	String add;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAdd() {
		return add;
	}

	public void setAdd(String add) {
		this.add = add;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "id"+this.getId()+","+"name"+this.getName()+","+"add"+this.getAdd();
	}
	

}
