package util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.RandomAccessFile;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FileIo {
	/**
	 * 读取路径下所有的文件
	 * 
	 * @param basepath
	 *            String 文件路径
	 * @return File[]
	 */
	public static File[] getFiles(String basepath) {
		File file = new File(basepath);
		File[] files = file.listFiles();
		return files;
	}

	// 读取文件内容返回sql语句，mysql下注释3种 # /**/ --,/**/为有效注释会执行，有些语句如delimiter || 做分隔符的
	// \C utf8 编码无法执行
	/**
	 * 对文件每一行进行判断 1·是否为空行--否--2·去掉-- #注释后是否为空---否--3·是否包含DELIMITER--包含--4·获取分隔符
	 * 
	 * @param path
	 *            文件路径 --不包含--5·加入一个句子，判断句子是否包含分隔符-包含--6·句子完整，加入sqllist
	 * @param charset
	 *            编码 -不包含 -下一行文件 goto1
	 * @return List<String> 返回的sql集合
	 * @throws Exception
	 * @throws FileNotFoundException
	 */
	public static List<String> getFileString(String path, String charset) throws Exception, FileNotFoundException {
		List<String> result = new ArrayList<String>();
		String temp = null; // 文件的每一行
		String sqlBreak = ";"; // sql原本的分隔符
		StringBuffer oneSentence = new StringBuffer(""); // 一条完整的sql，返回list的一条
		if (charset == null) {
			charset = "utf-8";
		}
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path), charset));
		while ((temp = br.readLine()) != null) {
			if (temp.trim().length() > 0) {
				if (temp.indexOf("--") != -1) {
					temp = temp.substring(0, temp.indexOf("--")); // 此行有--，删除--以及后面的文字
				}
				if (temp.indexOf("#") != -1) {
					temp = temp.substring(0, temp.indexOf("#")); // 此行有#，删除#以及后面的文字
				}
				if (temp.trim().length() > 0)
					if (temp.toUpperCase().indexOf("DELIMITER") > -1) {
						sqlBreak = temp.substring(9, temp.length()).trim(); // 有dilimiter
																			// 语句获得分隔符
					} else if (!temp.contains("\\C")) {
						oneSentence.append(temp).append(" "); // 多行的句子拼加空格
						if (temp.endsWith(sqlBreak)) {
							String sql = oneSentence.toString().substring(0, oneSentence.indexOf(sqlBreak)); // 有分隔符句子完整，找出加入sqllist
							result.add(sql);
							if (sql.toUpperCase().contains("CREATE DATABASE")) {
								 result.add("USE `"+BackupDBInc.getValue("jdbc.database")+"`");
							}
							oneSentence = new StringBuffer("");
						}
					}
			}
		}
		br.close();
		return result;
	}

	/**
	 * 追写日志文件
	 * 
	 * @param fileName
	 * @param content
	 * @throws Exception
	 */
	public static void appendMethodA(String fileName, String content) throws Exception {
		RandomAccessFile randomFile = new RandomAccessFile(fileName, "rw");
		// 文件长度，字节数
		long fileLength = randomFile.length();
		// 将写文件指针移到文件尾。
		randomFile.seek(fileLength);
		String toCn = null;
		// 处理中文问题
		toCn = new String(content.getBytes("GBK"), "ISO8859_1");
		randomFile.writeBytes(toCn);
		randomFile.close();

	}

	/**
	 * 对捕获的异常信息整理
	 * 
	 * @param e
	 * @return
	 */

	public static String getExceptionPrint(Exception e) {
		String result = null;
		StringWriter sw = new StringWriter();
		e.printStackTrace(new PrintWriter(sw, true));
		result = sw.toString();
		return result;
	}
	/** 
	 * 删除目录（文件夹）以及目录下的文件 
	 * @param   sPath 被删除目录的文件路径 
	 * @return  目录删除成功返回true，否则返回false 
	 */  
	public static boolean deleteDirectory(String sPath) {  
	    //如果sPath不以文件分隔符结尾，自动添加文件分隔符  
	    if (!sPath.endsWith(File.separator)) {  
	        sPath = sPath + File.separator;  
	    }  
	    File dirFile = new File(sPath);  
	    //如果dir对应的文件不存在，或者不是一个目录，则退出  
	    if (!dirFile.exists() || !dirFile.isDirectory()) {  
	        return false;  
	    }  
	    boolean flag = true;  
	    //删除文件夹下的所有文件(包括子目录)  
	    File[] files = dirFile.listFiles();  
	    for (int i = 0; i < files.length; i++) {  
	        //删除子文件  
	        if (files[i].isFile()) {  
	            flag = deleteFile(files[i].getAbsolutePath());  
	            if (!flag) break;  
	        } //删除子目录  
	        else {  
	            flag = deleteDirectory(files[i].getAbsolutePath());  
	            if (!flag) break;  
	        }  
	    }  
	    if (!flag) return false;  
	    //删除当前目录  
	    if (dirFile.delete()) {  
	        return true;  
	    } else {  
	        return false;  
	    }  
	}
	/** 
	 * 删除单个文件 
	 * @param   sPath    被删除文件的文件名 
	 * @return 单个文件删除成功返回true，否则返回false 
	 */  
	public static boolean deleteFile(String sPath) {  
	    boolean flag = false;  
	   File file = new File(sPath);  
	    // 路径为文件且不为空则进行删除  
	    if (file.isFile() && file.exists()) {  
	        file.delete();  
	        flag = true;  
	    }  
	    return flag;  
	}
    public static void main(String...args){
    	boolean result=deleteDirectory("D:\\mysqlBackUp\\back\\20170426142224");
    	System.out.println(result);
    }
}