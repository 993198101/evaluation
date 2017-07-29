package controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

/**
 * 上传文件控制器
 * 
 * @author 陈帅
 *
 */
@Controller
public class UploadController {
	/**
	 * 上传文件
	 * 
	 * @param file
	 *            上传的文件
	 * @param request
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@RequestMapping(value = "/upload", produces = "text/html;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String upload(MultipartFile file, HttpServletRequest request) throws IllegalStateException, IOException {
		// 文件要保存的路径
		String path = request.getServletContext().getRealPath("/upload");
		// 上传的文件名
		String name = file.getOriginalFilename();
		// 获得一个保存的文件名（日期+时间+5位随机整数）
		int index = name.lastIndexOf(".");
		String suffix = name.substring(index);
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		Random r = new Random();
		int ran = r.nextInt(90000) + 10000;
		String fileName = sdf.format(now) + ran + suffix;
		// 文件保存详细路径
		path = path + "/" + fileName;
		// 传输文件
		file.transferTo(new File(path));
		JSONObject josn = new JSONObject();
		josn.put("path", "upload/" + fileName);
		return josn.toJSONString();
	}
}