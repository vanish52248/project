# syntax=docker/dockerfile:1
# ↑は docker の build kit 1系のlatestを使用するという意味。dockerが推奨している為使用する

# Go 1.21 がインストールされた軽量な Alpine Linux ベースのイメージ
FROM golang:1.21-alpine

# コンテナ内の作業ディレクトリを"/build_app"に設定し、以降のコマンドは指定ディレクトリにて実行される(存在しない場合は作成される)
WORKDIR /build_app

# コンテナ内の"/build_app"配下の構造をローカルの"todoApp/"配下の構造と揃えるようにディレクトリを作成する
RUN mkdir -p cmd configs models pkg web

# ローカルの"todoApp/"ディレクトリ配下の構造を コンテナ内の"/build_app"の同名階層配下にすべてコピーする
# ※ .から始まるファイルはコピーされない！！（.env など）
COPY cmd/ ./cmd
COPY configs/ ./configs
COPY models/ ./models
COPY pkg/ ./pkg
COPY web/ ./web
COPY go.mod ./
COPY go.sum ./

# go build コマンドを実行し、main.goをコンパイルして【Dockerfileと同階層】にファイル名【main】としてファイルを作成する
RUN go build -o main ./cmd/main.go

# コンテナが実行されると、コンテナ内にCOPYして前段でbuildを行った【main】バイナリを実行する。
# これにより、アプリケーションのBE部分を起動する
CMD ["./main"]
