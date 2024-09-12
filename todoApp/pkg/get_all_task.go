package pkg

import (
	"net/http"

	"local.package/models"

	"github.com/gin-gonic/gin"
)

// タスクテーブル内のレコードを全て取得するエンドポイント
func GetAllTask(c *gin.Context) {
	var tasks []models.Task
	db := DbConnection()

	if dbFindErr := db.Find(&tasks); dbFindErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read all record"})
		return
	}
	c.JSON(http.StatusOK, tasks)
}
