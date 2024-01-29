package utils

import (
	"io"
	"log"
	"os"
)

func LoggingSettings(logFile string) {
	// 読み書き・ファイル無ければ作成・ファイルへの追記 を許可(0666は権限)
	logfile, err := os.OpenFile(logFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalln(err)
	}

	// ログの書き込み先を標準とファイルに設定
	multiLogFile := io.MultiWriter(os.Stdout, logfile)
	// フォーマットを指定
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	// ログの出力先を設定
	log.SetOutput(multiLogFile)
}
