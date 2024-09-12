package pkg

import (
	"fmt"
	"net/http"

	"local.package/models"

	"github.com/gin-gonic/gin"
)

// タスクテーブルにタスクを1件登録するエンドポイント
func PostTask(c *gin.Context) {
	var tasks []models.Task

	db := DbConnection()
	if bindErr := c.BindJSON(&tasks); bindErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}
	fmt.Println("==> Binded result tasks : ", tasks)

	if dbCreateErr := db.Create(&tasks); dbCreateErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to db create"})
		return
	}

	c.JSON(http.StatusCreated, tasks)

}
