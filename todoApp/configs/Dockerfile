# Go 1.18 がインストールされた軽量な Alpine Linux ベースのイメージ
FROM golang:1.18-alpine

# 作業ディレクトリを /todo-app に設定し、以降のコマンドは指定ディレクトリにて実行される
WORKDIR /todo-app

# ローカルの"todoApp/"ディレクトリの内容を コンテナ内の現在の作業ディレクトリ"/todo-app"にコピーする
COPY ./todoApp .

# 作業ディレクトリを /cmd に設定し、以降のコマンドは指定ディレクトリにて実行される
WORKDIR /cmd

# go build コマンドを実行し、main.goをコンパイルして実行可能なバイナリ "main" をカレントディレクトリに作成する
# -o package名を指定できる
RUN go build -o main

# コンテナが実行されると、/app/main バイナリが実行されます。これにより、アプリケーションが起動します。
CMD ["/main"]
