package com.example.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RestController;
import java.util.logging.*;
import java.util.List;
import java.util.Map;

import com.example.api.models.Task;

@RestController
@CrossOrigin(origins = "*") 
public class ApiController {

    // ロガーの設定
    Logger logger = Logger.getLogger(ApiController.class.getName());

    @Autowired
	private JdbcTemplate jdbcTemplate;

    @ResponseBody
    @GetMapping("/")
    public List<Map<String,Object>> GetTask() {
        logger.info("APiController/GetTask  GET/method called");
		// DBから複数レコードを取得 => [{...}, {...}, {...}] の形で取得する
		List<Map<String, Object>> tasks = jdbcTemplate.queryForList(
          "SELECT * from task");
        logger.info("SELECT query result:" + tasks);
        return tasks;
    }

    @PostMapping("/post")
    // modelでFEから受け取る場合はmodelのカラムと同名のパラメータで渡されたものがtaskとして受け取れる
    public void PostTask(@ModelAttribute Task task) {
        logger.info("APiController/PostTask  POST/method called");
        logger.info("posted/params:" + task);
        // モデルの中のパラメータにアクセスするにはゲッターを使用する
        logger.info("posted/params.name:" + task.getName());
        logger.info("posted/params.description:" + task.getDescription());

        String sql = "INSERT INTO task(name, description) VALUES(?, ?);";
		// jdbcTemplate.update() の
        // 第一引数: SQL文字列
        // 第二引数以降: sql変数内のid=? の ?の数分だけ指定したい値 
		jdbcTemplate.update(sql, task.getName(), task.getDescription());
    }	

	@PutMapping("/put/{id}")
    // modelでFEから受け取る場合はmodelのカラムと同名のパラメータで渡されたものがtaskとして受け取れる
    // @PathVariable で　id として{id}の部分を受け取れる
	public void update(@ModelAttribute Task task, @PathVariable int id) {
        logger.info("APiController/PutTask  PUT/method called");

        logger.info("put/params:" + id);
        // モデルの中のパラメータにアクセスするにはゲッターを使用する
        logger.info("puted/params.name:" + task.getName());
        logger.info("puted/params.description:" + task.getDescription());
		String sql = "UPDATE task SET name = ?, description = ? WHERE task_id = ?;";
		// jdbcTemplate.update() の
		// 第一引数: SQL文字列
		// 第二引数以降: sql変数内のid=? の ?の数分だけ指定したい値 
		jdbcTemplate.update(sql, task.getName(), task.getDescription(), id);
	}

	@DeleteMapping("/delete/{id}")
    // @PathVariable で　id として{id}の部分を受け取れる
	public void delete(@PathVariable int id) {
        logger.info("APiController/DeleteTask  DELETE/method called");
        logger.info("delete/params:" + id);
		String sql = "DELETE FROM task WHERE task_id = ?;";
		// jdbcTemplate.update() の
        // 第一引数: SQL文字列
        // 第二引数以降: sql変数内のid=? の ?の数分だけ指定したい値 
		jdbcTemplate.update(sql, id);
	}
}
