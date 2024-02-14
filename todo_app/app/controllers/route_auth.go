package controllers

import (
	"fmt"
	"log"
	"net/http"
	"sandbox/project/todo_app/app/models"
)

func signup(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// 初期表示
		generateHTML(w, nil, "layout", "public_navbar", "signup")
	} else if r.Method == "POST" {
		// 登録ボタン押下時
		// ParseFormで入力の解析
		err := r.ParseForm()
		if err != nil {
			log.Fatalln(err)
		}
		user := models.User{
			// <input>タグのname="xxx"で指定して取得できる
			Name:     r.PostFormValue("name"),
			Email:    r.PostFormValue("email"),
			PassWord: r.PostFormValue("password"),
		}
		if err := user.CreateUser(); err != nil {
			log.Fatalln(err)
		}

		// 第三引数はリダイレクト先, 第四引数は正常時レスポンスのステータス
		http.Redirect(w, r, "/", 302)
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	generateHTML(w, nil, "layout", "public_navbar", "login")
}

func authenticate(w http.ResponseWriter, r *http.Request) {
	// UIで入力されたformの値を取得
	err := r.ParseForm()
	user, err := models.GetUserByEmail(r.PostFormValue("email"))
	if err != nil {
		log.Fatalln(err)
		http.Redirect(w, r, "/login", 302)
	}
	// UIで入力されたパスワードを暗号化して比較
	if user.PassWord == models.Encrypt(r.PostFormValue("password")) {
		session, err := user.CreateSession()
		if err != nil {
			fmt.Println(err)
		}
		// cookieに保存
		cookie := http.Cookie{
			Name:     "_cookie",
			Value:    session.UUID,
			HttpOnly: true,
		}
		http.SetCookie(w, &cookie)
		http.Redirect(w, r, "/", 302)
	} else {
		http.Redirect(w, r, "/login", 302)
	}
}
