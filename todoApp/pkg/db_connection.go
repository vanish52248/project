package pkg

import (
	"fmt"
	"log"
	"os"
	"time"

	// "github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DBと接続する関数
func DbConnection() *gorm.DB {
	// ローカルでの動作確認時のみ使用するようにする
	// .envファイルの中身を環境変数として読み込む
	// err := godotenv.Load("../configs/.env")
	// if err != nil {
	// 	log.Fatal("Error loading .env file by db_connection.go\n", err)
	// }

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

	// DBコンテナ起動前にGoコンテナが起動してしまうとdocker compose up 時にビルドエラーとなる為
	// 繰り返し処理を行うことで一度のdocker compose upですべ手のコンテナを立ち上げるようにする
	// GORMでデータベースに接続(先にDocker起動=>DB起動の必要有)
	var db *gorm.DB
	var err error
	// 30秒おきに接続の再実行を10回まで行う
	for i := 0; i < 10; i++ {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			log.Println("Successfully connected to the database.")
			break
		}
		log.Printf("Attempt %d: Failed to connect to database: %v", i+1, err)
		time.Sleep(30 * time.Second)
	}

	if err != nil {
		log.Fatalf("Failed to connect to database after 5 attempts: %v", err)
	}

	// 接続が完了した際はDB接続を返却する
	return db
}
