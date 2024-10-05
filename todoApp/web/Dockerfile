# syntax=docker/dockerfile:1
# ↑は docker の build kit 1系のlatestを使用するという意味。dockerが推奨している為使用する

# Node.js と npmが両方インストールされている軽量な Alpine Linux ベースのイメージ
FROM node:alpine

# コンテナ内の作業ディレクトリを"/build_app"に設定し、以降のコマンドは指定ディレクトリにて実行される(存在しない場合は作成される)
WORKDIR /build_app/web

# Dockerのキャッシュの関係で先にpacage.jsonをコピーする
# 根拠：https://qiita.com/yuminn-k/items/bd2d741069934b6ea68f
COPY web/package.json ./

# 依存関係をインストール
RUN npm install

# packageのインストールが終わったのちに残りのコードをコピーする
# ローカルの"todoApp/web"ディレクトリ配下の構造を コンテナ内の"/build_app/web"の階層配下にコピーする
# ※ .から始まるファイルはコピーされない！！（.env など）
COPY web/ ./

# アプリケーションを起動
CMD [ "npm", "start" ]
