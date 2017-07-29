package util;

import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.omg.CORBA.PUBLIC_MEMBER;

public class DBRecovery extends BackupDBInc {

	/**
	 * 找到所有文件名(long型) ,遍历所有文件名，找到大于closeDate,小于requiredDate,的文件名,所有要用的增量
	 * 
	 * @param files
	 *            File[]所有的文件
	 * @param closeDate
	 *            Long 距离小于指定日期的最近的全量备份日期
	 * @param requiredDate
	 *            Long 指定日期
	 * @return List<Long> 大于closeDate,小于requiredDate,的文件名
	 */
	public static List<Long> searchIncs(Long closeDate, Long requiredDate, File[] files) {
		List<Long> result = new ArrayList<Long>();
		for (File f : files) {
			Long backDate = Long.parseLong(f.getName());
			if (backDate <= requiredDate && backDate > closeDate) {
				result.add(backDate);
			}
		}
		return result;
	}

	/**
	 * 找到最接近requiredDate文件名(long型) ,遍历所有文件名，小于等于requiredDate,的文件名,全量
	 * 
	 * @param files
	 *            File[]所有的文件
	 * @param requiredDate
	 *            Long 复制后Long
	 * @return closeDate 找到最接近requiredDate文件名(long型)
	 */
	public static Long getCloseDate(File[] files, Long requiredDate) {
		Long closeDate = 0L;
		for (File f : files) {
			Long backDate = Long.parseLong(f.getName());
			if (backDate <= requiredDate) {
				if (closeDate < backDate) {
					Long temp = backDate;
					backDate = closeDate;
					closeDate = temp;
				}
			}
		}
		return closeDate;
	}

	/**
	 * 数据库恢复,1·备份恢复日期的全量，2·清空数据库，3·全量恢复，4·增量恢复，6·清空数据库现有增量，5·写日志------发生错误时，将错误信息写入日志，按照1的备份恢复
	 * 2.1----遍历全量备份的文件夹,找到与指定日期最近的全量备份文件，读文件 拼接完整的语句sql,加入执行序列sql
	 * 3.1----遍历增量备份的文件夹,找到与指定日期最近的全量备份文件日期与指定日期之间的增量文件，读文件 拼接完整的语句sql,加入执行序列sql
	 * 
	 * @param date String指定的日期
	 * @throws Exception
	 * 
	 */
	public static void recovery(String date,boolean result) throws Exception {
		boolean recoverySuccess = true;
		String errormessage = null;
		getProperty(); // 获取变量
		Long requiredDate = Long.parseLong(date);
		String incBaskpath = getValue("incBackpath"); // 增量备份地址
		String basepath = getValue("backpath"); // 全量备份地址
		File[] backFile = FileIo.getFiles(basepath);
		File[] incFiles = FileIo.getFiles(incBaskpath);
		Long closeDate = getCloseDate(backFile, requiredDate); // 找到最近的全量备份日期名
		List<Long> incDates = searchIncs(closeDate, requiredDate, incFiles); // 所有的增量备份日期名
		backup4inc();
		String recoveryDate = backup4all();
		Connection con = Batch.getConnection(getValue("jdbc.driver"), getValue("jdbc.url"), getValue("jdbc.username"),
				getValue("jdbc.password"));
		List<String> sqls = new ArrayList<String>();
		try {
			
			// 清空数据库表开始-------------------------------------
			String empSQL = "DROP DATABASE " + "IF EXISTS `" + getValue("jdbc.database")+"`";
			sqls.add(empSQL);
           // 清空数据库表结束-------------------------------------
			// 获取全量sql开始--------------------------------------------
			if (closeDate != 0l) {
				List<String> backSQL = FileIo.getFileString(
						basepath + "\\" + closeDate + "\\all\\" + getValue("jdbc.database") + ".sql", "utf-8"); // 找到closeDate恢复数据库全量
				
				sqls.addAll(backSQL);
				System.out.println(closeDate+"**********");
			}
			// 获取全量sql结束--------------------------------------------
			// 获取增量sql开始--------------------------------------------
			Long closeInc=0l;
			for(int i=0;i<incDates.size();i++){
				if(closeInc<incDates.get(i)){
					closeInc=incDates.get(i);
				}
			}
			File[] files = FileIo.getFiles(incBaskpath + "\\" + closeInc + "\\inc");//获取大于全备份日期小于指定日期的最大的增量备份文件
			if(files!=null)
			for (File f : files) {
				if (f.getName().endsWith("txt")) {
					List<String> incSQL = FileIo.getFileString(
							incBaskpath + "\\" + closeInc + "\\inc\\" + f.getName(), "utf-8");
					System.out.println(closeInc);
					sqls.addAll(incSQL);
				}
			}
			Batch.goBatch(con, sqls); // 执行全部sql进行恢复
		} catch (SQLException e2) {
			e2.printStackTrace();
			recovery(recoveryDate,false); // 恢复过程出错则按照恢复日期的备份更新数据库，仿事务回滚。但是如果数据库原本有错时，则备份时忽略了错误。此时相当于不恢复
			recoverySuccess = false; // 指定日期的数据库----------而是删除原本数据库错误的语句
			errormessage = FileIo.getExceptionPrint(e2); // 获得错误信息
		} finally {
			con.close();// 关闭数据库连接
			// 写日志开始------------------------------------------------------------
	            if(result!=false){               //判断是否是恢复出错的情况，出错时恢复原本不写日志
	            	FileIo.appendMethodA("D:\\mysqlBackUp\\log\\recovery.txt",
							"$$$--recovery--start----time----" + recoveryDate + "----$$$ \r\n");
					if (recoverySuccess == false) {
						FileIo.appendMethodA("D:\\mysqlBackUp\\log\\recovery.txt", errormessage);
					} else {
						FileIo.appendMethodA("D:\\mysqlBackUp\\log\\recovery.txt", "recovery success!!! \r\n");
					}
					Date now = new Date();
					SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
					String endDate = df.format(now);
					FileIo.appendMethodA("D:\\mysqlBackUp\\log\\recovery.txt",
							"$$$--recovery--end----time----" + endDate + "----$$$\r\n");
				}
			// 写日志结束------------------------------------------------------------
		}
	}

	public static void main(String... args)  {
		double a=59.25;
		double x=(100-a);
		System.out.println("整数x="+(int)x);
		System.out.println("整数是0.25的"+(int)(x/0.25)+"倍");
		System.out.println("整数是0.1的"+(int)(x/0.1)+"倍");
		System.out.println("整数是0.01的"+(int)(x/0.01)+"倍");
		
		
	}
}
