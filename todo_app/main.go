package main

import (
	"fmt"
	"sandbox/project/todo_app/app/controllers"
	"sandbox/project/todo_app/app/models"
)

func main() {
	// ①sqlite3 webapp.sql
	// ②.table
	fmt.Println(models.Db)

	// メインサーバーの起動
	controllers.StartMainServer()

}
