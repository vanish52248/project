package com.example.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.logging.*;

import com.example.api.models.Person;

@RestController
@CrossOrigin(origins = "*") 
public class ApiController {

    // ロガーの設定
    Logger logger = Logger.getLogger(ApiController.class.getName());

    @Autowired
	// private JdbcTemplate jdbcTemplate;

    @GetMapping("/")
    @ResponseBody
    public Person TodoList() {
        logger.info("APiController/TodoList  GET/method called");
        Person person = new Person();
        person.setName("hirano");
        return person;
    }
}
