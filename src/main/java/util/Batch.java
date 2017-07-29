package util;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class Batch {
	/**
	 * 对传来的sql进行批处理执行
	 * 
	 * @param con
	 * @param sqls
	 * @return
	 * @throws SQLException
	 */
	public static int[] goBatch(Connection con, List<String> sqls) throws SQLException {
		if (sqls == null) {
			return null;
		}
		Statement sm = null;
		sm = con.createStatement();
		for (int i = 0; i < sqls.size(); i++) {
			sm.addBatch(sqls.get(i));// 将所有的SQL语句添加到Statement中
			System.out.println(sqls.get(i));
			if (i % 1000 == 0) {
				sm.executeBatch();
				sm.clearBatch();
			}
		}
		// 一次执行多条SQL语句
		return sm.executeBatch();

	}

	/**
	 * 获取数据库连接
	 * 
	 * @param driver
	 * @param jdbcUrl
	 * @param username
	 * @param password
	 * @return
	 * @throws Exception 
	 */
	public static Connection getConnection(String driver, String jdbcUrl, String username, String password) throws Exception {// 数据库连接
		Connection con = null;
		try {
			Class.forName(driver);// 加载Mysql数据驱动
			con = DriverManager.getConnection(jdbcUrl, username, password);// 创建数据连接
		} catch (Exception e) {
			e.printStackTrace();
//			String message=FileIo.getExceptionMsg(e);
			String message=FileIo.getExceptionPrint(e);
			Date start = new Date();
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");   //获取失败写文件
			String startDate = df.format(start);
			FileIo.appendMethodA("D:\\mysqlBackUp\\log\\recovery.txt",
					"$$$--recovery--start----time----" + startDate + "----$$$ \r\n");
			FileIo.appendMethodA("D:\\mysqlBackUp\\log\\recovery.txt",message);
			Date now = new Date();
			String endDate = df.format(now);
			FileIo.appendMethodA("D:\\mysqlBackUp\\log\\recovery.txt",
					"$$$--recovery--end----time----" + endDate + "----$$$\r\n");
			throw new Exception();
		}
		return con;
	}
	public static void main(String ...args) throws Exception{
		BackupDBInc.getProperty();
		Connection con = Batch.getConnection(BackupDBInc.getValue("jdbc.driver"), BackupDBInc.getValue("jdbc.url"), BackupDBInc.getValue("jdbc.username"),
				BackupDBInc.getValue("jdbc.password"));
		PreparedStatement statement=con.prepareStatement("insert into sdf values(?)");
		for(int i=0;i<5000;i++){
			statement.setString(1, ""+i);
			statement.execute();
		}
		System.out.println("ddddddddddddddddddddddddddddd");
	}
}