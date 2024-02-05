package controllers

import (
	"net/http"
	"sandbox/project/todo_app/config"
)

func StartMainServer() error {
	files := http.FileServer(http.Dir(config.Config.Static))
	http.Handle("/static/", http.StripPrefix("/static/", files))
	http.HandleFunc("/", top)
	return http.ListenAndServe(":"+config.Config.Port, nil)
}
