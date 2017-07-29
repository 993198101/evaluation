package util;

import dto.Pageable;

public class MyPage {
    public static Pageable pagenation(int pageNumber,Long count,int size){
    	int totalPage = (int) (count / size);
		if (count % size != 0) {
			totalPage++;
		}
		boolean first = pageNumber == 0;
		boolean last = pageNumber == (totalPage - 1);
		int fromNumber = pageNumber * size+1;
		
		int toNumber = pageNumber*size + size;
		int endNumber=(int) (fromNumber+count-1);
		if(toNumber>endNumber){
			toNumber=endNumber;
		}
		Pageable pageable = new Pageable(count, size, totalPage, first, last, size, pageNumber, fromNumber, toNumber);
        return pageable;
    }
}
