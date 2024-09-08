package main

import (
	"local.package/pkg"

	"github.com/gin-gonic/gin"
)

func main() {
	// Databaseの起動
	pkg.DbConnection()

	// Ginエンジンのインスタンスを作成
	r := gin.Default()

	// 8080ポートでアプリケーションサーバーを起動
	r.Run(":8080")
}
