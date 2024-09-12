package pkg

import (
	"log"
	"net/http"

	"local.package/models"

	"github.com/gin-gonic/gin"
)

// タスクテーブルにタスクを1件登録するエンドポイント
func PostTask(c *gin.Context) {
	var tasks []models.Task

	// DBに接続
	db := DbConnection()

	// リクエストされたパラメータを構造体にバインドする
	if bindErr := c.BindJSON(&tasks); bindErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}

	// DBに登録する
	result := db.Create(&tasks)
	if result.Error != nil {
		log.Fatal(result.Error)
	}

	c.JSON(http.StatusCreated, tasks)

}
