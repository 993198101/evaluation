package util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Properties;
import java.util.Timer;
import java.util.TimerTask;

public class BackupDBInc {
	static Properties pro;
	static final String confPath = "E:\\evaluation2\\evaluation\\src\\main\\java\\util\\backupInc.properties";
    //获取读文件名字，路径等等
	static void getProperty() {
		try {
			pro = new Properties();
			InputStream is = new FileInputStream(new File(confPath));
			pro.load(is);
			is.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String getValue(String key) {
		return pro.getProperty(key);
	}

	/**
	 * 复制单个文件
	 * 
	 * @param oldPath
	 *            String 原文件路径
	 * @param newPath
	 *            String 复制后路径
	 * @return boolean
	 */
	public static void copyFile(String oldPath, String newPath) {
		try {
			int bytesum = 0;
			int byteread = 0;
			File oldfile = new File(oldPath);
			if (oldfile.exists()) { // 文件存在时
				InputStream inStream = new FileInputStream(oldPath); // 读入原文件
				FileOutputStream fs = new FileOutputStream(newPath);
				byte[] buffer = new byte[1444];
				while ((byteread = inStream.read(buffer)) != -1) {
					bytesum += byteread; // 字节数 文件大小
					fs.write(buffer, 0, byteread);
				}
				inStream.close();
			}
		} catch (Exception e) {
			System.out.println("复制单个文件操作出错");
			e.printStackTrace();
		}
	}

	/**
	 * 增量备份
	 * 
	 * @throws Exception
	 */
	public static void backup4inc() throws Exception {
		// 获取当前系统日期
		Date day = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String today = df.format(day);
		// 获取配置文件信息
		getProperty();
		// 获取mysql当前二进制备份文件
		File file = new File(getValue("mysqlpath") + "\\data");
		File[] files = file.listFiles();
		File newFile = null;
		String bakpath = null;
		for (File f : files) {
			if (f.getName().startsWith(getValue("bakname") + ".") && !f.getName().endsWith(".index")) {
				// 复制到制定本分目录
				bakpath = getValue("incBackpath") + "\\" + today + "\\inc";
				// 判断文件夹是否创建，没有创建则创建新文件夹
				newFile = new File(bakpath);
				if (!newFile.exists()) {
					newFile.mkdirs();
				}
				copyFile(f.getPath(), bakpath + "\\" + f.getName());
			}
		}
		if (newFile != null && bakpath != null) {
			// 二进制备份文件转txt
			int i = 0;
			for (File f : newFile.listFiles()) {
				String bakName = f.getName();
				String cmdPath = "cmd /c " + getValue("mysqlpath") + "\\bin\\mysqlbinlog "+ newFile.getPath() + "\\" + bakName + " > " + bakpath + "\\"
						+ bakName.substring(0, bakName.lastIndexOf(".")) + i + ".txt";
				Runtime.getRuntime().exec(cmdPath);
				i++;
			}
		}

	}

	/**
	 * 全量备份
	 * jdbc全量备份时重置mysql日志，shell备份，并写日志
	 * @throws Exception
	 */
	public static String backup4all() throws Exception {
		// 获取当前系统日期
		Date day = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String today = df.format(day);
		// 获取配置文件信息
		getProperty();
		String bakpath = getValue("backpath") + "\\" + today + "\\all";
		String logpath = getValue("logpath") + "\\back.txt";
		File newFile = new File(bakpath);
		if (!newFile.exists()) {
			newFile.mkdirs();
		}
		FileIo.appendMethodA(logpath, "$$$--backup--start----time----" + today + "----$$$\r\n");
		// 全量备份使用mysqldump 进行备份  --force忽略sql错误，导出无错误的sql（错误部分被删除）  --logerror备份错误日志   
		// --lock-all-tables 锁定表不允许在全备份时操作  --opt等同于
		                                             //--add-drop-table,  --add-locks, --create-options, --quick, --extended-insert, --lock-tables,  --set-charset, --disable-keys 该选项默认开启,  可以用--skip-opt禁用.
		//-R 导出存储过程以及自定义函数。 -B导出数据库
		String cmdPath = "cmd /c " + getValue("mysqlpath") + "\\bin\\mysqldump -u" + getValue("jdbc.username")
				 + " --lock-all-tables --force" + "  --log-error=" + logpath
				+ " --opt  -R -B " + getValue("jdbc.database") + " > " + bakpath + "\\" + getValue("jdbc.database")
				+ ".sql";
	
		Runtime.getRuntime().exec(cmdPath);   //执行备份
		// 重置二进制备份文件
		Class.forName(getValue("jdbc.driver"));
		Connection conn = DriverManager.getConnection(getValue("jdbc.url"), getValue("jdbc.username"),
		getValue("jdbc.password"));
		String reset = "RESET MASTER";
		PreparedStatement resetPs = conn.prepareStatement(reset);
		resetPs.executeQuery();
		resetPs.close();
		conn.close();
		Date now = new Date();
		String nowFotmat = df.format(now);
		FileIo.appendMethodA(logpath, "$$$--backup--end----time----" + nowFotmat + "----$$$\r\n");
		return today;
	}
	/**
	 * 
	 * 执行备份全量日志
	 *
	 */
	public class TimeTask4All extends TimerTask {
		@Override
		public void run() {
			try {
				backup4all();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public TimeTask4All getTask4All() {
		return new TimeTask4All();
	}
	/**
	 * 
	 * 执行备份增量日志
	 *
	 */
	public class TimeTask4Inc extends TimerTask {
		@Override
		public void run() {
			try {
				backup4inc();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 
	 * 执行删除日志
	 *
	 */
	public class TimeTaskDelete extends TimerTask {
		@Override
		public void run() {
			try {
				delete();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	public TimeTaskDelete getTimeTaskDelete(){
		return new TimeTaskDelete();
	}
	public TimeTask4Inc getTask4Inc() {
		return new TimeTask4Inc();
	}
    /**
     * 定时执行备份删除
     */
	public void doBatch() {
		getProperty();
		BackupDBInc backup = new BackupDBInc();
		TimerTask taskAll = backup.getTask4All();
		TimerTask taskInc = backup.getTask4Inc();
		TimerTask taskClean=backup.getTimeTaskDelete();
		Timer timer2 = new Timer();
		timer2.schedule(taskInc, 0, Integer.parseInt(getValue("bakrate.inc")) * 60 * 1000);
		Timer timer = new Timer();
		timer.schedule(taskAll, 0, Integer.parseInt(getValue("bakrate.all")) * 24 * 60 * 1000);
		Timer timer3=new Timer();
		timer3.schedule(taskClean, Integer.parseInt(getValue("bakCleanRate")) *24 * 60 * 1000);
	}
    /**
     * 删除过期的备份，遍历所有的备份文件名，如果：现在时间-备份时间>大于过期时间执行删除
     */
	public static void delete() {
		getProperty();
		String incPath=getValue("incBackpath");
		String backPath=getValue("backpath");
		Date day = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String nowString = df.format(day);
		Long now=Long.parseLong(nowString);
		File[] incFiles = FileIo.getFiles(incPath);
		File[] files = FileIo.getFiles(backPath);
		int incs = Integer.parseInt(getValue("bakSaveTime.inc"));
		int all = Integer.parseInt(getValue("bakSaveTime.all"));
		for (int i = 0; i < incFiles.length; i++) {
				Long date = Long.parseLong(incFiles[i].getName());
				Long dif=now-date;
				if(dif>incs*1000000){
					FileIo.deleteDirectory(incPath+"\\"+date);
				}
		}
		for (int i = 0; i < files.length; i++) {
			Long date = Long.parseLong(files[i].getName());
			Long dif=now-date;
			if(dif>all*1000000){
				boolean resule=FileIo.deleteDirectory(backPath+"\\"+date);
			}
		}
	}

	public static void main(String[] args) throws Exception {
//		getProperty();
//		 BackupDBInc backup = new BackupDBInc(); backup.doBatch();
		 
//		delete();
		backup4inc();
		backup4all();

	}
}
