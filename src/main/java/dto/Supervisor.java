package dto;

public class Supervisor {
	private int supervisorId;
	private String supervisorName;
	private String supervisorUsername;
	private String supervisorPassword;
	private int supervisorGroupId;
    private String supervisorImage;
    private String supervisorPhoneNumber;
	public String getSupervisorPhoneNumber() {
		return supervisorPhoneNumber;
	}

	public void setSupervisorPhoneNumber(String supervisorPhoneNumber) {
		this.supervisorPhoneNumber = supervisorPhoneNumber;
	}

	public String getSupervisorImage() {
		return supervisorImage;
	}

	public void setSupervisorImage(String supervisorImage) {
		this.supervisorImage = supervisorImage;
	}

	public int getSupervisorId() {
		return supervisorId;
	}

	public void setSupervisorId(int supervisorId) {
		this.supervisorId = supervisorId;
	}

	public String getSupervisorName() {
		return supervisorName;
	}

	public void setSupervisorName(String supervisorName) {
		this.supervisorName = supervisorName;
	}

	public String getSupervisorUsername() {
		return supervisorUsername;
	}

	public void setSupervisorUsername(String supervisorUsername) {
		this.supervisorUsername = supervisorUsername;
	}

	public String getSupervisorPassword() {
		return supervisorPassword;
	}

	public void setSupervisorPassword(String supervisorPassword) {
		this.supervisorPassword = supervisorPassword;
	}

	public int getSupervisorGroupId() {
		return supervisorGroupId;
	}

	public void setSupervisorGroupId(int supervisorGroupId) {
		this.supervisorGroupId = supervisorGroupId;
	}

}
