package pkg

// type Task struct {
// 	ID          uint      `gorm:"primary_key"`
// 	Title       string    `gorm:"size:255"`
// 	IsCompleted bool      `gorm:"default:false"`
// 	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
// 	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
// }

func PutTask() {
	// // タスクを更新するエンドポイント
	// r.PUT("/tasks/:id", func(c *gin.Context) {
	// 	var task Task
	// 	id := c.Param("id")

	// 	if err := db.First(&task, id).Error; err != nil {
	// 		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
	// 		return
	// 	}

	// 	if err := c.ShouldBindJSON(&task); err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return
	// 	}

	// 	db.Save(&task)
	// 	c.JSON(http.StatusOK, task)
	// })

}
