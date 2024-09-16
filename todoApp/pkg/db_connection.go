package pkg

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DBと接続する関数
func DbConnection() *gorm.DB {
	// .envファイルの中身を環境変数として読み込む
	err := godotenv.Load("../configs/.env")
	if err != nil {
		log.Fatal("Error loading .env file\n", err)
	}

	// 環境変数から接続情報を取得
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPort := os.Getenv("POSTGRES_PORT")

	// DSNを構築
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo",
		dbHost,
		dbUser,
		dbPassword,
		dbName,
		dbPort)

	// GORMでデータベースに接続(先にDocker起動=>DB起動の必要有)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// TODO: db.close()を都度使っていないため、連続でAPIを走らせるとgorm.Open()セッションが100を越えたらエラーになってしまう件を解消する
	// => postgreSQL内でSELECT count(*) FROM pg_stat_activity; で確認可能

	return db
}
