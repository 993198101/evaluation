package dto;

import com.github.pagehelper.PageInfo;

public class Pageable {

	//数据总数
	private long totalElements;
	//页面展示数据的条数
	private int numberOfElements;
	//总页数
	private int totalPages;
	//是不是第一页
	private boolean first;
	//是不是最后一页
	private boolean last;
	//每页展示数据数目
	private int size;
	//页号
	private int number;
	//起始条目数
	private int fromNumber;
	//结束条目数
	private int toNumber;
	
	public Pageable() {
	}
	
	
	public Pageable(long totalElements, int numberOfElements, int totalPages, boolean first, boolean last, int size,
			int number, int fromNumber, int toNumber) {
		super();
		this.totalElements = totalElements;
		this.numberOfElements = numberOfElements;
		this.totalPages = totalPages;
		this.first = first;
		this.last = last;
		this.size = size;
		this.number = number;
		this.fromNumber = fromNumber;
		this.toNumber = toNumber;
	}


	public long getTotalElements() {
		return totalElements;
	}
	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}
	public int getNumberOfElements() {
		return numberOfElements;
	}
	public void setNumberOfElements(int numberOfElements) {
		this.numberOfElements = numberOfElements;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public boolean isFirst() {
		return first;
	}
	public void setFirst(boolean first) {
		this.first = first;
	}
	public boolean isLast() {
		return last;
	}
	public void setLast(boolean last) {
		this.last = last;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public int getFromNumber() {
		return fromNumber;
	}
	public void setFromNumber(int fromNumber) {
		this.fromNumber = fromNumber;
	}
	public int getToNumber() {
		return toNumber;
	}
	public void setToNumber(int toNumber) {
		this.toNumber = toNumber;
	}
}
