package pkg

import (
	"net/http"

	"local.package/models"

	"github.com/gin-gonic/gin"
)

// タスクテーブルにタスクを1件登録するエンドポイント
func PostTask(c *gin.Context) {
	var task models.Task

	// DBに接続
	db := DbConnection()
	// db.DB()を設定することでconnectionとして使用したDBをクローズする準備ができる
	dbForClose, _ := db.DB()

	// リクエストとして受け取ったBodyのJSON Contentパラメータを構造体にバインドする
	if bindErr := c.BindJSON(&task); bindErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}

	// リクエストとして受け取ったBodyのJSON ContentパラメータでDBに登録する（IDは自動でインクリメントされるので指定不要）
	// "created_at", "updated_at"カラムの2つを登録時の時間で自動更新してくれる(.Create)
	result := db.Create(&task)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
	}
	// 登録完了後(この関数の処理終了後)にAPIで使用していたDBをクローズする
	defer dbForClose.Close()

	// 登録したレコードをJSON形式で表示する
	c.JSON(http.StatusCreated, &task)
}
