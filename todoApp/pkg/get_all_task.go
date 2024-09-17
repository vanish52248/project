package pkg

import (
	"net/http"

	"local.package/models"

	"github.com/gin-gonic/gin"
)

// タスクテーブル内のレコードを全て取得するエンドポイント
func GetAllTask(c *gin.Context) {
	var tasks []models.Task

	// DBに接続
	db := DbConnection()

	// DB内を検索して全件取得(作成日時の昇順で表示)
	result := db.Order("created_at ASC").Find(&tasks)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed get all task"})
		return
	}

	// 取得した内容をJSON形式で表示する（全件）
	c.JSON(http.StatusOK, tasks)
}
