package pkg

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"local.package/models"
)

// タスクを削除するエンドポイント
func DeleteTask(c *gin.Context) {
	var task models.Task

	// DBに接続
	db := DbConnection()
	// db.DB()を設定することでconnectionとして使用したDBをクローズする準備ができる
	dbForClose, _ := db.DB()

	// DBからQueryStringとしてURLから受け取ったIDをc.Param("id")で受け取って検索する => WHERE句
	targetCount := db.Where("id = ?", c.Param("id")).Limit(1).Find(&task).RowsAffected

	// 検索結果が0件の場合は400エラーを返却する
	if targetCount == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "no record for delete"})
		return
	}

	// 取得できた場合はDBから該当IDのレコードを削除する ※プライマリーキーを指定しないと、一括削除になる
	// "deleted_at"カラムを削除時の時間で自動更新してくれる(.Delete)
	deleteResult := db.Where("id = ?", c.Param("id")).Delete(&task)
	if deleteResult.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed delete"})
		return
	}
	// 削除完了後(この関数の処理終了後)にAPIで使用していたDBをクローズする
	defer dbForClose.Close()

	// 削除の為 表示内容なしとする(204)
	c.JSON(http.StatusNoContent, task)
}
