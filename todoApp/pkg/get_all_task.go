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

	// DBから検索
	result := db.Find(&tasks)
	if result.Error != nil {
		log.Fatal(result.Error)
		return
	}

	c.JSON(http.StatusOK, tasks)
}
