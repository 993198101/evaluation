package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import util.BackupDBInc;
import util.DBRecovery;

@Controller
public class DBBackupAndRequeryController {
	@RequestMapping("/backupInc")
	@ResponseBody
	public static String backupInc() {
		JSONObject jsonObject = new JSONObject();
		boolean result = true;
		BackupDBInc backupDBInc = new BackupDBInc();
		try {
			backupDBInc.backup4inc();
		} catch (Exception e) {
			// TODO: handle exception
			result = false;

		}
		jsonObject.put("result", result);
		return jsonObject.toJSONString();

	}

	@RequestMapping("/backupAll")
	@ResponseBody
	public static String backupAll() {
		JSONObject jsonObject = new JSONObject();
		boolean result = true;
		BackupDBInc backupDBInc = new BackupDBInc();
		try {
			backupDBInc.backup4all();
		} catch (Exception e) {
			// TODO: handle exception
			result = false;

		}
		jsonObject.put("result", result);
		return jsonObject.toJSONString();
	}

	@RequestMapping("/recovery")
	@ResponseBody
	public static String recovery() {
		JSONObject jsonObject = new JSONObject();
		boolean result = true;
		DBRecovery recovery = new DBRecovery();
		try {
			recovery.recovery("20180427173811", true);
			;
		} catch (Exception e) {
			// TODO: handle exception
			result = false;

		}
		jsonObject.put("result", result);
		return jsonObject.toJSONString();
	}
}
