package pkg

import (
	"log"
	"net/http"

	"local.package/models"

	"github.com/gin-gonic/gin"
)

// タスクテーブル内のレコードを全て取得するエンドポイント
func GetAllTask(c *gin.Context) {
	var tasks []models.Task

	// DBに接続
	db := DbConnection()

	// DB内を検索して全件取得
	result := db.Find(&tasks)
	if result.Error != nil {
		log.Fatal(result.Error)
		return
	}

	// 取得した内容をJSON形式で表示する（全件）
	c.JSON(http.StatusOK, tasks)
}
