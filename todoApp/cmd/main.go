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
	router.GET("/get", pkg.GetAllTask)
	// router.GET("/get/:id", GetDetail)
	router.POST("/create", pkg.PostTask)
	// router.DELETE("/delete/:id", Delete)
	// router.PUT("/update/:id", Update)

	// 8080ポートでアプリケーションサーバーを起動
	router.Run(":8080")
}
