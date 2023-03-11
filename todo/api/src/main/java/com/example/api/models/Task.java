package com.example.api.models;

import lombok.Data;

@Data
public class Task {

	private int task_id;

	private int person_id;

	private String task;

    private String description;
}
