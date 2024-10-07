package main

import (
	"local.package/models"
	"local.package/pkg"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	// 起動済みのDatabase(postgreSQL)に接続
	db := pkg.DbConnection()

	// 構造体に合わせてマイグレーションを行う
	db.AutoMigrate(&models.Task{})

	// *gin.Engine構造体を返す
	// ginでは、このEngine構造体を使って,エンドポイント、ミドルウェアなどを登録しておくことが可能
	router := gin.Default()

	// CORS
	router.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			// local環境のURL
			"http://localhost:3000",
			"https://localhost:3000",
			// EC2本番環境のURL
			"http://3.112.124.235:3000",
			"https://3.112.124.235:3000",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
	}))

	// 各ルーティングにて”CRUD”処理を分岐
	// ハンドラー(第二引数)側の関数の引数に【c *gin.Context】を設定することでルーティング可能
	// ########################################################################################
	router.POST("/create", pkg.PostTask)         // 登録
	router.GET("/get", pkg.GetAllTask)           // 全取得
	router.GET("/get/:id", pkg.GetDetailTask)    // 1件取得
	router.PUT("/update/:id", pkg.PutTask)       // 更新
	router.DELETE("/delete/:id", pkg.DeleteTask) // 削除
	// ########################################################################################

	// 8080ポートでアプリケーションサーバーを起動
	router.Run(":8080")
}
