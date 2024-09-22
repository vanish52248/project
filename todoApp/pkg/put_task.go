package pkg

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"local.package/models"
)

func PutTask(c *gin.Context) {
	var task models.Task

	// DBに接続
	db := DbConnection()
	// db.DB()を設定することでconnectionとして使用したDBをクローズする準備ができる
	dbForClose, _ := db.DB()

	// URL内のQueryStringのIDをc.Param("id")で受け取って検索した件数（RowsAffected）を取得
	updateTarget := db.Where("id = ?", c.Param("id")).Limit(1).Find(&task).RowsAffected

	// 検索結果が0件（RowsAffected）の場合は400エラーを返却する
	if updateTarget == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "no record for update"})
		return
	}

	// リクエストとして受け取ったBodyのJSON Contentパラメータを構造体にバインドする
	if bindErr := c.BindJSON(&task); bindErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}

	// リクエストとして受け取ったBodyのJSON Contentパラメータの内容で更新する
	// "updated_at"カラムを登録時の時間で自動更新してくれる(.Save)
	// ※.Saveは指定したIDが現在のDBに存在しない場合は新規作成してしまう
	result := db.Save(&task)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
	}
	// 更新完了後(この関数の処理終了後)にAPIで使用していたDBをクローズする
	defer dbForClose.Close()

	// 更新したレコードをJSON形式で表示する
	c.JSON(http.StatusOK, task)
}
