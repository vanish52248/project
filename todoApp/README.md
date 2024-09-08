# プロジェクト概要

## 前提
- 命名規則については[Golangでの命名規則におけるベストプラクティス](https://zenn.dev/kenghaya/articles/1b88417b1fa44d)を参照
- `go get`コマンドはgithubから新規に外部パッケージを利用する場合にのみ使用する(ginやgodotenvなど)
- GO PATHは使わずGo Modulesを採用
- FE=>JS/React, BE=>Go/ginにて製作


## 各階層の説明
- cmd
    - hoge
- configs
    - hoge
- pkg
    -hoge
- web
    -hoge

## 各フロー

### 自作のパッケージを読み込む場合
[動かして覚えるGoのモジュールの使い方
](https://qiita.com/Rqixy/items/b906fcb54cf162427775)を参照して読みこんでいる

### モジュールのキャッシュをクリア(go mod tidyを再実行する場合)
```
go clean -modcache
```

### Dockerコンテナ起動方法
```
# 1.ルートディレクトリでDockerを起動
$ sudo service docker start

# 2.Dockerが起動されていることを確認
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```


### DB起動方法
```
# 1.DBを起動する(docker-compose.ymlが存在する階層で行う)
$ docker compose up -d

# 2.DBが起動されていることを確認
$ docker compose ps
NAME       IMAGE         COMMAND                  SERVICE   CREATED         STATUS         PORTS
postgres   postgres:14   "docker-entrypoint.s…"   db        3 minutes ago   Up 3 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp
```


### API実行方法
```
# 1.Goのサーバーを起動させる
$ cd /home/th/project/todoApp/cmd
$ go run .

# 2.API実行についてはVSCode内のThunderClientを使用してリクエストを行う
・GET
・POST
・PUT
・DELETE
```

### Dockerコンテナ内のDBの中身確認方法
```
# 1.コンテナIDの確認
$ docker compose ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS         PORTS                                       NAMES
d666c7bc3784   postgres:14   "docker-entrypoint.s…"   32 hours ago   Up 5 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres

# 2.コンテナ内へ入る
$ docker exec -it {コンテナID} sh

# 3.postgres内へ入る
$ psql -U postgres
postgres=# 

# 4.各種SELECTや以下コマンド叩いて確認する
# テーブル一覧の表示
postgres=# \dt;

# テーブル構造の表示
postgres=# \d {テーブル名};
```


### Dockerコンテナ停止方法
```
# 1.コンテナIDの確認
$ docker compose ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS         PORTS                                       NAMES
d666c7bc3784   postgres:14   "docker-entrypoint.s…"   32 hours ago   Up 5 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres

# 2.コンテナの停止
$ docker stop {コンテナID}
```

## 備考

### 読み方
- go mod tidy = ごー もっど たいでぃ
