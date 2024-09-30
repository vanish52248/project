# Go 1.18 がインストールされた軽量な Alpine Linux ベースのイメージ
FROM golang:1.18-alpine

# 作業ディレクトリを /app に設定し、以降のコマンドはこのディレクトリで実行される
WORKDIR /app

# cmd/ ディレクトリの内容を、現在の作業ディレクトリ（/app）にコピーする
COPY cmd/ .

# go build コマンドを実行し、./main.go をコンパイルして実行可能なバイナリ main を作成する
RUN go build -o main ./main.go

# 環境変数 $PORTで指定されたポート番号を公開する。これにより、コンテナ外からアプリケーションにアクセスできるようになる
EXPOSE $PORT

# コンテナが実行されると、/app/main バイナリが実行されます。これにより、アプリケーションが起動します。
CMD ["/app/main"]
