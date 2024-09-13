package main

import (
	"local.package/models"
	"local.package/pkg"

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

	// 各ルーティングにて処理を分岐
	// ハンドラー(第二引数)側の関数の引数に【c *gin.Context】を設定することでルーティング可能
	// ########################################################################################
	router.GET("/get", pkg.GetAllTask)           // 全取得
	router.GET("/get/:id", pkg.GetDetailTask)    // 1件取得
	router.POST("/create", pkg.PostTask)         // 登録
	router.DELETE("/delete/:id", pkg.DeleteTask) // 削除
	// router.PUT("/update/:id", pkg.)
	// ########################################################################################

	// 8080ポートでアプリケーションサーバーを起動
	router.Run(":8080")
}
