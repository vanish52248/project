package models

import "gorm.io/gorm"

// taskテーブルの定義
type Task struct {
	// struct内にgorm.Modelを埋め込むことで, ID, CreatedAt, UpdatedAt, DeletedAtフィールドが自動で含まれるようになる
	gorm.Model
	// ↓
	// ID: GORMにおいて特別な意味を持つ。全てのIDは自動で主キーとして扱われる
	// CreatedAt: レコードが初めて作成された時に自動で設定される => db.Create(&tasks)
	// UpdatedAt: レコードが更新された時に自動で設定される => db.Save(&tasks)
	// DeletedAt: レコードが削除された時に自動で設定される => db.Delete(&tasksk)
	Title   string `gorm:"size:32"`
	Content string `gorm:"size:128"`
	Author  string `gorm:"size:32"`
}
